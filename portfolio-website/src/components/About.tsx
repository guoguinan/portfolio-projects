"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Globe, Zap, Users } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: t("简洁代码", "Clean Code"),
      description: t(
        "编写可维护、结构良好的代码，遵循现代最佳实践。",
        "Writing maintainable, well-structured code with modern best practices."
      ),
    },
    {
      icon: Globe,
      title: t("Web 性能", "Web Performance"),
      description: t(
        "针对所有设备优化速度、可访问性和 SEO。",
        "Optimizing for speed, accessibility, and SEO across all devices."
      ),
    },
    {
      icon: Zap,
      title: t("现代技术栈", "Modern Stack"),
      description: t(
        "精通 React、Next.js、TypeScript 和 Tailwind CSS 生态系统。",
        "Expert in React, Next.js, TypeScript, and Tailwind CSS ecosystem."
      ),
    },
    {
      icon: Users,
      title: t("团队协作", "Collaboration"),
      description: t(
        "具备远程和跨职能团队的强沟通能力。",
        "Strong communication skills for remote and cross-functional teams."
      ),
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            {t("关于我", "About Me")}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t(
                  "我是一名拥有5年以上经验的高级前端工程师，专注于构建可扩展的Web应用程序。我擅长创建直观的用户界面，并为企业级应用优化Web性能。",
                  "I'm a senior frontend engineer with over 5 years of experience building scalable web applications. I specialize in creating intuitive user interfaces and optimizing web performance for enterprise-level applications."
                )}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t(
                  "目前专注于与国际团队的远程合作机会，我在现代前端架构、组件设计系统和敏捷开发流程方面拥有丰富经验。",
                  "Currently focused on remote opportunities with international teams, I bring expertise in modern frontend architecture, component design systems, and agile development workflows."
                )}
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
                    <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
