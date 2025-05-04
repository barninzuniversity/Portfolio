"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="py-8 border-t border-gray-800 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            >
              Ibrahim Zaouali
            </motion.div>
            <p className="text-gray-400 mt-1">Full-Stack Django Developer</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6"
          >
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
              About
            </a>
            <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-300">
              Skills
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact
            </a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm"
        >
          &copy; {new Date().getFullYear()} Ibrahim Zaouali. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

