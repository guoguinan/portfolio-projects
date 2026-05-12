"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Experience() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: t("高级前端工程师", "Senior Frontend Engineer"),
      company: t("科技公司", "Tech Company"),
      location: t("远程", "Remote"),
      period: "2022 - Present",
      description: t(
        "主导企业级SaaS产品的前端开发。构建可扩展的组件库并实现CI/CD流水线。",
        "Leading frontend development for enterprise SaaS products. Architecting scalable component libraries and implementing CI/CD pipelines."
      ),
      achievements: [
        t("通过代码分割和懒加载将打包体积减少40%", "Reduced bundle size by 40% through code splitting and lazy loading"),
        t("将遗留代码迁移至Next.js，实现99.9%正常运行时间", "Migrated legacy codebase to Next.js with 99.9% uptime"),
        t("构建被5个产品团队使用的设计系统", "Built design system used across 5 product teams"),
      ],
    },
    {
      title: t("前端开发工程师", "Frontend Developer"),
      company: t("数字代理公司", "Digital Agency"),
      location: t("混合办公", "Hybrid"),
      period: "2020 - 2022",
      description: t(
        "为电商、金融科技和医疗领域的客户开发响应式Web应用。",
        "Developed responsive web applications for clients in e-commerce, fintech, and healthcare sectors."
      ),
      achievements: [
        t("交付15+项目，客户满意度达95%", "Delivered 15+ projects with 95% client satisfaction rate"),
        t("使用WebSocket和GraphQL实现实时功能", "Implemented real-time features using WebSocket and GraphQL"),
        t("指导3名初级开发人员", "Mentored 3 junior developers"),
      ],
    },
    {
      title: t("Web开发工程师", "Web Developer"),
      company: t("初创公司", "Startup"),
      location: t("现场办公", "On-site"),
      period: "2018 - 2020",
      description: t(
        "为早期创业公司进行全栈开发。从零构建MVP并扩展至10K+用户。",
        "Full-stack development for an early-stage startup. Built MVP from scratch and scaled to 10K+ users."
      ),
      achievements: [
        t("使用React和TypeScript构建完整的前端架构", "Built entire frontend architecture using React and TypeScript"),
        t("集成Stripe支付系统", "Implemented payment integration with Stripe"),
        t("优化性能，Lighthouse评分达到90+", "Optimized performance achieving 90+ Lighthouse score"),
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            {t("工作经历", "Work Experience")}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
