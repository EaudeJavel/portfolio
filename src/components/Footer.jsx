import portfolioData from '../data/portfolio.json'
import './Footer.css'

const Footer = () => {
  const { personal } = portfolioData
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <h3 className="footer__name">{personal.name}</h3>
              <p className="footer__tagline">{personal.title}</p>
              <p className="footer__description">
                Créateur d'expériences digitales modernes et performantes.
              </p>
            </div>

            <div className="footer__links">
              <div className="footer__section">
                <h4 className="footer__section-title">Navigation</h4>
                <ul className="footer__nav-list">
                  <li>
                    <button 
                      onClick={() => scrollToSection('about')}
                      className="footer__link"
                    >
                      À propos
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('skills')}
                      className="footer__link"
                    >
                      Compétences
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('projects')}
                      className="footer__link"
                    >
                      Projets
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="footer__link"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div className="footer__section">
                <h4 className="footer__section-title">Contact</h4>
                <ul className="footer__contact-list">
                  <li>
                    <a href={`mailto:${personal.email}`} className="footer__link">
                      {personal.email}
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${personal.phone}`} className="footer__link">
                      {personal.phone}
                    </a>
                  </li>
                  <li>
                    <span className="footer__text">{personal.location}</span>
                  </li>
                </ul>
              </div>

              <div className="footer__section">
                <h4 className="footer__section-title">Suivez-moi</h4>
                <div className="footer__social">
                  <a 
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label="LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2"/>
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </a>
                  
                  <a 
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label="GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>&copy; {currentYear} {personal.name}. Tous droits réservés.</p>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="footer__scroll-top"
              aria-label="Retour en haut"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 14L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer