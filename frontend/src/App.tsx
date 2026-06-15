import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
  const cmsUrl = import.meta.env.VITE_CMS_URL ?? 'http://localhost:3000/admin'

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">React + Godot + Node.js + Payload CMS</p>
        <h1>Dynamic web hub for your Godot project</h1>
        <p className="hero-copy">
          This frontend is ready to embed a Godot Web export, connect to the Node.js API,
          and use Payload CMS for content management.
        </p>
        <div className="link-row">
          <a href={apiUrl} target="_blank" rel="noreferrer">
            API endpoint
          </a>
          <a href={cmsUrl} target="_blank" rel="noreferrer">
            Payload admin
          </a>
          <a href="https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html" target="_blank" rel="noreferrer">
            Godot web export guide
          </a>
        </div>
      </section>

      <section className="grid-layout">
        <article className="card">
          <h2>Godot embed area</h2>
          <p>
            After exporting your Godot project to HTML5, copy the export output into
            <code> frontend/public/godot/</code>.
          </p>
          <div className="godot-frame">
            <iframe
              title="Godot game preview"
              src="/godot/index.html"
              loading="lazy"
            />
          </div>
        </article>

        <article className="card">
          <h2>Development stack</h2>
          <ul>
            <li>Frontend: React + Vite</li>
            <li>API: Node.js + Express</li>
            <li>Database: PostgreSQL in Docker</li>
            <li>ORM: Prisma</li>
            <li>CMS: Payload CMS on Next.js</li>
          </ul>
        </article>

        <article className="card">
          <h2>Suggested flow</h2>
          <ol>
            <li>Start PostgreSQL with Docker Compose</li>
            <li>Run Prisma generate and migration</li>
            <li>Start the API server</li>
            <li>Start Payload CMS</li>
            <li>Start the React frontend</li>
          </ol>
        </article>
      </section>
    </main>
  )
}

export default App
