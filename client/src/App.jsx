const BOOKING_URL =
  'https://www.fresha.com/a/wonders-barbers-studio-accra-nmatie-abonase-st-nmati-abonase-street-tj2y19yq'

const portfolioImages = [
  '/cut-1.PNG',
  '/cut-2.PNG',
  '/cut-3.PNG',
  '/cut-4.PNG',
  '/cut-5.PNG',
  '/cut-6.PNG',
  '/cut-7.PNG',
  '/cut-8.PNG',
]

const services = [
  {
    id: 1,
    name: 'Haircut',
    description: 'Clean haircut with premium finishing.',
    durationMinutes: 45,
    price: 170
  },
  {
    id: 2,
    name: 'Haircut + Beard',
    description: 'Precision haircut and beard shaping.',
    durationMinutes: 60,
    price: 200
  },
  {
    id: 3,
    name: 'After Hours VIP',
    description: 'Exclusive after-hours grooming experience.',
    durationMinutes: 60,
    price: 400
  },
  {
    id: 5,
    name: 'Taper Fade Only',
    description: 'Exclusive taper with premium finishing.',
    durationMinutes: 30,
    price: 150
  },
  {
    id: 6,
    name: 'Home Service',
    description: 'Exclusive home-service experience.',
    durationMinutes: 45,
    price: 700
  },
  {
    id: 7,
    name: 'Hair Lineup Only',
    description: 'Premium Hair Lineup.',
    durationMinutes: 15,
    price: 100
  },
  {
    id: 8,
    name: 'Hairline and Beard Shapeup',
    description: 'Precision hair and beard lineup.',
    durationMinutes: 25,
    price: 150
  },
  {
    id: 9,
    name: 'Kids Haircut',
    description: 'Clean kids haircut with premium finishing.',
    durationMinutes: 35,
    price: 150
  },
  {
    id: 10,
    name: 'Beard Trim/Lineup',
    description: 'Precision Beard Trim and Shaping.',
    durationMinutes: 15,
    price: 100
  }
]

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="brand">Wonders Barbershop</div>

        <nav>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
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
            Wonders Barbershop delivers a polished, modern
            barbershop experience with premium service,
            strong presentation, and smooth online booking.
          </p>

          <a
            href={BOOKING_URL}
            className="primary-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Appointment
          </a>
        </div>

        <div className="hero-card">
          <div className="stat">
            <span className="stat-number">5★</span>
            <span className="stat-label">
              Client experience focus
            </span>
          </div>

          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">
              Online booking access
            </span>
          </div>

          <div className="stat">
            <span className="stat-number">Premium</span>
            <span className="stat-label">
              Brand image and service
            </span>
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
            <div
              className="service-card"
              key={service.id}
            >
              <h3>{service.name}</h3>

              <p>{service.description}</p>

              <div className="service-meta">
                <span>
                  {service.durationMinutes} min
                </span>

                <strong>
                  GH₵ {service.price}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="section">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Recent Work</h2>
        </div>

        <div className="portfolio-grid">
          {portfolioImages.map((image, index) => (
            <div className="portfolio-card" key={index}>
              <img
                src={image}
                alt={`Style ${index + 1}`}
                className="portfolio-image"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="booking"
        className="section booking-section"
      >
        <div className="section-heading">
          <p className="eyebrow">Booking</p>

          <h2>Reserve your appointment</h2>
        </div>

        <a
          href={BOOKING_URL}
          className="primary-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Now on Fresha
        </a>
      </section>

      <section id="hours" className="section info-grid">
        <div className="info-card">
          <p className="eyebrow">Hours</p>

          <h3>Opening times</h3>

          <ul>
            <li>Mon - Thu: 10:00 AM - 8:30 PM</li>
            <li>Fri - Sat: 10:00 AM - 9:00 PM</li>
            <li>Sun: 1:00 PM - 8:00 PM</li>
          </ul>
        </div>

        <div className="info-card" id="contact">
          <p className="eyebrow">Contact</p>

          <h3>Wonders Barbershop</h3>

          <p>Tse Addo, Cocoa St, Accra</p>
          <p>+233 059 578 4420</p>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Wonders Barbershop</span>

        <span>
          Crafted for a premium barbershop brand
        </span>
      </footer>
    </div>
  )
}
