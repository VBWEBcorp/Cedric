import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GallerySettings } from '@/models/Gallery'
import { verifyAuth } from '@/lib/auth'

// GET gallery settings (public)
export async function GET() {
  try {
    await connectDB()
    const settings = await GallerySettings.findOne()

    const fallback = {
      enabled: true,
      title: 'Hop4Lead en images',
      eyebrow: 'Galerie',
      description: 'Coulisses, séminaires et moments forts de nos accompagnements.',
      heroImage: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    }
    if (!settings) return NextResponse.json(fallback)

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Gallery settings error:', error)
    return NextResponse.json({
      enabled: true,
      title: 'Hop4Lead en images',
      eyebrow: 'Galerie',
      description: 'Coulisses, séminaires et moments forts de nos accompagnements.',
      heroImage: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    })
  }
}

// UPDATE gallery settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    let settings = await GallerySettings.findOne()
    if (!settings) {
      settings = await GallerySettings.create(body)
    } else {
      const fields = ['enabled', 'title', 'description', 'eyebrow', 'heroImage']
      for (const field of fields) {
        if (body[field] !== undefined) (settings as any)[field] = body[field]
      }
      await settings.save()
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Gallery settings update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
