import { NextResponse } from 'next/server'

export const staticTestimonials = [
  {
    quote: "Adler delivered the electrical infrastructure within the required project schedule and maintained excellent coordination throughout execution.",
    name: "Rajesh Kulkarni",
    role: "Vice President — Infrastructure",
    company: "Aequs SEZ / Aerospace Division",
    image: "/images/hero/panel-1.jpg"
  },
  {
    quote: "Their technical design and panel manufacturing precision ensured smooth commissioning for our high-capacity processing facility with zero downtime.",
    name: "Vikram Sharma",
    role: "Chief General Manager",
    company: "SATS Food Solutions",
    image: "/images/projects/comp-1.png"
  },
  {
    quote: "Adler's engineering team handled our HT/LT power distribution with outstanding safety adherence, structured quality checks, and disciplined project management.",
    name: "Ananth Ramaswamy",
    role: "Head of Electrical Projects",
    company: "SFS Industrial Manufacturing",
    image: "/images/projects/comp-5.png"
  }
]

export async function GET() {
  return NextResponse.json(staticTestimonials)
}
