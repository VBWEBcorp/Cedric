import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

const now = new Date().toISOString()
const fallbackPosts = [
  {
    _id: 'demo-1',
    slug: 'performance-ecologique',
    title: "Performance écologique : performer sans se cramer",
    excerpt:
      "Pourquoi nous défendons une performance qui respecte l'individu, s'inscrit dans la durée et reste au service de l'épanouissement.",
    coverImage: 'https://i.ibb.co/Df7gLTcQ/coaching-equipe-france-opt-r71sd9a2ant6vka7gcad8l9m0jgws2lrm4oxwfqupk.webp',
    category: 'Coaching exécutif',
    author: 'Cédric Vanhoutte',
    published: true,
    publishedAt: now,
    createdAt: now,
  },
  {
    _id: 'demo-2',
    slug: 'mindset-de-champion',
    title: 'Construire un mindset de champion',
    excerpt:
      "Les routines mentales qui font la différence dans les moments décisifs. Retour d'expérience avec les athlètes de haut niveau.",
    coverImage: 'https://i.ibb.co/wFfY20Qc/hop-routine-opt-r35tzvjxtodgi4uybqou01th2z7ldk3dnn8vv9q7eg.webp',
    category: 'Préparation mentale',
    author: 'Franck Larrey',
    published: true,
    publishedAt: now,
    createdAt: now,
  },
  {
    _id: 'demo-3',
    slug: 'biohacking-pour-competiteurs',
    title: 'Biohacking : concentration, flow et récupération',
    excerpt:
      "Neurosciences et méthodes concrètes pour optimiser son énergie sous adrénaline. Ce qui marche vraiment pour les compétiteurs.",
    coverImage: 'https://i.ibb.co/nN80hwPf/Les3experts-1.png',
    category: 'Biohacking',
    author: 'Fabrice Bigot',
    published: true,
    publishedAt: now,
    createdAt: now,
  },
]

// GET all posts (public: published only, admin: all)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { authenticated } = await verifyAuth(request)
    const filter = authenticated ? {} : { published: true }

    const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 })
    if (!posts || posts.length === 0) return NextResponse.json(fallbackPosts)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Blog posts error:', error)
    return NextResponse.json(fallbackPosts)
  }
}

// POST create post (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Generate slug from title
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Check slug uniqueness
    const existing = await BlogPost.findOne({ slug: body.slug })
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`
    }

    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }

    const post = await BlogPost.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
