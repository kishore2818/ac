'use client'

import { motion } from 'framer-motion'
import { Plane, Factory, Utensils, Building2, School, Hotel, Zap } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const industries = [
  { icon: Plane, name: 'Aerospace', desc: 'Precision electrical infrastructure for aerospace manufacturing and assembly.' },
  { icon: Factory, name: 'Industrial Manufacturing', desc: 'End-to-end solutions for large-scale production and processing facilities.' },
  { icon: Utensils, name: 'Food & Beverage', desc: 'Specialized cold storage and food processing electrical systems.' },
  { icon: Building2, name: 'Real Estate & Construction', desc: 'Residential townships, luxury villas, and commercial complexes.' },
  { icon: School, name: 'Institutional', desc: 'Schools, colleges, and campus infrastructure electrification.' },
  { icon: Hotel, name: 'Hospitality', desc: 'Resorts, hotels, and premium hospitality electrical solutions.' },
]

export default function Industries() {
  return (
    <section className="bg-[var(--gray-bg)] py-20 md:py-32 border-y border-[var(--border)]">
      <div className="w-full mx-auto px-6 md:px-12">

        <div className="text-center flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel text="Industries We Serve" color="accent" />
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Zap className="w-10 h-10 text-[var(--primary)] animate-pulse mb-2 md:mb-0" />
            <h2 className="font-bebas text-4xl md:text-6xl uppercase text-[var(--accent)] tracking-wider">
              Powering <span className="text-[var(--primary)]">Every Sector</span>
            </h2>
          </div>
        </div>

        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02, borderColor: 'var(--primary)' }}
              className="group relative bg-white border border-[var(--border)] p-8 overflow-hidden rounded-sm transition-all duration-300"
            >
              {/* Hover Diagonal Overlay */}
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
              />

              <div className="relative z-10 mb-6 text-[var(--accent)] group-hover:text-[var(--primary)] transition-all transform group-hover:scale-110 duration-300">
                <ind.icon size={48} strokeWidth={1} />
              </div>
              <h3 className="relative z-10 font-rajdhani text-2xl font-bold uppercase tracking-wider mb-2 text-[var(--accent)]">
                {ind.name}
              </h3>
              <p className="relative z-10 font-inter text-sm text-[var(--gray)]">
                {ind.desc}
              </p>
            </motion.div>
          ))}
        </ScrollReveal>

      </div>
    </section>
  )
}
