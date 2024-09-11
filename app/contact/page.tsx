'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactMePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Contact Me
      </motion.h1>
      <div className="w-full max-w-2xl">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full p-3 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-[0_0_10px_rgba(0,255,255,0.3)]"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            Send Message
          </motion.button>
        </motion.form>
        <motion.div
          className="mt-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <Mail className="text-blue-400" />
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="text-blue-400" />
            <span>+1 (123) 456-7890</span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="text-blue-400" />
            <span>123 Tech Street, Silicon Valley, CA 94000</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactMePage;