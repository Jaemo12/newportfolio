'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const NeonTitle = dynamic(() => import('./neonTitle'), { ssr: false });

/**
 * The hero scene, rendered in one WebGL shader so the sign, the wall it
 * lights and its reflection are the same light:
 *  - the sign is drawn once into a texture (tube core, tight glow, wide glow)
 *  - the brick wall is only visible where the sign lights it
 *  - the wet floor mirrors the sign about the wall line, smeared vertically
 *    the way wet asphalt does, sharp in puddles and dull where it is drier
 * Flicker is a single number per line, so the wall and the reflection
 * flicker with the tube. Falls back to the CSS sign without WebGL.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform sampler2D uTex;
uniform float uTime;
uniform vec4 uSign;     // x, y (from top), w, h in px
uniform float uHorizon; // px from top
uniform vec2 uFlick;    // line 1, line 2
uniform float uDpr;

const vec3 NEON = vec3(1.0, 0.27, 0.07);
const vec3 INK = vec3(0.043, 0.043, 0.051);

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; } return s; }

// r: tube core, g: tight glow, b: wide glow
vec3 tube(vec2 px){
  vec2 uv = (px - uSign.xy) / uSign.zw;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
  float f = mix(uFlick.x, uFlick.y, smoothstep(0.54, 0.60, uv.y));
  return texture2D(uTex, uv).rgb * f;
}
vec3 emit(vec3 t){
  return vec3(1.0, 0.94, 0.86) * pow(t.r, 1.3) * 2.6 + NEON * (t.g * 1.3 + t.b * 0.45);
}

void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 c = uSign.xy + uSign.zw * 0.5;
  float fl = (uFlick.x + uFlick.y) * 0.5;
  vec3 col = vec3(0.0);

  if (px.y < uHorizon) {
    // Brick wall, lit only by the sign.
    float s = uSign.z / 8.0;
    vec2 b = px / vec2(s, s * 0.36);
    b.x += mod(floor(b.y), 2.0) * 0.5;
    vec2 id = floor(b), f = fract(b);
    float face = smoothstep(0.0, 0.04, f.x) * smoothstep(1.0, 0.96, f.x) * smoothstep(0.0, 0.11, f.y) * smoothstep(1.0, 0.89, f.y);
    float tint = 0.6 + 0.4 * hash(id);
    float rough = 0.7 + 0.6 * fbm(px * 0.22 / uDpr + id * 3.1);
    vec3 albedo = mix(vec3(0.07, 0.06, 0.058), vec3(0.34, 0.15, 0.11) * tint, face) * rough;

    vec2 q = (px - c) / vec2(uSign.z * 0.62, uSign.w * 0.72);
    float fall = exp(-dot(q, q) * 1.5);
    vec3 t = tube(px);
    // the lower edge of each brick catches a little more light from above/below the tube
    float bevel = 1.0 + 0.5 * (smoothstep(0.75, 0.9, f.y) - smoothstep(0.1, 0.25, 1.0 - f.y)) * sign(c.y - px.y);
    vec3 light = NEON * (fall * 0.3 * fl + t.b * 0.8) * bevel;
    col = albedo * light + emit(t);
    col *= mix(0.45, 1.0, smoothstep(0.0, uSign.w * 0.10, uHorizon - px.y));
  } else {
    // Wet asphalt.
    float d = px.y - uHorizon;
    float depth = uRes.y - uHorizon;
    float z = 1.0 / (d / depth + 0.07);
    vec2 fc = vec2((px.x - c.x) / uSign.z * z, z) * 3.0;

    float puddle = smoothstep(0.40, 0.60, fbm(fc * 0.5 + 7.3));
    float grain = fbm(fc * 9.0);
    float t0 = uTime * 0.22;

    float streak = mix(0.55, 0.14, puddle) * d + 3.0 * uDpr;
    float wob = (mix(4.0, 0.8, puddle) + d * 0.02) * uDpr;
    float rip = (fbm(fc * vec2(3.0, 5.0) + vec2(0.0, t0)) - 0.5) * wob * 1.5;

    vec3 acc = vec3(0.0);
    for (int i = 0; i < 14; i++) {
      float fi = float(i);
      float k = (fi + hash(px + fi * 7.13)) / 14.0 - 0.5;
      float n = noise(vec2(fc.x * 6.0 + fi * 1.7, fc.y * 6.0 + t0)) - 0.5;
      vec2 sp = vec2(px.x + rip + n * wob, uHorizon - d * 1.03 + k * streak);
      if (sp.y > uHorizon) sp.y = 2.0 * uHorizon - sp.y;
      acc += tube(sp);
    }
    acc /= 14.0;

    float fres = mix(0.95, 0.22, smoothstep(0.0, 1.0, d / depth));
    float strength = mix(0.20, 0.85, puddle) * fres;
    vec3 refl = emit(acc) * strength;

    // the lit wall, mirrored
    vec2 q = (vec2(px.x + rip, uHorizon - d) - c) / vec2(uSign.z * 0.62, uSign.w * 0.72);
    refl += NEON * exp(-dot(q, q) * 1.5) * 0.16 * fl * strength;

    // light falling on the ground itself
    vec2 q2 = (px - vec2(c.x, uHorizon)) / vec2(uSign.z * 0.7, depth * 0.6);
    float pool = exp(-dot(q2, q2) * 1.6);
    vec3 asphalt = vec3(0.05) * (0.55 + 0.9 * grain);
    col = asphalt * NEON * pool * 1.7 * fl * (1.0 - puddle * 0.6);
    col += refl * (0.75 + 0.5 * grain * (1.0 - puddle));
    // wet grit catching the light
    col += refl * pow(noise(fc * 55.0), 10.0) * 7.0 * (1.0 - puddle);
    col *= mix(0.4, 1.0, smoothstep(0.0, uSign.w * 0.05, d));
  }

  col = 1.0 - exp(-col * 1.5);
  col = pow(col, vec3(1.0 / 1.55));
  col += (hash(px + uTime) - 0.5) / 255.0;
  gl_FragColor = vec4(INK + col * (1.0 - INK), 1.0);
}`;

const TEX_W = 1600;
const TEX_H = 1000;

const drawSign = async (): Promise<HTMLCanvasElement> => {
  const family = getComputedStyle(document.body).getPropertyValue('--font-script').trim() || 'cursive';
  try {
    await document.fonts.load(`400 100px ${family}`);
    await document.fonts.ready;
  } catch {
    /* draw with whatever is available */
  }
  const c = document.createElement('canvas');
  c.width = TEX_W;
  c.height = TEX_H;
  const x = c.getContext('2d')!;
  x.fillStyle = '#000';
  x.fillRect(0, 0, TEX_W, TEX_H);
  x.textAlign = 'center';
  x.textBaseline = 'alphabetic';
  x.lineJoin = 'round';
  x.lineCap = 'round';
  x.font = `100px ${family}`;
  const w = x.measureText('Code Sleep').width || 500;
  const size = Math.min((100 * TEX_W * 0.8) / w, 300);
  const lines: [string, number, number][] = [
    ['Code Sleep', size, 0.45],
    ['Repeat', size * 0.8, 0.8],
  ];
  x.globalCompositeOperation = 'lighter';
  const pass = (color: string, blur: number, stroke: number, times: number) => {
    for (let n = 0; n < times; n++) {
      for (const [text, s, y] of lines) {
        x.font = `${s}px ${family}`;
        x.shadowColor = blur ? color : 'transparent';
        x.shadowBlur = blur;
        x.fillStyle = color;
        x.strokeStyle = color;
        x.lineWidth = stroke;
        x.fillText(text, TEX_W / 2, TEX_H * y);
        x.strokeText(text, TEX_W / 2, TEX_H * y);
      }
    }
  };
  pass('#ff0000', 0, size * 0.014, 1); // tube core
  pass('#00ff00', size * 0.07, size * 0.014, 2); // tight glow
  pass('#0000ff', size * 0.3, size * 0.03, 3); // wide glow
  return c;
};

