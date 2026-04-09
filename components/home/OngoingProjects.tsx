'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import { projects } from '@/data/projects'

export default function OngoingProjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="w-full mx-auto px-6 md:px-12 mb-10 md:mb-16 text-center flex flex-col items-center">
        <SectionLabel text="What We Are Building" color="accent" />
        <h2 className="font-bebas text-4xl md:text-6xl text-[var(--accent)] tracking-wider">
          Ongoing <span className="text-[var(--primary)]">Projects</span>
        </h2>
      </div>

      <div className="overflow-hidden">
        <motion.div 
          ref={containerRef}
          className="flex gap-8 cursor-grab active:cursor-grabbing pb-8"
          drag="x"
          dragConstraints={{ right: 0, left: -2000 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.filter(p => p.status === 'In Progress').map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="shrink-0 w-[85vw] md:w-[500px] bg-white border border-[var(--border)] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-60 bg-[var(--black)] overflow-hidden">
                 <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt={project.name} />
                 <div className="absolute top-4 right-4 bg-white text-[var(--primary)] border border-[var(--primary)]/20 font-rajdhani text-xs font-bold uppercase tracking-widest px-3 py-1 shadow-md flex items-center gap-2 rounded-sm">
                   <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-pulse" />
                   {project.status}
                 </div>
              </div>
              <div className="p-8">
                <div className="font-rajdhani text-[var(--primary)] tracking-widest uppercase text-xs font-bold mb-2">
                  {project.client} • {project.location}
                </div>
                <h3 className="font-bebas text-3xl text-[var(--black)] tracking-wide mb-3">{project.name}</h3>
                <p className="font-inter text-sm text-[var(--gray)] mb-6">
                  {project.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between font-rajdhani text-xs text-[var(--black)] uppercase tracking-widest font-bold">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--gray-bg)] rounded-sm overflow-hidden border border-[var(--border)]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-[var(--primary)]" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-12">
        <Link href="/projects">
          <motion.button
            whileHover={{ y: -2 }}
            className="px-10 py-4 bg-[var(--primary)] text-white font-rajdhani font-bold tracking-widest uppercase rounded-sm shadow-xl hover:shadow-2xl transition-all"
          >
            Explore All Projects →
          </motion.button>
        </Link>
      </div>
    </section>
  )
}
