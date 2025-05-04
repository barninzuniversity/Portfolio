"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }
  
  // Skill items with animation variations
  const skillItems = [
    { name: "Django", color: "from-purple-500 to-blue-500", delay: 0.2 },
    { name: "Python", color: "from-blue-500 to-cyan-500", delay: 0.3 },
    { name: "React", color: "from-pink-500 to-purple-500", delay: 0.4 },
    { name: "SQL", color: "from-green-500 to-emerald-500", delay: 0.5 }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          style={{ 
            opacity, 
            y
          }}
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-10 mix-blend-overlay"></div>
              <Image 
                src="/ibrahim-profile.jpg" 
                alt="Ibrahim Zaouali" 
                fill 
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              {/* Floating Skill Bubbles */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {skillItems.map((skill, index) => (
                  <motion.div
                    key={index}
                    className={`absolute rounded-full bg-gradient-to-br ${skill.color} text-white font-medium text-sm flex items-center justify-center h-16 w-16 shadow-lg`}
                    style={{
                      x: `${(index * 25) - 30}%`,
                      y: `${(index * 20) + 10}%`,
                      opacity: 0.8,
                    }}
                    animate={{
                      y: [`${(index * 20) + 10}%`, `${(index * 20) + 15}%`, `${(index * 20) + 10}%`],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: skill.delay,
                      }
                    }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="absolute -bottom-5 -right-5 w-40 h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -top-5 -left-5 w-40 h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>

          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 inline-block relative">
                About Me
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-6">
              I'm a passionate Full-Stack Developer with over 5 years of experience specializing in Django and modern
              web technologies. My journey in software development began with a fascination for building things that
              live on the internet.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-6">
              With a strong foundation in Python and Django, I've built robust backend systems that power complex web
              applications. I complement my backend expertise with modern frontend skills to create seamless user
              experiences.
            </motion.p>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">What I bring to the table:</h3>

              <ul className="space-y-3">
                {[
                  "Expert in Django REST Framework and Python",
                  "Database design and optimization (SQLite3, MySQL)",
                  "Frontend development with React and modern JavaScript",
                  "Strong problem-solving skills and attention to detail",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.span 
                      className="inline-block w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

