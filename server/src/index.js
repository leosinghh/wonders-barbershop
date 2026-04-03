import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import servicesRouter from './routes/services.js'
import bookingsRouter from './routes/bookings.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Wonders Barbershop API is running.' })
})

app.use('/api/services', servicesRouter)
app.use('/api/bookings', bookingsRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
