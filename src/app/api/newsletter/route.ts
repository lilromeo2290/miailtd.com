import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await db.newsletterSubscription.create({ data: { email } })
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    if (msg.includes('Unique')) {
      return NextResponse.json({ success: true, message: 'Already subscribed' })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}