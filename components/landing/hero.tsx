"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, BarChart3 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section id="home" className="pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6"
          >
            Modern School
            <span className="text-blue-600"> Management</span>
            <br />
            Made Simple
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Streamline your school operations with our comprehensive ERP system. Manage students, teachers, fees,
            attendance, and more with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 text-center">Role-based access for admins, teachers, and parents</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Academic Management</h3>
              <p className="text-gray-600 text-center">Track attendance, grades, and academic progress</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-gray-600 text-center">Comprehensive insights and detailed reporting</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
