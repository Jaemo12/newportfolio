'use client';

import { Headline } from '../components/headline';
import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertTriangle, CheckCircle, FileText } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL = 'samantamitus@gmail.com';

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  textarea?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, type = 'text', value, onChange, autoComplete, textarea }) => {
  const id = useId();
  const shared = {
    id,
    value,
    required: true,
    autoComplete,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className:
      'w-full rounded-lg border-2 border-ink bg-transparent px-4 py-3.5 text-lg text-ink transition-colors duration-200 ' +
      'focus:bg-bone/30 focus:outline-none focus:ring-4 focus:ring-ink/25',
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-bold">
        {label}
      </label>
      {textarea ? (
        <textarea {...shared} rows={5} className={`${shared.className} min-h-[9rem] resize-y`} />
      ) : (
        <input {...shared} type={type} />
      )}
    </div>
  );
};

const ContactMePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot: real people never fill this
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  const contactInfo = [
    { icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, text: '+1 (361) 910-4013', href: 'tel:+13619104013' },
    { icon: MapPin, text: 'Arlington, Texas', href: undefined },
  ];

  return (
    <div className="bg-signal text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-36">
        <Headline className="max-w-[16ch]">{'Hiring, or have something to build?'}</Headline>
        <p className="mt-6 max-w-[52ch] text-xl leading-snug">
          Tell me about the role or the project, and how to reach you.
        </p>

        <div className="mt-14 grid items-start gap-14 md:grid-cols-12 md:gap-16">
          <form onSubmit={handleSubmit} className="space-y-5 md:col-span-7">
            <Field label="Your name" value={name} onChange={setName} autoComplete="name" />
            <Field label="Your email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field label="What would you like to talk about?" value={message} onChange={setMessage} textarea />
            {/* Honeypot, hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-5 text-xl font-bold text-bone transition duration-200 hover:bg-bone hover:text-ink active:translate-y-px disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-bone/40 border-t-bone" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={20} aria-hidden /> Send message
                </>
              )}
            </button>

            <div role="status" aria-live="polite" className="min-h-[3.5rem] text-lg font-semibold">
              {status === 'success' && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
                  <CheckCircle size={22} className="mt-0.5 shrink-0" aria-hidden />
                  Message sent. Thanks for reaching out.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
                  <AlertTriangle size={22} className="mt-0.5 shrink-0" aria-hidden />
                  <span>
                    That didn&apos;t go through, and your message is still here. Try again, or write to me directly at{' '}
                    <a className="underline underline-offset-4" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                    .
                  </span>
                </motion.p>
              )}
            </div>
          </form>

          <div className="md:col-span-5 md:pt-8">
            <ul className="border-t-2 border-ink">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-4 border-b border-ink/30 py-5">
                  <Icon size={22} className="shrink-0" aria-hidden />
                  {href ? (
                    <a href={href} className="break-all text-lg font-semibold underline-offset-4 hover:underline">
                      {text}
                    </a>
                  ) : (
                    <span className="text-lg font-semibold">{text}</span>
                  )}
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              className="mt-6 inline-flex items-center gap-2 text-lg font-bold underline underline-offset-4"
            >
              <FileText size={20} aria-hidden /> Download my resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMePage;
