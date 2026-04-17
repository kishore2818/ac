'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../shared/SectionLabel'
import { projects } from '@/data/projects'

export default function OngoingProjects() {
  const activeProjects = projects.filter((project) => project.status === 'In Progress')

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="site-container">
        <div className="mb-8 md:mb-14 flex flex-col items-start text-left">
          <SectionLabel text="What We Are Building" color="accent" />
          <h2 className="font-cormorant text-4xl md:text-6xl text-[var(--accent)] tracking-wider">
            Ongoing <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)]">
            A snapshot of current work across industrial, institutional, and commercial environments, with transparent progress and execution context.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {activeProjects.map((project, index) => (
            <motion.div
              key={`${project.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6, boxShadow: '0 28px 50px rgba(15,23,42,0.08)' }}
              className="section-shell overflow-hidden rounded-[1.5rem] border border-[var(--border)]"
            >
              <div className="relative h-48 md:h-52 overflow-hidden bg-[var(--black)]">
                <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                  {project.status}
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="font-poppins text-[11px] uppercase tracking-[0.2em] text-[var(--primary)]">
                  {project.client} • {project.location}
                </div>
                <h3 className="mt-3 font-cormorant text-3xl text-[var(--black)]">{project.name}</h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-[var(--gray)]">
                  {project.description}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between font-poppins text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--black-soft)]">
                    <span>Execution Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--gray-bg)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15 }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-left">
          <Link href="/projects">
            <motion.button
              whileHover={{ y: -2 }}
              className="w-full sm:w-auto px-8 md:px-10 py-4 bg-[var(--primary)] text-white font-poppins font-semibold tracking-[0.18em] uppercase rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Explore All Projects →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
