import { Router } from 'express'
import prisma from '../db.js'

const router = Router()

router.get('/', async (_req, res) => {
  const services = await prisma.service.findMany({
    orderBy: { id: 'asc' }
  })
  res.json(services)
})

export default router
