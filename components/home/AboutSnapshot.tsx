'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal, { fadeLeft, fadeRight } from '../shared/ScrollReveal'
import Link from 'next/link'

export default function AboutSnapshot() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="w-full mx-auto px-8">
        
        {/* Centered Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center mb-10 sm:mb-12"
        >
          <SectionLabel text="Who We Are" color="accent" centered={true} />
          <h2 className="font-bebas text-[clamp(2rem,6vw,3.75rem)] leading-[1.1] text-[var(--accent)] mt-4 px-4">
            ENGINEERING EXCELLENCE IN <span className="text-[var(--primary)] text-[clamp(2rem,6vw,3.75rem)] inline-block ml-2 px-4 py-1 border-2 border-[var(--primary)] bg-[var(--primary-soft)] rounded-lg shadow-sm">POWER DISTRIBUTION</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1100px] mx-auto">
          
          {/* Left Column (Text) */}
          <ScrollReveal animation={fadeLeft} className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0 lg:ml-auto lg:pr-4">
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-inter text-[var(--black-soft)] font-medium text-lg mb-8 leading-relaxed max-w-2xl border-l-4 border-[var(--primary)] pl-6 py-3 bg-[var(--primary-soft)] rounded-r-lg shadow-sm"
            >
              Adler Contracts is a Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions. Our reputation is built on meticulous planning, robust project management, and a relentless focus on quality and safety.
            </motion.p>

            <div className="space-y-6 mb-10 w-full max-w-xl">
              {[
                { i: '01', title: 'Meticulous Planning', desc: 'Detailed execution strategies for precision delivery.' },
                { i: '02', title: 'Quality & Safety First', desc: 'Uncompromising standards in every structure we deliver.' },
                { i: '03', title: 'Transparent Partnerships', desc: 'Built on trust, speed, and optimum cost management.' },
              ].map((feat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="font-bebas text-2xl text-[var(--primary)] border-b-2 border-primary-200 h-8">{feat.i}</div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-rajdhani font-bold text-xl uppercase mb-1">{feat.title}</h4>
                    <p className="font-inter text-sm text-[var(--gray-light)]">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <motion.button 
                whileHover={{ backgroundColor: 'var(--primary)', color: 'white' }}
                className="border-2 border-[var(--primary)] text-[var(--primary)] font-rajdhani uppercase tracking-widest font-bold px-8 py-3 rounded-sm transition-colors"
              >
                Read More About Us
              </motion.button>
            </Link>
          </ScrollReveal>

          {/* Right Column (Images) */}
          <ScrollReveal animation={fadeRight} delay={0.2} className="relative w-full">
            {/* Background decorative stripe */}
            <div 
              className="absolute -top-12 -right-12 w-3/4 h-[120%] bg-[var(--gray-bg)] z-0"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}
            />
            
            <div className="relative z-10 w-[85%] lg:w-[80%] mx-auto lg:mr-auto lg:ml-8 aspect-[4/5] group">
              
              {/* Inner container to clip the image scaling without clipping the badges */}
              <div className="absolute inset-0 bg-[var(--black)] p-3 shadow-2xl rounded-sm overflow-hidden border border-gray-100">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[var(--primary)] z-20 m-4 pointer-events-none" />

                <img 
                  src="/images/hero/workers/worker-5.png" 
                  alt="Adler Contracts Engineering Team" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                />
              </div>
              
              {/* Floating Badge 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 sm:top-12 -left-2 sm:-left-8 bg-white p-3 sm:p-4 shadow-xl border-l-4 border-[var(--primary)] rounded-sm flex items-center gap-3 z-30"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--primary-soft)] rounded-full flex justify-center items-center">
                  <CheckCircle className="text-[var(--primary)] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-rajdhani font-bold tracking-wider text-xs sm:text-sm uppercase">ISO Certified</div>
                  <div className="font-inter text-[10px] sm:text-xs text-[var(--gray-light)]">9001:2015</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-8 bg-[var(--primary)] text-white p-4 sm:p-6 shadow-2xl rounded-sm z-30 flex flex-col items-center sm:items-start"
              >
                <div className="font-bebas text-4xl sm:text-5xl mb-1 flex items-baseline">10<span className="text-xl sm:text-2xl ml-1">+</span></div>
                <div className="font-rajdhani tracking-widest text-center sm:text-left uppercase text-[10px] sm:text-xs font-bold w-full sm:w-24">Years of Excellence</div>
              </motion.div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
