'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertTriangle, CheckCircle } from 'lucide-react';

// Particle Background Component (similar to SocialsPage)
const ParticleBackground = () => {
  const particles = Array.from({ length: 25 }); // Fewer particles for contact page
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5" // Even more subtle particles
          style={{
            width: `${Math.random() * 1.5 + 0.5}px`, // Smaller particles
            height: `${Math.random() * 1.5 + 0.5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
            scale: [1, Math.random() * 1.3 + 0.7, 1],
            opacity: [0, Math.random() * 0.2 + 0.05, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15, // Slower, more ambient
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut",
            delay: Math.random() * 7,
          }}
        />
      ))}
       {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-blue-900/10 opacity-50"></div>
    </div>
  );
};

// Reusable Input Field Component
interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  isTextArea?: boolean;
  rows?: number;
  accentColor: string;
  glowColor: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  type, placeholder, value, onChange, required, isTextArea, rows, accentColor, glowColor 
}) => {
  const commonProps = {
    placeholder,
    value,
    onChange,
    required,
    className: `w-full p-3.5 sm:p-4 bg-slate-800/60 dark:bg-black/30 text-slate-200 dark:text-slate-300 
                rounded-lg border border-slate-700 dark:border-slate-800 
                focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out
                placeholder-slate-500 dark:placeholder-slate-600 shadow-md focus:shadow-xl`,
    style: {
      '--accent-color': accentColor,
      '--glow-color': glowColor,
    } as React.CSSProperties, // Cast to CSSProperties
  };

  const focusStyles = `focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] focus:shadow-[0_0_15px_-3px_var(--glow-color)]`;

  return (
    <motion.div 
      whileHover={{ y: -3, scale: 1.02 }} 
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {isTextArea ? (
        <textarea {...commonProps} rows={rows} className={`${commonProps.className} ${focusStyles} min-h-[120px] sm:min-h-[150px]`} />
      ) : (
        <input type={type} {...commonProps} className={`${commonProps.className} ${focusStyles}`} />
      )}
    </motion.div>
  );
};


const ContactMePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // '', 'Sending...', 'Success', 'Error'
  const [isLoading, setIsLoading] = useState(false);

  const accentColor = "#00CFE8"; // Vibrant Cyan/Blue
  const glowColor = "rgba(0, 207, 232, 0.6)";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending...');

    try {
      // Simulate API call
      // const res = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, message }),
      // });
      // if (!res.ok) throw new Error('Server error');
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success for now
      setStatus('Success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus(''), 5000); // Clear status after 5s

    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('Error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, text: "samantamitus@gmail.com", href: "mailto:samantamitus@gmail.com" },
    { icon: Phone, text: "+1 (361) 910-4013", href: "tel:+13619104013" },
    { icon: MapPin, text: "Arlington, Texas, United States", href: "#" }, // Could link to Google Maps
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'circOut' } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-slate-100 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden font-inter">
      <ParticleBackground />
      
      <motion.div 
        className="w-full max-w-3xl relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-10 sm:mb-12 text-center tracking-tight"
          style={{ color: accentColor, textShadow: `0 0 15px ${glowColor}` }}
        >
          Get In Touch
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-start">
          {/* Contact Form Section */}
          <motion.div variants={containerVariants} className="space-y-5 sm:space-y-6">
            <motion.h2 variants={itemVariants} className="text-2xl font-semibold mb-4 text-slate-200">Send a Message</motion.h2>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <motion.div variants={itemVariants}>
                <InputField type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required accentColor={accentColor} glowColor={glowColor} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required accentColor={accentColor} glowColor={glowColor} />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField type="text" isTextArea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} accentColor={accentColor} glowColor={glowColor} />
              </motion.div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.03, y: -2, boxShadow: `0 0 25px ${glowColor}, 0 0 10px ${accentColor}` }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-full p-3.5 sm:p-4 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 text-base sm:text-lg"
                style={{ 
                  background: `linear-gradient(45deg, ${accentColor}CC, ${accentColor}99)`,
                  border: `1px solid ${accentColor}80`,
                  boxShadow: `0 0 15px -5px ${glowColor}`
                }}
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full"
                      animate={{rotate:360}}
                      transition={{duration:0.8, repeat:Infinity, ease:"linear"}}
                    />
                    Sending...
                  </>
                ) : (
                  <> <Send size={18} className="mr-1.5"/> Send Message </>
                )}
              </motion.button>
            </form>
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 text-sm text-center flex items-center justify-center gap-2
                  ${status === 'Success' ? 'text-green-400' : ''}
                  ${status === 'Error' ? 'text-red-400' : ''}
                  ${status === 'Sending...' ? 'text-slate-400' : ''}
                `}
              >
                {status === 'Success' && <CheckCircle size={16} />}
                {status === 'Error' && <AlertTriangle size={16} />}
                {status.replace('Success', 'Message sent successfully!').replace('Error', 'Failed. Please try again.')}
              </motion.p>
            )}
          </motion.div>

          {/* Contact Info Section */}
          <motion.div variants={containerVariants} className="space-y-6 sm:space-y-8 md:pt-0"> {/* Removed md:pt-16 */}
             <motion.h2 variants={itemVariants} className="text-2xl font-semibold mb-4 text-slate-200">Contact Information</motion.h2>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-lg bg-slate-800/50 dark:bg-black/20 border border-slate-700/70 dark:border-slate-800/70 transition-all duration-300 hover:border-opacity-100 hover:shadow-lg"
                style={{'--accent-color': accentColor, '--glow-color': glowColor} as React.CSSProperties}
                whileHover={{
                  y: -3,
                  borderColor: 'var(--accent-color)',
                  boxShadow: '0 0 15px -3px var(--glow-color)'
                }}
              >
                <info.icon size={20} className="mt-0.5 sm:mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <a href={info.href} className="text-sm sm:text-base text-slate-300 dark:text-slate-400 hover:text-slate-100 dark:hover:text-slate-200 transition-colors break-all">
                  {info.text}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .font-roboto-mono {
          font-family: 'Roboto Mono', monospace;
        }
      `}</style>
    </div>
  );
};

export default ContactMePage;
