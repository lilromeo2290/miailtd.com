import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, company, email, phone, serviceType, equipmentNeeded, projectLocation, projectDesc, duration, startDate, fileName } = body

    if (!fullName || !email || !phone || !serviceType || !projectLocation || !projectDesc) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const quote = await db.quoteRequest.create({
      data: {
        fullName, company: company || '', email, phone,
        serviceType, equipmentNeeded: equipmentNeeded || '',
        projectLocation, projectDesc, duration: duration || '',
        startDate: startDate || '', fileName: fileName || '',
      }
    })

    return NextResponse.json({ success: true, id: quote.id })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const quotes = await db.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}