import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogSettings } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    const settings = await BlogSettings.findOne()
    const fallback = {
      enabled: true,
      title: 'Ressources & inspirations',
      eyebrow: 'Blog',
      description: 'Conseils, retours terrain et inspirations pour performer autrement.',
      heroImage: 'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
    }
    if (!settings) return NextResponse.json(fallback)
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Blog settings error:', error)
    return NextResponse.json({
      enabled: true,
      title: 'Ressources & inspirations',
      eyebrow: 'Blog',
      description: 'Conseils, retours terrain et inspirations pour performer autrement.',
      heroImage: 'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    let settings = await BlogSettings.findOne()
    if (!settings) {
      settings = await BlogSettings.create(body)
    } else {
      const fields = ['enabled', 'title', 'description', 'eyebrow', 'heroImage', 'categories']
      for (const field of fields) {
        if (body[field] !== undefined) (settings as any)[field] = body[field]
      }
      await settings.save()
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Blog settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
