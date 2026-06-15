'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

type Category = 'bio' | 'property' | 'auto' | 'custom'

type Tag = {
  label: string
  value: string
  category: Category
}

type Project = {
  id: string
  category: Category
  title: string
  description: string
  cta: string
}

const TAGS: Tag[] = [
  { label: 'Healthcare', value: 'healthcare', category: 'bio' },
  { label: 'Bio AI', value: 'bio-ai', category: 'bio' },
  { label: 'Research', value: 'research', category: 'bio' },
  { label: 'Real Estate', value: 'real-estate', category: 'property' },
  { label: 'Spatial Data', value: 'spatial-data', category: 'property' },
  { label: 'Automotive', value: 'automotive', category: 'auto' },
  { label: 'Computer Vision', value: 'computer-vision', category: 'auto' },
  { label: 'Workflow', value: 'workflow', category: 'custom' },
  { label: 'RAG', value: 'rag', category: 'custom' },
  { label: 'Private Deployment', value: 'private-deployment', category: 'custom' },
]

const PROJECTS: Project[] = [
  {
    id: 'biofold-ai',
    category: 'bio',
    title: 'BioFold AI Platform',
    description: 'Biomedical computing, private server pipelines and research workflow support.',
    cta: 'View Bio AI Demo',
  },
  {
    id: 'property-spatial-ai',
    category: 'property',
    title: 'HK Property Spatial AI',
    description: 'Floorplan intelligence, spatial data normalization and real estate visualization.',
    cta: 'Explore Floorplan Engine',
  },
  {
    id: 'autovision-ai',
    category: 'auto',
    title: 'AutoVision AI',
    description: 'Vehicle recognition, sales intelligence and after-sales workflow automation.',
    cta: 'View Auto AI Demo',
  },
  {
    id: 'custom-enterprise-ai',
    category: 'custom',
    title: 'Custom Enterprise AI',
    description: 'RAG, workflow automation, private deployment and enterprise AI integration.',
    cta: 'Book AI Strategy Call',
  },
]

const CATEGORY_TO_PROJECT: Record<Category, string> = {
  bio: 'biofold-ai',
  property: 'property-spatial-ai',
  auto: 'autovision-ai',
  custom: 'custom-enterprise-ai',
}

const CATEGORY_LABEL: Record<Category, string> = {
  bio: 'Bio AI',
  property: 'Property AI',
  auto: 'Auto AI',
  custom: 'Custom AI',
}

const HERO_PILLS = [
  'Healthcare AI',
  'Bio Computing',
  'Property Spatial',
  'Automotive AI',
  'Private AI',
  'Workflow Systems',
]

