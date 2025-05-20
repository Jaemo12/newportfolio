
import vertex from '../shader/vertex.glsl';
import fragment from '../shader/fragment.glsl';

import { Texture, Program, Mesh } from 'ogl';

export default class Media {
  constructor({ gl, scene, geometry, image, index, length, onClick }) {
    this.gl = gl;
    this.scene = scene;
    this.geometry = geometry;
    this.image = image;
    this.index = index;
    this.length = length;
    this.onClick = onClick;

    // Add properties for smooth scrolling
    this.scroll = 0;
    this.speed = 0;
    this.extra = 0;
    this.position = {
      current: 0,
      target: 0
    };

    this.createTexture();
    this.createProgram();
    this.createMesh();
    this.addClickListener();
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex: vertex,
      fragment: fragment,
      uniforms: {
        tMap: { value: this.texture },
        uImageSizes: { value: [0, 0] },
        uPlaneSizes: { value: [0, 0] },
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uAlpha: { value: 1 }
      },
      transparent: true
    });
  }

  update(scroll = 0) {
    // Calculate smooth scrolling position
    const spacing = 1.5; // Adjust spacing between images
    const totalWidth = spacing * (this.length - 1);
    
    // Calculate base position
    let x = (this.index * spacing) - scroll;
    
    // Handle wrapping
    const halfTotal = totalWidth / 2;
    if (x < -halfTotal) x += totalWidth;
    if (x > halfTotal) x -= totalWidth;
    
    // Apply smooth movement
    this.position.target = x;
    this.position.current = this.lerp(this.position.current, this.position.target, 0.1);
    
    // Update mesh position
    if (this.mesh) {
      this.mesh.position.x = this.position.current;
      
      // Adjust rotation to face forward
      this.mesh.rotation.y = Math.PI * 0.1 * Math.sin(this.position.current * 0.5);
    }

    // Update shader uniforms
    if (this.program) {
      this.program.uniforms.uTime.value += 0.04;
      this.program.uniforms.uSpeed.value = Math.abs(this.speed) * 0.5;
    }
  }

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  resize({ screen, viewport } = {}) {
    if (!this.program) return;

    this.screen = screen;
    this.viewport = viewport;

    if (!this.screen || !this.viewport) return;

    // Adjust scale for proper sizing
    const scale = this.screen.height / 1500;
    this.mesh.scale.x = this.viewport.width * (700 * scale) / this.screen.width;
    this.mesh.scale.y = this.viewport.height * (900 * scale) / this.screen.height;

    this.program.uniforms.uPlaneSizes.value = [
      this.mesh.scale.x,
      this.mesh.scale.y
    ];
  }
}