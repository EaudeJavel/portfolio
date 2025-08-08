import { useEffect } from 'react'
import './ProjectModal.css'

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal__header">
          <div className="modal__title-section">
            <h2 className="modal__title">{project.title}</h2>
            <span className="modal__year">{project.year}</span>
          </div>
          <button 
            className="modal__close"
            onClick={onClose}
            aria-label="Fermer la modale"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal__content">
          <div className="modal__image">
            <div className="modal__image-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="modal__info">
            <div className="modal__description">
              <h3>Description</h3>
              <p>{project.longDescription}</p>
            </div>

            <div className="modal__technologies">
              <h3>Technologies utilisées</h3>
              <div className="modal__tech-grid">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="modal__tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal__features">
              <h3>Fonctionnalités principales</h3>
              <ul className="modal__features-list">
                {project.features.map((feature, index) => (
                  <li key={index} className="modal__feature-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal__status">
              <div className="modal__status-item">
                <strong>Statut:</strong>
                <span className={`modal__status-badge modal__status-badge--${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>
            </div>

            <div className="modal__actions">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  Voir le code
                </a>
              )}
              
              {project.demo && (
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2"/>
                    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Voir la demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal