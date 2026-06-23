import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, subject, message } = body

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const contact = await db.contactSubmission.create({
      data: { fullName, email, phone: phone || '', subject: subject || '', message }
    })

    return NextResponse.json({ success: true, id: contact.id })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}