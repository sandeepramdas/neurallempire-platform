import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, company, phone, companySize, timeline, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
        companySize: companySize || null,
        timeline: timeline || null,
        message,
        isRead: false,
        isArchived: false,
      },
    })

    // TODO: Send email notification
    // You can add email sending logic here using nodemailer or similar
    // Example:
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company || 'N/A'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. I'll get back to you soon!",
        id: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    )
  }
}
