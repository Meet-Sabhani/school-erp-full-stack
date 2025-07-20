"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, Calendar, FileText, BarChart3, Shield, Smartphone, Cloud } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Complete student profiles, enrollment, and academic tracking",
  },
  {
    icon: DollarSign,
    title: "Fee Management",
    description: "Automated fee collection, payment tracking, and financial reports",
  },
  {
    icon: Calendar,
    title: "Attendance Tracking",
    description: "Digital attendance with real-time notifications to parents",
  },
  {
    icon: FileText,
    title: "Result Management",
    description: "Upload and manage exam results, report cards, and certificates",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights with interactive charts and reports",
  },
  {
    icon: Shield,
    title: "Role-based Security",
    description: "Secure access control with different permission levels",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Access from any device with our responsive design",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure cloud storage for documents and media files",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your School
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive ERP system provides all the tools you need to streamline your school operations and
            improve educational outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
