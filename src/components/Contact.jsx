import { useState, useEffect, useRef } from 'react'
import portfolioData from '../data/portfolio.json'
import './Contact.css'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef(null)
  const { personal } = portfolioData

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert(`Erreur : ${data.error}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <div className={`contact__content ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="section-title">Contactez-moi</h2>

          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__intro">
                <h3>Travaillons ensemble</h3>
                <p>
                  Vous avez un projet en tête ? Une question sur mon travail ?
                  N'hésitez pas à me contacter. Je serais ravi de discuter avec vous !
                </p>
              </div>

              <div className="contact__methods">
                <div className="contact__method">
                  <div className="contact__method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact__method-content">
                    <h4>Email</h4>
                    <a href={`mailto:${personal.email}`}>{personal.email}</a>
                  </div>
                </div>

                <div className="contact__method">
                  <div className="contact__method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact__method-content">
                    <h4>Téléphone</h4>
                    <a href={`tel:${personal.phone}`}>{personal.phone}</a>
                  </div>
                </div>

                <div className="contact__method">
                  <div className="contact__method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="contact__method-content">
                    <h4>Localisation</h4>
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              <div className="contact__social">
                <h4>Retrouvez-moi aussi sur</h4>
                <div className="contact__social-links">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                    aria-label="LinkedIn"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2"/>
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                    aria-label="GitHub"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="contact__form-container">
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__label">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="contact__input"
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact__input"
                    required
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message" className="contact__label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="contact__textarea"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="contact__spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="32">
                          <animate attributeName="strokeDashoffset" dur="1s" repeatCount="indefinite" values="32;0;32"/>
                        </circle>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2 3l20 9L2 21l.01-6L16 12l-13.99-3L2 3z" fill="currentColor"/>
                      </svg>
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact