import { useState } from 'react'

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
          Time
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
      </div>

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
