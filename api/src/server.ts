import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { prisma } from './lib/prisma'

const app = express()
const port = Number(process.env.PORT ?? 4000)
const frontendURL = process.env.FRONTEND_URL ?? 'http://localhost:5173'

app.use(
  cors({
    origin: [frontendURL, 'http://localhost:3000'],
    credentials: true,
  }),
)
app.use(express.json())

app.get('/health', async (_req, res) => {
  const total = await prisma.contentItem.count()

  res.json({
    service: 'web-platform-api',
    status: 'ok',
    totalContentItems: total,
  })
})

app.get('/api/content-items', async (_req, res) => {
  const items = await prisma.contentItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.json(items)
})

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
