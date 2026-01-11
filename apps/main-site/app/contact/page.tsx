"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Calendar } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  companySize: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSuccess(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError("Something went wrong. Please try again or email me directly.")
      console.error("Contact form error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Let's Discuss Your{" "}
              <span className="gradient-text">Business Needs</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Not sure if custom development is right for you? Let's talk. I offer free discovery
              consultations to understand your challenges and explore potential solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">Send Me a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">Message sent successfully!</p>
                        <p className="text-sm text-green-700">I'll respond within 24 hours. Check your inbox!</p>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-900">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className="mt-2"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@company.com"
                        className="mt-2"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Company & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          {...register("company")}
                          placeholder="Company Name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          placeholder="+1 (555) 000-0000"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Company Size & Timeline */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companySize">Company Size</Label>
                        <select
                          id="companySize"
                          {...register("companySize")}
                          className="mt-2 flex h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201+">201+ employees</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <select
                          id="timeline"
                          {...register("timeline")}
                          className="mt-2 flex h-11 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
                        >
                          <option value="">Select timeline</option>
                          <option value="Immediate">Immediate (1-3 months)</option>
                          <option value="Planning">Planning (3-6 months)</option>
                          <option value="Future">Future (6+ months)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell me about your business challenges and what you're looking to build..."
                        className="mt-2 min-h-[150px]"
                      />
                      {errors.message && (
                        <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium group-hover:text-blue-600">Email</p>
                      <p className="text-sm text-gray-600">hello@example.com</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium group-hover:text-blue-600">LinkedIn</p>
                      <p className="text-sm text-gray-600">Connect with me</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <Card>
                <CardHeader>
                  <CardTitle>What Happens Next</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">I'll review your message</p>
                      <p className="text-sm text-gray-600">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">We'll schedule a call</p>
                      <p className="text-sm text-gray-600">30-minute discovery session</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Explore solutions</p>
                      <p className="text-sm text-gray-600">Discuss your needs and options</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Get clarity</p>
                      <p className="text-sm text-gray-600">Understand if custom development fits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">Response time?</p>
                    <p className="text-sm text-gray-600">Within 24 hours, usually same day</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Discovery call cost?</p>
                    <p className="text-sm text-gray-600">Completely free, no obligations</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Typical project cost?</p>
                    <p className="text-sm text-gray-600">We'll discuss during our call based on your needs</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
