'use client'

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const IMAGES = [
  '/images/hero/panel-1.jpg',
  '/images/hero/workers/worker-1.png',
  '/images/hero/workers/worker-2.png',
  '/images/hero/workers/worker-3.png',
  '/images/hero/workers/worker-4.png',
  '/images/hero/workers/worker-5.png',
]

const statsData = [
  { end: 17, label: "Projects Completed", suffix: "" },
  { end: 10, label: "Years Experience", suffix: "+" },
  { end: 14, label: "Happy Clients", suffix: "" },
  { end: 2, label: "Regional Offices", suffix: "" }
];

function AutoHighlightingStats() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsData.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 relative z-30 my-8 lg:my-0 lg:ml-8">
      {statsData.map((stat, i) => {
        const isActive = activeIndex === i;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + (i * 0.15), duration: 0.8, type: "spring" }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: isActive ? 1.05 : 1,
                x: isActive ? -10 : 0,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? '0 10px 30px rgba(124,179,66,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
              }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="flex items-center justify-between p-4 rounded-lg backdrop-blur-xl border-l-[6px] overflow-hidden"
              style={{ borderLeftColor: isActive ? 'var(--primary)' : 'transparent' }}
            >
              {/* Highlight sweep effect */}
              {isActive && (
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '200%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0 pointer-events-none"
                />
              )}
              
              <div className="flex flex-col relative z-10">
                <motion.div 
                  animate={{ color: isActive ? 'var(--primary)' : 'var(--accent)' }}
                  className="font-bebas text-4xl leading-none"
                >
                  {stat.end}<span className="text-2xl ml-1">{stat.suffix}</span>
                </motion.div>
                <div className={`font-rajdhani text-[11px] uppercase tracking-widest font-bold mt-1 transition-colors duration-300 ${isActive ? 'text-[var(--black)]' : 'text-[var(--gray)]'}`}>
                  {stat.label}
                </div>
              </div>

              <motion.div 
                animate={{ 
                  scale: isActive ? 1.2 : 0.8,
                  opacity: isActive ? 1 : 0.2
                }}
                className="w-10 h-10 rounded-full flex justify-center items-center bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20 relative z-10"
              >
                <span className="text-xl">✦</span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  )
}

function Particles() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, delay: number, duration: number }[]>([])

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5
    }))
    setParticles(arr)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [`${p.y}vh`, `${p.y - 15}vh`]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bg-[var(--primary)] rounded-full"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const { scrollY } = useScroll()
  const scaleX = useSpring(useTransform(scrollY, [0, 1000], [0, 1]), { stiffness: 100, damping: 30 })

  const words = "POWERING POSSIBILITIES. DELIVERING END TO END ELECTRICAL SOLUTIONS.".split(" ")

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[var(--gray-bg)]">

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={IMAGES[currentSlide]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Clear background overlay with subtle dark tint for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="scanline opacity-10" />
      </div>

      <Particles />

      {/* Since 2009 Vertical */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-left z-20 hidden lg:block">
        <span className="font-bebas text-[var(--primary)] tracking-[6px] opacity-80">SINCE 2014</span>
      </div>

      <div className="w-full mx-auto px-6 md:px-12 h-full relative z-20 flex flex-col justify-center items-center pt-24 pb-12">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 w-full">

          {/* Main Content - Left aligned on desktop */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-black/40 backdrop-blur-sm border border-white/20 mb-6 md:mb-8 shadow-sm lg:self-start"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-rajdhani text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                ISO Certified Electrical Specialists
              </span>
            </motion.div>

            <h1 className="font-bebas text-[clamp(42px,10vw,88px)] text-white leading-[0.9] tracking-tight mb-8 flex flex-wrap justify-center lg:justify-start gap-x-3 md:gap-x-4 drop-shadow-xl w-full">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={word.includes('POSSIBILITIES') || word.includes('SOLUTIONS') ? 'text-[var(--primary)]' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-inter text-gray-100 text-base md:text-xl max-w-2xl mb-10 leading-relaxed font-normal md:font-medium drop-shadow-md mx-auto lg:mx-0"
            >
              A Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions. Committed to deliver from design to planning and installation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-1 sm:flex sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
            >
              <Link href="/services">
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(124,179,66,0.3)' }}
                  className="shimmer-btn bg-[var(--primary)] text-white font-rajdhani uppercase tracking-widest font-bold px-8 sm:px-10 py-4 rounded-sm shadow-lg w-full sm:min-w-[200px]"
                >
                  Explore Expertise
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="border-2 border-white text-white bg-black/20 backdrop-blur font-rajdhani uppercase tracking-widest font-bold px-8 sm:px-10 py-4 rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors w-full sm:min-w-[200px]"
                >
                  Our Projects
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Auto-Highlighting Stats Stream */}
          <AutoHighlightingStats />

        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-sm transition-all border border-[var(--border)] shadow-sm ${currentSlide === i ? 'w-10 bg-[var(--primary)] border-transparent' : 'w-3 bg-white'}`}
            />
          ))}
        </div>

      </div>

      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="absolute bottom-0 left-0 right-0 h-[6px] bg-[var(--primary)] z-30"
      />

    </section>
  )
}
