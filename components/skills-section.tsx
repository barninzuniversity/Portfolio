"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Skill = {
  name: string
  level: number
  color: string
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const frontendSkills: Skill[] = [
    { name: "HTML/CSS", level: 90, color: "from-red-500 to-red-700" },
    { name: "JavaScript", level: 85, color: "from-yellow-500 to-yellow-700" },
    { name: "React", level: 85, color: "from-purple-500 to-purple-700" },
    { name: "TypeScript", level: 75, color: "from-blue-600 to-indigo-600" },
    { name: "Tailwind CSS", level: 85, color: "from-cyan-500 to-blue-500" },
  ]

  const backendSkills: Skill[] = [
    { name: "Python", level: 90, color: "from-blue-500 to-blue-700" },
    { name: "Django", level: 95, color: "from-green-500 to-green-700" },
    { name: "Django REST Framework", level: 85, color: "from-red-500 to-rose-500" },
    { name: "SQLite3", level: 80, color: "from-blue-700 to-indigo-700" },
    { name: "Docker", level: 75, color: "from-blue-400 to-cyan-400" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="skills" className="py-20 relative bg-gray-900/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            My Skills
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I've honed my skills across the full stack, with a particular focus on Django and Python for backend
            development.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h3 className="text-2xl font-bold mb-8 text-center">Frontend</h3>
            <div className="space-y-8">
              {frontendSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h3 className="text-2xl font-bold mb-8 text-center">Backend</h3>
            <div className="space-y-8">
              {backendSkills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
        >
          {[
            { name: "Python", icon: "🐍" },
            { name: "Django", icon: "🎯" },
            { name: "React", icon: "⚛️" },
            { name: "JavaScript", icon: "📜" },
            { name: "SQLite3", icon: "🗃️" },
            { name: "Git", icon: "📝" },
            { name: "Docker", icon: "🐳" },
            { name: "TailwindCSS", icon: "🎨" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

