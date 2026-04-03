import { Router } from 'express'
import prisma from '../db.js'

const router = Router()

router.get('/', async (_req, res) => {
  const bookings = await prisma.booking.findMany({
    include: { service: true },
    orderBy: { createdAt: 'desc' }
  })
  res.json(bookings)
})

router.post('/', async (req, res) => {
  const { name, email, phone, serviceId, date, time, notes } = req.body

  if (!name || !email || !phone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Please fill in all required booking fields.' })
  }

  const service = await prisma.service.findUnique({
    where: { id: Number(serviceId) }
  })

  if (!service) {
    return res.status(404).json({ error: 'Selected service was not found.' })
  }

  const existing = await prisma.booking.findFirst({
    where: {
      serviceId: Number(serviceId),
      date,
      time
    }
  })

  if (existing) {
    return res.status(409).json({ error: 'That time slot is already booked for this service.' })
  }

  const booking = await prisma.booking.create({
    data: {
      name,
      email,
      phone,
      serviceId: Number(serviceId),
      date,
      time,
      notes
    },
    include: { service: true }
  })

  res.status(201).json(booking)
})

export default router
