"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "10,000+", label: "Students Managed" },
  { number: "500+", label: "Schools Using" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
]

export function Stats() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Schools Worldwide</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of educational institutions that trust our platform
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
