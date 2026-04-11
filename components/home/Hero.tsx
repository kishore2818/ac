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

function StatsCard({ stat, isActive, isMobile, index }: { stat: typeof statsData[0], isActive: boolean, isMobile: boolean, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 50 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
      className={`relative ${isMobile ? 'min-w-[200px] mx-2' : 'w-full'}`}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.05 : 1,
          backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isActive ? '0 10px 30px rgba(124,179,66,0.3)' : '0 4px 6px rgba(0,0,0,0.05)',
          x: !isMobile && isActive ? -10 : 0,
          y: isMobile && isActive ? -5 : 0
        }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between p-3 sm:p-4 rounded-lg backdrop-blur-xl border-l-[4px] sm:border-l-[6px] overflow-hidden"
        style={{ 
          borderLeftColor: isActive ? 'var(--primary)' : 'transparent',
        }}
      >
        <div className="flex flex-col relative z-10 w-full">
          <div className="font-bebas text-3xl sm:text-4xl leading-none text-[var(--primary)]">
            {stat.end}<span className="text-xl ml-1">{stat.suffix}</span>
          </div>
          <div className={`font-rajdhani text-[10px] sm:text-[11px] uppercase tracking-widest font-bold mt-1 ${isActive ? 'text-[var(--black)]' : 'text-[var(--gray)]'}`}>
            {stat.label}
          </div>
        </div>
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20 transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          <span className="text-base sm:text-xl">✦</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AutoHighlightingStats({ isMobile }: { isMobile: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  if (isMobile) {
    // Infinite loop for mobile
    const duplicatedStats = [...statsData, ...statsData];
    return (
      <div className="w-full overflow-hidden py-4 -mx-6 px-6">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {duplicatedStats.map((stat, i) => (
            <StatsCard key={i} stat={stat} isActive={false} isMobile={true} index={i} />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-[300px] flex flex-col gap-4 relative z-30 ml-8">
      {statsData.map((stat, i) => (
        <StatsCard key={i} stat={stat} isActive={activeIndex === i} isMobile={false} index={i} />
      ))}
    </div>
  )
}

function Particles() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, delay: number, duration: number }[]>([])

  useEffect(() => {
    const arr = Array.from({ length: 15 }).map((_, i) => ({
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
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
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
  const [windowWidth, setWindowWidth] = useState(0)
  
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(timer)
    }
  }, [])

  const { scrollY } = useScroll()
  const scaleX = useSpring(useTransform(scrollY, [0, 1000], [0, 1]), { stiffness: 100, damping: 30 })

  const words = "POWERING POSSIBILITIES. DELIVERING END TO END ELECTRICAL SOLUTIONS.".split(" ")
  const isMobile = windowWidth > 0 && windowWidth < 1024;

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--gray-bg)] flex items-center">

      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={IMAGES[currentSlide]}
            alt="Adler Contracts Background"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Particles />

      {/* Since 2014 Header - Visible and non-hidden on mobile */}
      <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
        <div className="w-px h-12 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent" />
        <span className="font-bebas text-[var(--primary)] tracking-[4px] sm:tracking-[6px] text-[10px] sm:text-xs opacity-80 vertical-text py-4">SINCE 2014</span>
        <div className="w-px h-12 sm:h-20 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent" />
      </div>

      <div className="w-full mx-auto px-6 sm:px-12 md:px-20 relative z-20 pt-16 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 w-full">

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/40 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="font-rajdhani text-white text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
                ISO 9001:2015 Certified Specialists
              </span>
            </motion.div>

            <h1 className="font-bebas text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-[0.95] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`${word.includes('POSSIBILITIES') || word.includes('SOLUTIONS') ? 'text-[var(--primary)]' : ''} inline-block mr-2 sm:mr-4`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-inter text-gray-200 text-sm sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-8 leading-relaxed font-normal opacity-90"
            >
              A Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions. Committed to deliver from design to planning and installation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(124,179,66,0.3)' }}
                  className="shimmer-btn bg-[var(--primary)] text-white font-rajdhani uppercase tracking-widest font-bold px-8 py-3.5 rounded-sm shadow-xl w-full text-sm sm:text-base"
                >
                  Explore Expertise
                </motion.button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="border-2 border-white text-white bg-black/20 backdrop-blur font-rajdhani uppercase tracking-widest font-bold px-8 py-3.5 rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors w-full text-sm sm:text-base"
                >
                  Our Projects
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Stats Section - Carousel on mobile, Stack on desktop */}
          <div className="w-full lg:w-auto mt-6 lg:mt-0">
             <AutoHighlightingStats isMobile={isMobile} />
          </div>

        </div>
      </div>

      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="absolute bottom-0 left-0 right-0 h-[4px] bg-[var(--primary)] z-30"
      />

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  )
}
