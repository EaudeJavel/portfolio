import { useState, useEffect, useRef } from 'react'
import portfolioData from '../data/portfolio.json'
import './Skills.css'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('frontend')
  const sectionRef = useRef(null)
  const { skills } = portfolioData

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

  const categories = [
    { key: 'frontend', label: 'Front-end', icon: '🎨' },
    { key: 'backend', label: 'Back-end', icon: '⚙️' },
    { key: 'tools', label: 'Outils', icon: '🛠️' }
  ]

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <div className={`skills__content ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="section-title">Mes compétences</h2>
          
          <div className="skills__categories">
            {categories.map((category) => (
              <button
                key={category.key}
                className={`skills__category-btn ${activeCategory === category.key ? 'skills__category-btn--active' : ''}`}
                onClick={() => setActiveCategory(category.key)}
              >
                <span className="skills__category-icon">{category.icon}</span>
                <span className="skills__category-label">{category.label}</span>
              </button>
            ))}
          </div>

          <div className="skills__grid">
            {skills[activeCategory]?.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skills__item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skills__item-header">
                  <h3 className="skills__item-name">{skill.name}</h3>
                  <span className="skills__item-level">{skill.level}%</span>
                </div>
                <div className="skills__item-category">{skill.category}</div>
                
                <div className="skills__progress">
                  <div 
                    className="skills__progress-bar"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      animationDelay: `${0.5 + index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="skills__summary">
            <div className="skills__summary-card">
              <h3>💡 Philosophie de développement</h3>
              <p>
                Je privilégie une approche centrée sur l'utilisateur, en mettant l'accent sur 
                la performance, l'accessibilité et la maintenabilité du code. J'aime apprendre 
                de nouvelles technologies et rester à jour avec les meilleures pratiques.
              </p>
            </div>
            
            <div className="skills__summary-card">
              <h3>🚀 Toujours en évolution</h3>
              <p>
                Le développement web évolue rapidement, et j'aime explorer de nouveaux outils 
                et frameworks. Actuellement, je me forme sur les architectures serverless 
                et les Progressive Web Apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills