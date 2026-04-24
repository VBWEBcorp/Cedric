import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

type Cache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
  failedAt: number
}

let cached = global.mongoose as Cache | undefined

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, failedAt: 0 }
}

const FAIL_COOLDOWN_MS = 30_000

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not configured')
  }

  if (cached!.conn) return cached!.conn

  if (cached!.failedAt && Date.now() - cached!.failedAt < FAIL_COOLDOWN_MS) {
    throw new Error('MongoDB unreachable (cooldown)')
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      socketTimeoutMS: 5000,
    })
  }

  try {
    cached!.conn = await cached!.promise
    cached!.failedAt = 0
    return cached!.conn
  } catch (e) {
    cached!.promise = null
    cached!.failedAt = Date.now()
    throw e
  }
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cache
}
