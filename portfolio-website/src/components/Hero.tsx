"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium mb-4 tracking-wide">
            Hello, I&apos;m
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            郭贵南 (Guignan)
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4 font-light">
            Senior Frontend Engineer
          </p>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I build exceptional digital experiences with modern web technologies.
            Passionate about React, TypeScript, and creating performant, accessible applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/guoguinan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href":"https://linkedin.com/in/guoguinan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:guoguinan@example.com"
              className="p-3 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#about" className="text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
