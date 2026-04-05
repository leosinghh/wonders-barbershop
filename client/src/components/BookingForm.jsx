import { useEffect, useMemo, useState } from 'react'

const BLOCKED_TIMES = [
  ['12:15', '12:30'],
  ['15:30', '16:00'],
  ['18:30', '18:45'],
  ['19:30', '19:45']
]

const NORMAL_HOURS = {
  0: ['13:00', '20:00'], // Sunday
  1: ['10:00', '20:30'], // Monday
  2: ['10:00', '20:30'], // Tuesday
  3: ['10:00', '20:30'], // Wednesday
  4: ['10:00', '20:30'], // Thursday
  5: ['10:00', '21:00'], // Friday
  6: ['10:00', '21:00']  // Saturday
}

const AFTER_HOURS = ['21:30', '23:00']

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function toTimeString(totalMinutes) {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function formatDisplayTime(time24) {
  const [hourStr, minute] = time24.split(':')
  let hour = Number(hourStr)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  return `${hour}:${minute} ${suffix}`
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB
}

function getHoursForService(serviceName) {
  if (
    serviceName === 'After Hours Haircut Only' ||
    serviceName === 'After Hours Haircut + Beard'
  ) {
    return AFTER_HOURS
  }

  return null
}

function generateSlots(date, selectedService) {
  if (!date || !selectedService) return []

  const chosenDate = new Date(`${date}T12:00:00`)
  const day = chosenDate.getDay()

  const serviceName = selectedService.name
  const duration = selectedService.durationMinutes

  const specialHours = getHoursForService(serviceName)
  const [startTime, endTime] = specialHours || NORMAL_HOURS[day]

  const startMinutes = toMinutes(startTime)
  const endMinutes = toMinutes(endTime)

  const blockedRanges = specialHours
    ? []
    : BLOCKED_TIMES.map(([start, end]) => [toMinutes(start), toMinutes(end)])

  const slots = []

  for (let current = startMinutes; current + duration <= endMinutes; current += 15) {
    const slotEnd = current + duration

    const hitsBlockedTime = blockedRanges.some(([blockStart, blockEnd]) =>
      overlaps(current, slotEnd, blockStart, blockEnd)
    )

    if (!hitsBlockedTime) {
      slots.push(toTimeString(current))
    }
  }

  return slots
}

export default function BookingForm({ services, apiBase }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  })

  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const selectedService = useMemo(
    () => services.find((service) => service.id === Number(formData.serviceId)),
    [services, formData.serviceId]
  )

  const availableSlots = useMemo(
    () => generateSlots(formData.date, selectedService),
    [formData.date, selectedService]
  )

  useEffect(() => {
    setFormData((prev) => ({ ...prev, time: '' }))
  }, [formData.date, formData.serviceId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${apiBase}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceId: Number(formData.serviceId)
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit booking.')
      }

      setStatus({ type: 'success', message: 'Booking request submitted successfully.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceId: '',
        date: '',
        time: '',
        notes: ''
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone
          <input name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Service
          <select name="serviceId" value={formData.serviceId} onChange={handleChange} required>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} — GH₵ {service.price}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>

        <label>
          Time Slot
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            disabled={!formData.date || !formData.serviceId}
          >
            <option value="">
              {!formData.date || !formData.serviceId
                ? 'Select date and service first'
                : 'Select a time slot'}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                {formatDisplayTime(slot)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedService ? (
        <p style={{ color: '#b8b8c2', marginTop: '-4px', marginBottom: '16px' }}>
          Duration: {selectedService.durationMinutes} mins
        </p>
      ) : null}

      <label>
        Notes
        <textarea
          name="notes"
          rows="5"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Haircut style, beard work, special request..."
        />
      </label>

      <button className="primary-btn" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Booking'}
      </button>

      {status.message ? (
        <p className={`status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  )
}
