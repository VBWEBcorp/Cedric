import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GalleryImage } from '@/models/Gallery'
import { verifyAuth } from '@/lib/auth'

const fallbackImages = [
  {
    _id: 'demo-1',
    title: 'Équipe de France en préparation',
    description: "Séance de préparation mentale avec l'équipe de France d'endurance équestre.",
    imageUrl: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    category: 'Haut niveau',
  },
  {
    _id: 'demo-2',
    title: 'Routine de performance',
    description: 'Mise en place de routines mentales et physiques avant les échéances.',
    imageUrl: 'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
    category: 'Coaching',
  },
  {
    _id: 'demo-3',
    title: 'Les trois experts Hop4Lead',
    description: 'Cédric, Franck et Fabrice, réunis autour d\'une même vision de la performance.',
    imageUrl: 'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
    category: 'Équipe',
  },
]

// GET all gallery images (public - only active)
export async function GET() {
  try {
    await connectDB()
    const images = await GalleryImage.find({ active: true }).sort({ order: 1 })
    if (!images || images.length === 0) return NextResponse.json(fallbackImages)
    return NextResponse.json(images)
  } catch (error) {
    console.error('Gallery images error:', error)
    return NextResponse.json(fallbackImages)
  }
}

// POST create gallery image (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { title, description, imageUrl, category, order } = await request.json()

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      )
    }

    const image = await GalleryImage.create({
      title,
      description,
      imageUrl,
      category: category || 'general',
      order: order || 0,
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Gallery image creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
