"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Senior Frontend Engineer",
    company: "Tech Company",
    location: "Remote",
    period: "2022 - Present",
    description:
      "Leading frontend development for enterprise SaaS products. Architecting scalable component libraries and implementing CI/CD pipelines.",
    achievements: [
      "Reduced bundle size by 40% through code splitting and lazy loading",
      "Migrated legacy codebase to Next.js with 99.9% uptime",
      "Built design system used across 5 product teams",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    location: "Hybrid",
    period: "2020 - 2022",
    description:
      "Developed responsive web applications for clients in e-commerce, fintech, and healthcare sectors.",
    achievements: [
      "Delivered 15+ projects with 95% client satisfaction rate",
      "Implemented real-time features using WebSocket and GraphQL",
      "Mentored 3 junior developers",
    ],
  },
  {
    title: "Web Developer",
    company: "Startup",
    location: "On-site",
    period: "2018 - 2020",
    description:
      "Full-stack development for an early-stage startup. Built MVP from scratch and scaled to 10K+ users.",
    achievements: [
      "Built entire frontend architecture using React and TypeScript",
      "Implemented payment integration with Stripe",
      "Optimized performance achieving 90+ Lighthouse score",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Work Experience
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
