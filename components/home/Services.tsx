'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'
import { services } from '@/data/services'

export default function Services({ showAll = false }: { showAll?: boolean }) {
  const displayedServices = showAll ? services : services.slice(0, 3)

  return (
    <section className={`py-20 md:py-32 ${showAll ? 'bg-[var(--gray-bg)] border-b border-[var(--border)]' : 'bg-white'}`}>
      <div className="w-full mx-auto px-6 md:px-12">
        
        <div className="text-center flex flex-col items-center mb-12 md:mb-16">
          <SectionLabel text="Our Expertise" color="accent" />
          <h2 className="font-bebas text-4xl md:text-6xl uppercase text-[var(--accent)]">
            {showAll ? 'Engineering' : 'Core'} <span className="text-[var(--primary)]">Services</span>
          </h2>
          <p className="font-inter text-[var(--gray)] max-w-2xl mt-4 text-sm md:text-base">We deliver comprehensive electrical solutions tailored to industrial, commercial, and infrastructure applications.</p>
        </div>

        <ScrollReveal animation={staggerContainer}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service, i) => {
              // Dynamically get the icon component
              const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

              return (
                <motion.div 
                  key={service.slug}
                  variants={fadeUp}
                  whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}
                  className="group bg-white p-8 relative rounded-sm shadow-sm border border-[var(--border)] overflow-hidden flex flex-col h-full"
                >
                  {/* Red top border that grows on hover */}
                  <div className="absolute top-0 left-0 h-1 bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-500" />
                  
                  <motion.div 
                    whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 p-4 bg-[var(--primary-soft)] w-16 h-16 flex items-center justify-center rounded-sm text-[var(--primary)] origin-center"
                  >
                    <IconComponent size={32} strokeWidth={1.5} />
                  </motion.div>
                  
                  <h3 className="font-rajdhani text-2xl font-bold uppercase tracking-wider mb-3 text-[var(--accent)]">
                    {service.title}
                  </h3>
                  
                  <p className="font-inter text-[var(--gray)] text-sm mb-6 leading-relaxed line-clamp-4 flex-grow">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 font-rajdhani text-sm font-bold uppercase tracking-widest text-[var(--black)] group-hover:text-[var(--primary)] transition-colors"
                  >
                    Learn More 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  
                </motion.div>
              )
            })}
          </div>
        </ScrollReveal>

        {!showAll && (
          <div className="text-center mt-16 md:mt-20">
            <Link href="/services">
              <motion.button 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-[var(--primary)] text-white font-rajdhani font-bold tracking-[0.2em] uppercase rounded-sm shadow-xl hover:shadow-2xl transition-all"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
