"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Cloud,
  Terminal,
  Smartphone,
  Gauge,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      category: t("前端", "Frontend"),
      icon: Code2,
      items: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: t("后端", "Backend"),
      icon: Database,
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    {
      category: t("DevOps", "DevOps"),
      icon: Cloud,
      items: ["Docker", "AWS", "Vercel", "CI/CD", "Linux", "Nginx"],
    },
    {
      category: t("工具", "Tools"),
      icon: Terminal,
      items: ["Git", "Webpack", "Vite", "Jest", "Cypress", "Figma"],
    },
    {
      category: t("移动端", "Mobile"),
      icon: Smartphone,
      items: ["React Native", "PWA", "Responsive Design", "Capacitor"],
    },
    {
      category: t("性能", "Performance"),
      icon: Gauge,
      items: ["Lazy Loading", "Code Splitting", "Caching", "CDN", "SSR/SSG"],
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            {t("技能与技术", "Skills & Technologies")}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <skill.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
