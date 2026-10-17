function NosotrosPage() {
  return (
    <main>
      <header className="page-hero">
        <p className="eyebrow">Nuestra historia</p>
        <h1>La música se disfruta mejor cuando se comparte</h1>
        <p>
          Sonido Vivo es una tienda ficticia creada para aplicar HTML semántico,
          CSS adaptable, JavaScript y trabajo colaborativo con GitHub.
        </p>
      </header>

      <section
        className="page-section about-grid"
        aria-labelledby="purpose-title"
      >
        <div>
          <h2 id="purpose-title">Nuestro propósito</h2>
          <p>
            Acercar instrumentos y accesorios a estudiantes, bandas emergentes
            y personas aficionadas mediante una experiencia clara y accesible.
          </p>
          <p>
            El catálogo y sus operaciones utilizan exclusivamente datos
            simulados. No realizamos ventas ni procesamos información personal
            real.
          </p>
        </div>

        <div className="values">
          <h2>Principios del proyecto</h2>
          <ul>
            <li>Información de productos clara y consistente.</li>
            <li>Navegación comprensible en computador y celular.</li>
            <li>Interfaces accesibles mediante teclado.</li>
            <li>Trabajo colaborativo verificable en GitHub.</li>
          </ul>
        </div>
      </section>

      <section
        className="page-section surface-section"
        aria-labelledby="team-title"
      >
        <p className="eyebrow">Equipo académico</p>
        <h2 id="team-title">Áreas de trabajo</h2>

        <div className="card-grid compact">
          <article className="text-card">
            <h3>Estructura y carrito</h3>
            <p>Navegación, diseño adaptable, contenido y persistencia local.</p>
          </article>

          <article className="text-card">
            <h3>Productos</h3>
            <p>Catálogo, detalle y mantenimiento de productos simulados.</p>
          </article>

          <article className="text-card">
            <h3>Formularios</h3>
            <p>Registro, acceso, contacto y validaciones de interfaz.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default NosotrosPage