/** Start-up stutter, then steady light with a rare dip. */
const makeFlicker = (delay: number) => {
  let next = 4 + Math.random() * 5;
  let until = 0;
  let low = 1;
  return (t: number) => {
    const s = t - delay;
    if (s < 0) return 0;
    if (s < 0.7) {
      if (s < 0.06) return 0.8;
      if (s < 0.22) return 0;
      if (s < 0.3) return 0.9;
      if (s < 0.5) return 0.05;
      if (s < 0.62) return 1;
      return 0.3;
    }
    if (t > next) {
      until = t + 0.05 + Math.random() * 0.09;
      low = 0.25 + Math.random() * 0.4;
      next = t + 3 + Math.random() * 7;
    }
    return (t < until ? low : 1) * (0.985 + 0.015 * Math.sin(t * 90));
  };
};

export const NeonScene = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader');
      return sh;
    };
    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
    } catch (e) {
      console.error('NeonScene:', e);
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes');
    const uTime = U('uTime');
    const uSign = U('uSign');
    const uHorizon = U('uHorizon');
    const uFlick = U('uFlick');
    const uDpr = U('uDpr');

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0]));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const f1 = makeFlicker(0.35);
    const f2 = makeFlicker(0.85);
    let ready = false;
    let alive = true;
    let visible = true;
    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const W = canvas.width;
      const H = canvas.height;
      const cssW = W / dpr;
      const hy = H * (cssW < 640 ? 0.62 : 0.66);
      const sw = Math.min(W * 0.88, 780 * dpr);
      const sh = Math.min(sw / (TEX_W / TEX_H), hy - 78 * dpr);
      const swFit = sh * (TEX_W / TEX_H);
      const t = (now - t0) / 1000;
      gl.viewport(0, 0, W, H);
      gl.uniform2f(uRes, W, H);
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.uniform4f(uSign, (W - swFit) / 2, hy - sh, swFit, sh);
      gl.uniform1f(uHorizon, hy);
      gl.uniform2f(uFlick, reduce ? 1 : f1(t), reduce ? 1 : f2(t));
      gl.uniform1f(uDpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      canvas.width = Math.max(1, Math.round(host.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(host.clientHeight * dpr));
      if (ready) draw(performance.now());
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    drawSign().then((sign) => {
      if (!alive) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, sign);
      ready = true;
      if (reduce) {
        draw(performance.now());
        return;
      }
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (visible) draw(now);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-full items-center justify-center">
        <NeonTitle />
      </div>
    );
  }
  return <canvas ref={ref} aria-hidden className="block h-full w-full" />;
};
