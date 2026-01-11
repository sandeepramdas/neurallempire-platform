"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowRight, Calendar, Clock } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container-custom">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
              Insights &{" "}
              <span className="gradient-text">Resources</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughts on custom development, system design, and helping businesses grow with technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 text-center p-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Blog Coming Soon</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                I'm working on sharing insights about custom software development, system architecture,
                and helping businesses make smart technology decisions. Check back soon for articles!
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-900 mb-3">Upcoming Topics:</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>• When to Build Custom Software vs. Buy Off-the-Shelf</li>
                  <li>• How Much Does Custom CRM Development Cost?</li>
                  <li>• 5 Signs Your Business Has Outgrown Spreadsheets</li>
                  <li>• What is a Fractional CTO? (And Do You Need One?)</li>
                  <li>• The Real Cost of Custom Software Development</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="gradient">
                  <Link href="/contact">
                    Let's Talk About Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
