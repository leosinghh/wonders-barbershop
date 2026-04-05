import { useEffect, useState } from 'react'
import BookingForm from './components/BookingForm'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export default function App() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setServices([]))
  }, [])

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">Wonders Barbershop</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#booking">Booking</a>
          <a href="#hours">Hours</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Premium Grooming Experience</p>
          <h1>Sharp cuts. Clean fades. Easy booking.</h1>
          <p className="hero-text">
            Wonders Barbershop delivers a polished, modern barbershop experience with
            premium service, strong presentation, and smooth online scheduling.
          </p>
          <a href="#booking" className="primary-btn">Book an appointment</a>
        </div>
        <div className="hero-card">
          <div className="stat">
            <span className="stat-number">5★</span>
            <span className="stat-label">Client experience focus</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Online booking requests</span>
          </div>
          <div className="stat">
            <span className="stat-number">Premium</span>
            <span className="stat-label">Brand image and service</span>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Built for clean presentation</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-meta">
                <span>{service.durationMinutes} min</span>
                <strong>GH₵ {service.price}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" className="section booking-section">
        <div className="section-heading">
          <p className="eyebrow">Booking</p>
          <h2>Reserve your appointment</h2>
        </div>
        <BookingForm services={services} apiBase={API_BASE} />
      </section>

      <section id="hours" className="section info-grid">
        <div className="info-card">
          <p className="eyebrow">Hours</p>
          <h3>Opening times</h3>
          <ul>
            <li>Mon - Thu: 9:00 AM - 7:00 PM</li>
            <li>Fri - Sat: 9:00 AM - 8:00 PM</li>
            <li>Sun: 12:00 PM - 6:00 PM</li>
          </ul>
        </div>
        <div className="info-card" id="contact">
          <p className="eyebrow">Contact</p>
          <h3>Wonders Barbershop</h3>
          <p>East Legon, Accra</p>
          <p>+233 20 000 0000</p>
          <p>bookings@wondersbarbershop.com</p>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Wonders Barbershop</span>
        <span>Crafted for a premium barbershop brand</span>
      </footer>
    </div>
  )
}
