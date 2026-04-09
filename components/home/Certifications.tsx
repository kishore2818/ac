'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { staggerContainer, fadeUp } from '../shared/ScrollReveal'

const certs = [
  { name: 'ISO 9001:2015', org: 'TUV SUD', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { name: 'CPRI Approved', org: 'Govt. of India', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'Class A Contractor', org: 'Electrical Inspectorate', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'CE Marked', org: 'European Standards', icon: 'M12 8c-1.6 0-3 1.4-3 3s1.4 3 3 3 3-1.4 3-3-1.4-3-3-3z M12 22v-6' }
]

export default function Certifications() {
  return (
    <motion.section 
      initial={{ x: 150, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white py-16 lg:py-24 h-full flex flex-col justify-center border-l lg:border-[var(--border)]"
    >
      <div className="w-full max-w-2xl mx-auto px-6 lg:px-12">
        
        <div className="text-center flex flex-col items-center mb-16">
          <SectionLabel text="Quality Assured" color="accent" />
          <h2 className="font-bebas text-5xl md:text-6xl text-[var(--black)] uppercase">
            Certifications & <span className="text-[var(--primary)]">Licenses</span>
          </h2>
        </div>

        <ScrollReveal animation={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(124,179,66,0.1)' }}
              className="bg-white border text-center border-[var(--border)] p-8 rounded-sm relative overflow-hidden group transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              
              <div className="w-16 h-16 mx-auto bg-[var(--gray-bg)] rounded-full flex justify-center items-center mb-6 group-hover:bg-[var(--primary-soft)] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={cert.icon} />
                </svg>
              </div>
              
              <h3 className="font-bebas text-2xl text-[var(--black)] mb-1 tracking-wide">{cert.name}</h3>
              <p className="font-inter text-[var(--gray-light)] text-sm">{cert.org}</p>
            </motion.div>
          ))}
        </ScrollReveal>

        <div className="bg-[var(--primary-soft)] border border-[var(--primary)]/20 p-4 rounded-sm flex justify-center">
          <p className="font-rajdhani text-[var(--primary-dark)] font-bold tracking-widest uppercase text-sm md:text-base text-center">
            Government Approved • Industry Certified • Quality Assured
          </p>
        </div>

      </div>
    </motion.section>
  )
}
