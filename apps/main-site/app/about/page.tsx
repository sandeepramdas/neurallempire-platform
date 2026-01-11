"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code2,
  Lightbulb,
  Target,
  Heart,
  ArrowRight,
  Linkedin,
  Mail,
  Award,
  Building2
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

const philosophy = [
  {
    icon: Target,
    title: "Business-First Thinking",
    description: "Every technical decision is made in service of operational goals, not because a technology is trendy or interesting."
  },
  {
    icon: Lightbulb,
    title: "Clarity Over Complexity",
    description: "Simple, maintainable systems beat over-engineered architectures. Complexity is a liability, not a feature."
  },
  {
    icon: Heart,
    title: "Partnership, Not Vendor Relationship",
    description: "I'm invested in your long-term success, not just closing a deal. Your growth is my success metric."
  },
  {
    icon: Code2,
    title: "AI as Tool, Not Magic",
    description: "AI accelerates development and adds intelligence, but human judgment guides every decision."
  }
]

const fractionalCtoServices = [
  "Strategic technology planning and roadmapping",
  "Vendor evaluation and build-vs-buy decisions",
  "Architecture reviews and technical due diligence",
  "Team scaling and hiring strategy",
  "Security and compliance guidance",
  "Technology budget optimization"
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6">
                About{" "}
                <span className="gradient-text">The Architect</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 leading-relaxed">
                I'm a systems architect and software engineer specializing in custom digital platforms
                for growing businesses. My approach is simple: understand the business first, technology second.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="gradient">
                  <Link href="/contact">
                    Get in Touch
                    <Mail className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 w-5 h-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-1">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  {/* Placeholder for founder image */}
                  <div className="text-center p-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
                      <Code2 className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-gray-600">Your Photo Here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Background & Experience</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  For over [X] years, I've designed and built systems across [industries: e.g., healthcare,
                  manufacturing, logistics, finance]. From inventory platforms handling millions in annual
                  transactions to CRMs supporting hundreds of sales teams, I've seen what works and what doesn't.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  What I learned: business problems don't fit into templates. Off-the-shelf software forces
                  compromise. Custom development, done right, isn't expensive—it's an investment in operational
                  efficiency and competitive advantage.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Too many developers jump straight to code without grasping workflows, pain points, or strategic
                  goals. I spend as much time mapping your operations as I do building your system—because the
                  best software is invisible. It just works.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>[X]+</CardTitle>
                    <CardDescription>Years of Experience</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>[X]+</CardTitle>
                    <CardDescription>Projects Delivered</CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-3">
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>[X]+</CardTitle>
                    <CardDescription>Industries Served</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                My Philosophy
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These principles guide how I approach every project
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {philosophy.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fractional CTO Section */}
      <section id="cto" className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Fractional CTO & Strategic Partner</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Beyond building systems, I serve as fractional CTO for businesses without dedicated
                technical leadership. If you need someone to translate technical complexity into
                business strategy, guide major technology decisions, or provide ongoing technical
                leadership without hiring full-time, this might be a good fit.
              </p>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">What Fractional CTO Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {fractionalCtoServices.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 font-semibold text-sm">{idx + 1}</span>
                        </div>
                        <span className="text-gray-600">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-gray-600 mb-6">
                      Typical engagement: Monthly retainer for strategic guidance, quarterly planning
                      sessions, and on-demand consulting for major decisions.
                    </p>
                    <Button asChild variant="gradient">
                      <Link href="/contact">Discuss Fractional CTO Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Touch Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Beyond Work</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                When I'm not designing systems, I'm [your personal interests: e.g., 'hiking in the Pacific
                Northwest,' 'reading about systems thinking,' 'experimenting with new technologies']. I believe
                the best work comes from balanced people who think beyond their screens.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Curious whether we'd be a good fit? Let's have a conversation—no commitment, no sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
