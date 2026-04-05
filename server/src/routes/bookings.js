import { Router } from 'express'
import prisma from '../db.js'

const router = Router()

const BLOCKED_TIMES = [
  ['12:15', '12:30'],
  ['15:30', '16:00'],
  ['18:30', '18:45'],
  ['19:30', '19:45']
]

const NORMAL_HOURS = {
  0: ['13:00', '20:00'],
  1: ['10:00', '20:30'],
  2: ['10:00', '20:30'],
  3: ['10:00', '20:30'],
  4: ['10:00', '20:30'],
  5: ['10:00', '21:00'],
  6: ['10:00', '21:00']
}

const AFTER_HOURS = ['21:30', '23:00']

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB
}

function isAfterHoursService(name) {
  return (
    name === 'After Hours Haircut Only' ||
    name === 'After Hours Haircut + Beard'
  )
}

function isValidTimeForService(service, date, time) {
  const day = new Date(`${date}T12:00:00`).getDay()
  const start = toMinutes(time)
  const end = start + service.durationMinutes

  const [openTime, closeTime] = isAfterHoursService(service.name)
    ? AFTER_HOURS
    : NORMAL_HOURS[day]

  const open = toMinutes(openTime)
  const close = toMinutes(closeTime)

  if (start < open || end > close) return false

  if (!isAfterHoursService(service.name)) {
    for (const [blockStart, blockEnd] of BLOCKED_TIMES) {
      if (overlaps(start, end, toMinutes(blockStart), toMinutes(blockEnd))) {
        return false
      }
    }
  }

  return true
}

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

  if (!isValidTimeForService(service, date, time)) {
    return res.status(400).json({ error: 'That time is outside allowed booking hours.' })
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
