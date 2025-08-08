import { useState, useEffect, useRef } from 'react'
import portfolioData from '../data/portfolio.json'
import './About.css'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const { personal, experience, education } = portfolioData

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

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <div className={`about__content ${isVisible ? 'fade-in' : ''}`}>
          <div className="about__intro">
            <h2 className="section-title">À propos de moi</h2>
            <p className="about__description">
              {personal.description}
            </p>

            <div className="about__stats">
              <div className="about__stat">
                {/* <span className="about__stat-number">{portfolioData.projects.length}</span> */}
                <span className="about__stat-number">10+</span>
                <span className="about__stat-label">Projets réalisés</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">5+</span>
                <span className="about__stat-label">Années d'expérience</span>
              </div>
            </div>
          </div>

          <div className="about__details">
            <div className="about__experience">
              <h3 className="about__section-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 21V5C16 4.47 15.53 4 15 4H9C8.47 4 8 4.47 8 5V21" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Expérience professionnelle
              </h3>

              <div className="about__timeline">
                {experience.map((exp, index) => (
                  <div key={index} className="about__timeline-item">
                    <div className="about__timeline-dot"></div>
                    <div className="about__timeline-content">
                      <div className="about__timeline-header">
                        <h4 className="about__timeline-title">{exp.title}</h4>
                        <span className="about__timeline-period">{exp.period}</span>
                      </div>
                      <p className="about__timeline-company">{exp.company}</p>
                      <p className="about__timeline-description">{exp.description}</p>
                      <div className="about__timeline-technologies">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="about__tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__education">
              <h3 className="about__section-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V10C2 10.55 2.45 11 3 11H21C21.55 11 22 10.55 22 10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 11V19C21 19.55 20.55 20 20 20H4C3.45 20 3 19.55 3 19V11" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Formation
              </h3>

              <div className="about__timeline">
                {education.map((edu, index) => (
                  <div key={index} className="about__timeline-item">
                    <div className="about__timeline-dot"></div>
                    <div className="about__timeline-content">
                      <div className="about__timeline-header">
                        <h4 className="about__timeline-title">{edu.degree}</h4>
                        <span className="about__timeline-period">{edu.period}</span>
                      </div>
                      <p className="about__timeline-company">{edu.school}</p>
                      <p className="about__timeline-description">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About