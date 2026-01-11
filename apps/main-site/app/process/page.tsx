"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Layers,
  Code,
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  FileText
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

const phases = [
  {
    number: 1,
    title: "Discovery & Understanding",
    duration: "1-2 weeks",
    icon: Search,
    description: "We start by understanding your business, not jumping into software design. I'll spend time with your team, observe workflows, map processes, and identify pain points. This phase is about clarity—understanding what you're trying to achieve and why current solutions aren't working.",
    activities: [
      "Stakeholder interviews",
      "Process mapping and documentation",
      "Pain point analysis",
      "Technical landscape assessment",
      "Goal definition and success metrics"
    ],
    deliverable: "Discovery document outlining findings and recommendations",
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: 2,
    title: "System Design & Planning",
    duration: "2-3 weeks",
    icon: Layers,
    description: "Once we understand your business, I design a system architecture tailored to your operations. This isn't about picking technologies—it's about modeling your workflows, data structures, and business logic into a cohesive technical plan.",
    activities: [
      "System architecture design",
      "Data model creation",
      "Workflow mapping",
      "Feature prioritization",
      "Technology selection (based on requirements, not preference)",
      "Timeline and budget refinement"
    ],
    deliverable: "Technical specification, wireframes, and project roadmap",
    color: "from-purple-500 to-pink-500"
  },
  {
    number: 3,
    title: "Iterative Development",
    duration: "8-20 weeks (project dependent)",
    icon: Code,
    description: "Development happens in focused sprints with regular check-ins. You'll see progress weekly, provide feedback, and guide priorities. No 'waiting months to see something'—you're involved throughout.",
    activities: [
      "Agile development in 2-week sprints",
      "Weekly progress reviews",
      "Continuous feedback integration",
      "Testing and quality assurance",
      "Security and performance optimization",
      "Documentation creation"
    ],
    deliverable: "Working system, tested and ready for launch",
    color: "from-orange-500 to-red-500"
  },
  {
    number: 4,
    title: "Launch & Training",
    duration: "1-2 weeks",
    icon: Rocket,
    description: "Launching isn't just flipping a switch. We'll train your team, migrate data, run parallel testing, and ensure everyone is confident using the new system. Smooth transitions, not disruptive cutoffs.",
    activities: [
      "User training and documentation",
      "Data migration from old systems",
      "Parallel testing period",
      "Final optimization",
      "Production deployment",
      "Launch support"
    ],
    deliverable: "Live system, trained users, complete documentation",
    color: "from-green-500 to-emerald-500"
  },
  {
    number: 5,
    title: "Ongoing Evolution",
    duration: "Ongoing",
    icon: TrendingUp,
    description: "Systems aren't 'finished'—they evolve as your business grows. I provide ongoing support, enhancement, and optimization. Whether monthly maintenance or quarterly feature development, I'm your long-term technology partner.",
    activities: [
      "Bug fixes and updates",
      "Performance monitoring",
      "Security patches",
      "Feature enhancements",
      "User feedback integration",
      "Strategic technology guidance"
    ],
    deliverable: "Continuously improving system aligned with business growth",
    color: "from-indigo-500 to-blue-500"
  }
]

const principles = [
  {
    icon: Users,
    title: "Collaborative, Not Dictatorial",
    description: "You're the expert on your business. I'm the expert on technology. We work together to find the right solution."
  },
  {
    icon: Clock,
    title: "Transparent Timeline",
    description: "You'll always know where we are, what's next, and when to expect delivery. No surprises."
  },
  {
    icon: CheckCircle2,
    title: "Quality Over Speed",
    description: "I don't rush to meet arbitrary deadlines. I build systems that work reliably and scale properly."
  },
  {
    icon: FileText,
    title: "Clear Documentation",
    description: "You'll receive complete documentation so you understand your system and can maintain it long-term."
  }
]

export default function ProcessPage() {
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
              How We{" "}
              <span className="gradient-text">Work Together</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building custom systems isn't magic—it's a structured, collaborative process. Here's how typical
              projects unfold. Every business is different, so timelines and phases adapt to your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < phases.length - 1 && (
                  <div className="absolute left-8 top-32 w-0.5 h-24 bg-gradient-to-b from-gray-300 to-transparent hidden md:block" />
                )}

                <div className="grid md:grid-cols-12 gap-8 mb-16">
                  {/* Phase Number */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                      {phase.number}
                    </div>
                  </div>

                  {/* Phase Content */}
                  <div className="md:col-span-10">
                    <Card className="border-2 hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <CardTitle className="text-3xl mb-2">{phase.title}</CardTitle>
                            <CardDescription className="text-base flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {phase.duration}
                            </CardDescription>
                          </div>
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                            <phase.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">What Happens:</h4>
                          <ul className="space-y-2">
                            {phase.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold text-gray-900">Deliverable:</p>
                          <p className="text-gray-600">{phase.deliverable}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
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
                How I Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These principles guide every project I take on
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                        <principle.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              The first step is a conversation. Let's discuss your challenges and explore whether
              custom development makes sense for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient">
                <Link href="/contact">
                  Book a Discovery Call
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
