import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { ContactForm } from "@/components/landing/contact-form"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <ContactForm />
      <Footer />
    </div>
  )
}
