import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import { products } from '@/data/products'
import Link from 'next/link'

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/products.png" title={product.name} subtitle={product.description} />
        
        <section className="py-12 md:py-24 bg-white">
          <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
             {/* Main Details */}
            <div className="lg:col-span-8">
               <div className="w-full aspect-video bg-[var(--gray-bg)] border border-[var(--border)] mb-6 md:mb-10 p-2 overflow-hidden rounded-[1.5rem] md:rounded-sm relative group">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover rounded-sm group-hover:scale-[1.02] transition-transform duration-700" 
                  alt={product.name}
                />
               </div>

               <h2 className="font-cormorant md:font-bebas text-4xl text-[var(--black)] mb-5 md:mb-6 border-b border-[var(--border)] pb-4">Technical Specifications</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                 {product.specs.map((spec, i) => (
                   <div key={i} className="flex flex-col bg-[var(--gray-bg)] p-4 border-l-2 border-[var(--primary)] rounded-2xl md:rounded-none">
                     <span className="font-rajdhani text-[var(--gray)] uppercase tracking-widest text-xs font-bold">{spec.label}</span>
                     <span className="font-inter text-[var(--black)] font-medium mt-1">{spec.value}</span>
                   </div>
                 ))}
               </div>

               <h2 className="font-cormorant md:font-bebas text-4xl mb-5 md:mb-6 border-b border-[var(--border)] pb-4">Key Features</h2>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8 mb-8 md:mb-10">
                 {product.features.map((feat, i) => (
                   <li key={i} className="flex items-start gap-3 font-inter text-[var(--gray-dark)] bg-white border border-gray-100 p-4 shadow-sm rounded-2xl md:rounded-none">
                     <span className="text-[var(--primary)] text-lg">✓</span>
                     {feat}
                   </li>
                 ))}
               </ul>

               <h2 className="font-cormorant md:font-bebas text-4xl mb-5 md:mb-6 border-b border-[var(--border)] pb-4">Applications</h2>
               <div className="flex flex-wrap gap-3">
                 {product.applications.map((app, i) => (
                   <span key={i} className="px-4 py-2 border border-[var(--border)] bg-white font-rajdhani uppercase tracking-wide text-sm font-bold text-[var(--gray)]">
                     {app}
                   </span>
                 ))}
               </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-[var(--gray-bg)] border border-[var(--border)] p-6 md:p-8 rounded-[1.5rem] md:rounded-sm sticky top-[100px] shadow-sm">
                <h3 className="font-cormorant md:font-bebas text-3xl text-[var(--black)] mb-4">Interested in {product.name}?</h3>
                <p className="font-inter text-sm text-[var(--gray)] mb-6">Our panels are 100% customizable to your site dimensions, load requirements, and brand preferences.</p>
                <div className="space-y-4">
                  <Link href="/contact" className="block w-full text-center bg-[var(--primary)] text-white font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold py-3 hover:bg-[var(--primary-dark)] transition-colors rounded-2xl md:rounded-sm">
                    Request Quote
                  </Link>
                  <button className="block w-full text-center border-2 border-[var(--primary)] text-[var(--primary)] font-poppins md:font-rajdhani uppercase tracking-[0.18em] font-semibold md:font-bold py-3 hover:bg-[var(--primary-soft)] transition-colors rounded-2xl md:rounded-sm">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
