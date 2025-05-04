"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string

}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      description:
        "A fully-featured e-commerce platform with user authentication, product catalog, cart functionality, and order processing.",
      image: "/drop.png",
      tags: ["Django", "React", "SQLite3"],
      githubUrl: "https://github.com/barninzuniversity/DropAi-V2",
   
    },
    {
      title: "SaaS Project",
      description:
        "A  SaaS application with a user-friendly dashboard and real-time analytics with API key implementation. Features custom authentication, intuitive user interface, and comprehensive admin panel for managing users and content.",
      image: "/s.png" ,
      tags: ["Django", "SQLite3", "Tailwind CSS"],
      githubUrl: "https://github.com/barninzuniversity/Saas",

    },
    {
      title: "Jinder - AI Job Finder",
      description:
        "An intelligent job matching platform powered by AI that connects job seekers with their ideal positions based on skills, preferences, and career goals. The system uses advanced algorithms to provide personalized job recommendations and streamline the application process.",
      image: "/jinder.png",
      tags: ["AI/ML", "Django", "Tailwind CSS"],
      githubUrl: "https://github.com/barninzuniversity/Jinder",

    },
  ]

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

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(93,52,236,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            Featured Projects
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in Django and full-stack
            development.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-black/50 backdrop-blur-md border-white/20 hover:bg-white/10"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>

                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-medium py-1 px-2 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            size="lg"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

