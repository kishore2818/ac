'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'

const testimonials = [
  {
    quote: "Adler Contracts delivered the entire electrical infrastructure for our cold storage and office facility ahead of schedule. Their turnkey approach and attention to safety standards was truly impressive.",
    name: "Operations Head",
    company: "SATS Food Solutions India Pvt Ltd",
    role: "Facility Operations",
    image: "/images/products/plc-control-panels.webp",
  },
  {
    quote: "The precision and quality of Adler's electrical work at our aerospace manufacturing unit met the most stringent international standards. A truly reliable partner for critical infrastructure.",
    name: "Project Manager",
    company: "Thyssenkrupp Aerostructures Pvt Ltd",
    role: "Project Engineering",
    image: "/images/products/drive-control-panelzs.webp",
  },
  {
    quote: "From design to commissioning, Adler Contracts managed our entire electrification project with meticulous planning and zero safety incidents. We highly recommend their services.",
    name: "Engineering Director",
    company: "Aequs SEZ Ltd",
    role: "Infrastructure Development",
    image: "/images/products/cems-pannel.webp",
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const handleNext = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const handlePrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[var(--gray-bg)] py-24 border-y border-[var(--border)]">
      <div className="w-full mx-auto px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <SectionLabel text="Client Feedback" color="accent" />
          <h2 className="font-bebas text-5xl md:text-6xl text-[var(--accent)] tracking-wider">
            WHAT THEY <span className="text-[var(--primary)]">SAY</span>
          </h2>
          
          <div className="flex gap-4 mt-8">
            <button 
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-12 h-12 border border-[var(--primary)] bg-white rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-12 h-12 border border-[var(--primary)] bg-white rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
            >
              →
            </button>
          </div>
        </motion.div>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white border text-[var(--black)] border-[var(--border)] shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image Panel */}
              <div className="relative md:w-72 h-52 md:h-auto shrink-0 overflow-hidden">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].company}
                  className="w-full h-full object-cover brightness-100 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                  <div>
                    <p className="font-rajdhani text-white text-xs font-bold uppercase tracking-widest opacity-90">
                      {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 md:p-14 relative flex-1">
                {/* Huge quote mark background */}
                <div className="absolute top-0 left-10 font-bebas text-[180px] text-[var(--gray-bg)] leading-none pointer-events-none select-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" className="shrink-0">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  ))}
                </div>
                
                <p className="font-inter text-xl md:text-2xl text-[var(--gray-dark)] leading-relaxed mb-8 relative z-10 font-medium">
                  {testimonials[current].quote}
                </p>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-[var(--primary-soft)] border border-[var(--primary)]/20 rounded-full flex justify-center items-center font-bebas text-2xl text-[var(--primary)]">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-rajdhani text-xl font-bold text-[var(--black)] uppercase tracking-wider">
                      {testimonials[current].name}
                    </h4>
                    <p className="font-inter text-sm text-[var(--gray)]">
                      {testimonials[current].role} · {testimonials[current].company}
                    </p>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-8">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-[var(--primary)]' : 'w-3 bg-[var(--border)]'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

