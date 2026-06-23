import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const jobs = await db.jobListing.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}