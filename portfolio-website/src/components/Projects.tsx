"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Admin Dashboard",
    description:
      "A comprehensive admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    github: "https://github.com/guoguinan/portfolio-projects/tree/main/ecommerce-admin",
    demo: "https://ecommerce-admin-gh-enry.vercel.app",
  },
  {
    title: "Real-time Collaborative Whiteboard",
    description:
      "Multi-user whiteboard application with real-time synchronization, drawing tools, and shape recognition.",
    tech: ["React", "TypeScript", "Canvas API", "WebSocket"],
    github: "https://github.com/guoguinan/portfolio-projects/tree/main/collaborative-whiteboard",
    demo: "https://collaborative-whiteboard-taupe.vercel.app",
  },
  {
    title: "Social Media Analytics",
    description:
      "Analytics dashboard for tracking social media metrics, engagement rates, and audience growth across platforms.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
    github: "https://github.com/guoguinan/portfolio-projects/tree/main/social-analytics",
    demo: "https://social-analytics-rho.vercel.app",
  },
  {
    title: "Task Management System",
    description:
      "Kanban-style task management with drag-and-drop, team collaboration, and progress tracking.",
    tech: ["Next.js", "TypeScript", "DnD Kit", "Prisma"],
    github: "https://github.com/guoguinan/portfolio-projects/tree/main/task-management",
    demo: "https://task-management-gh-enry.vercel.app",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 sm:py-32 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
