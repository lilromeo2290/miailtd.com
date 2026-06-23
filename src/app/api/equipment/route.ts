import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category && category !== 'All' ? { category, isActive: true } : { isActive: true }

    const equipment = await db.equipment.findMany({
      where,
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(equipment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 })
  }
}