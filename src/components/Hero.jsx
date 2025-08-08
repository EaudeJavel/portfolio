import { useState, useEffect } from 'react'
import portfolioData from '../data/portfolio.json'
import './Hero.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { personal } = portfolioData

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
      </div>
      
      <div className="container">
        <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
          <div className="hero__text">
            <h2 className="hero__greeting">
              Bonjour, je suis
            </h2>
            <h1 className="hero__name">
              {personal.name}
            </h1>
            <p className="hero__title">
              {personal.title}
            </p>
            <p className="hero__subtitle">
              {personal.subtitle}
            </p>
            
            <div className="hero__actions">
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
              >
                Voir mes projets
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary"
              >
                Me contacter
              </button>
            </div>
          </div>
          
          <div className="hero__visual">
            <div className="hero__avatar">
              <div className="hero__avatar-placeholder">
                <span>{personal.name.charAt(0)}</span>
              </div>
            </div>
            
            <div className="hero__decorations">
              <div className="hero__decoration hero__decoration--1"></div>
              <div className="hero__decoration hero__decoration--2"></div>
              <div className="hero__decoration hero__decoration--3"></div>
            </div>
          </div>
        </div>
        
        <div className="hero__scroll-indicator">
          <button 
            onClick={() => scrollToSection('about')}
            className="hero__scroll-btn"
            aria-label="Scroll to about section"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero