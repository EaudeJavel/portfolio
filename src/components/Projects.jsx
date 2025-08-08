import { useState, useEffect, useRef } from 'react'
import portfolioData from '../data/portfolio.json'
import ProjectModal from './ProjectModal'
import './Projects.css'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)
  const { projects } = portfolioData

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

  const openProject = (project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <section id="projects" className="projects section" ref={sectionRef}>
        <div className="container">
          <div className={`projects__content ${isVisible ? 'fade-in' : ''}`}>
            <h2 className="section-title">Mes projets</h2>
            
            <div className="projects__grid">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="projects__card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="projects__card-image">
                    <div className="projects__card-placeholder">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="projects__card-overlay">
                      <button 
                        className="btn btn-primary"
                        onClick={() => openProject(project)}
                      >
                        Voir le projet
                      </button>
                    </div>
                  </div>
                  
                  <div className="projects__card-content">
                    <div className="projects__card-header">
                      <h3 className="projects__card-title">{project.title}</h3>
                      <span className="projects__card-year">{project.year}</span>
                    </div>
                    
                    <p className="projects__card-description">
                      {project.description}
                    </p>
                    
                    <div className="projects__card-technologies">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="projects__tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="projects__tech-more">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="projects__card-actions">
                      <button 
                        className="projects__action-btn"
                        onClick={() => openProject(project)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Détails
                      </button>
                      
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__action-btn"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      
                      {project.demo && (
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__action-btn projects__action-btn--primary"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2"/>
                            <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="projects__cta">
              <p className="projects__cta-text">
                Vous avez un projet en tête ? Parlons-en !
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeProject}
        />
      )}
    </>
  )
}

export default Projects