export function HomePageClient() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id)
  const projectsSectionRef = useRef<HTMLElement | null>(null)
  const projectsStripRef = useRef<HTMLDivElement | null>(null)

  const predictedCategory = useMemo<Category | null>(() => {
    if (selectedTags.length === 0) return null

    const scores: Record<Category, number> = {
      bio: 0,
      property: 0,
      auto: 0,
      custom: 0,
    }

    for (const tag of TAGS) {
      if (selectedTags.includes(tag.value)) {
        scores[tag.category] += 1
      }
    }

    const highest = Math.max(...Object.values(scores))
    const matched = (Object.keys(scores) as Category[]).filter(
      (category) => scores[category] === highest && highest > 0,
    )

    return matched.length === 1 ? matched[0] : null
  }, [selectedTags])

  const recommendedProjectId = predictedCategory ? CATEGORY_TO_PROJECT[predictedCategory] : null

  useEffect(() => {
    if (!recommendedProjectId) return

    const timeout = window.setTimeout(() => {
      setActiveProjectId(recommendedProjectId)
      projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      window.setTimeout(() => {
        const container = projectsStripRef.current
        const target = container?.querySelector<HTMLElement>(
          `[data-project-id="${recommendedProjectId}"]`,
        )

        if (!container || !target) return

        container.scrollTo({
          left: Math.max(target.offsetLeft - 24, 0),
          behavior: 'smooth',
        })
      }, 650)
    }, 720)

    return () => window.clearTimeout(timeout)
  }, [recommendedProjectId])

  const toggleTag = (value: string) => {
    setSelectedTags((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  return (
    <main className="site-shell">
      <section className="page-section hero-section" id="showcase-section">
        <div className="hero-panel">
          <p className="hero-eyebrow">VERTICAL AI SYSTEMS</p>
          <h1>Simple AI products for real industries.</h1>
          <div className="hero-pill-cloud" aria-label="Core capabilities">
            {HERO_PILLS.map((pill) => (
              <span key={pill} className="hero-pill">
                {pill}
              </span>
            ))}
          </div>
          <a className="hero-scroll-link" href="#tag-section">
            Start
          </a>
        </div>
      </section>

      <section className="page-section simple-section" id="tag-section">
        <div className="simple-panel">
          <div className="simple-header">
            <p className="site-badge">01 / Tags</p>
            <h2>Pick what you want.</h2>
          </div>

          <div className="simple-pill-grid" aria-label="Intent tags">
            {TAGS.map((tag) => {
              const selected = selectedTags.includes(tag.value)
              return (
                <button
                  key={tag.value}
                  type="button"
                  className={`site-tag-chip mono-pill ${selected ? 'site-tag-chip-active' : ''}`}
                  data-category={tag.category}
                  onClick={() => toggleTag(tag.value)}
                >
                  {tag.label}
                </button>
              )
            })}
          </div>

          <div className="status-row">
            <article className="content-card status-card">
              <span className="card-label">State</span>
              <h3>
                {selectedTags.length === 0
                  ? 'Waiting'
                  : predictedCategory
                    ? CATEGORY_LABEL[predictedCategory]
                    : 'Mixed'}
              </h3>
              <p>
                {selectedTags.length === 0
                  ? 'No action.'
                  : predictedCategory
                    ? 'Auto focus ready.'
                    : 'No strong match yet.'}
              </p>
            </article>

            <article className="content-card status-card">
              <span className="card-label">Selected</span>
              <h3>{selectedTags.length === 0 ? '0' : selectedTags.length}</h3>
              <div className="selected-tags-preview">
                {selectedTags.length === 0 ? (
                  <span className="selected-tags-empty">Empty</span>
                ) : (
                  selectedTags.map((value) => {
                    const tag = TAGS.find((item) => item.value === value)
                    return (
                      <span key={value} className="selected-tag-pill">
                        {tag?.label ?? value}
                      </span>
                    )
                  })
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section simple-section" id="analysis-section">
        <div className="simple-panel">
          <div className="simple-header">
            <p className="site-badge">02 / Experience</p>
            <h2>Interactive layer.</h2>
          </div>

          <div className="experience-embed-stage">
            <div className="experience-embed-shell mono-frame">
              <iframe
                className="experience-embed-frame"
                src="/interactive-experience/index.html"
                title="Interactive experience"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsSectionRef} className="page-section simple-section" id="projects-section">
        <div className="simple-panel">
          <div className="simple-header">
            <p className="site-badge">03 / Projects</p>
            <h2>Projects.</h2>
          </div>

          <div ref={projectsStripRef} className="projects-strip mono-projects">
            {PROJECTS.map((project) => {
              const isRecommended = recommendedProjectId === project.id
              const isActive = activeProjectId === project.id

              return (
                <article
                  key={project.id}
                  data-project-id={project.id}
                  className={`content-card project-card mono-project-card ${isRecommended ? 'project-card-active' : ''} ${isActive ? 'project-card-selected' : ''}`}
                  onClick={() => setActiveProjectId(project.id)}
                >
                  <span className="card-label">
                    {isRecommended ? 'Recommended' : isActive ? 'Open' : 'Project'}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <strong className="project-card-cta">{project.cta}</strong>
                </article>
              )
            })}
          </div>

          <div className="section-actions">
            <Link href="#showcase-section">Top</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
