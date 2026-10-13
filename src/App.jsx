import { Route, Routes } from 'react-router-dom'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import CatalogoPage from './pages/CatalogoPage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import ProductoDetallePage from './pages/ProductoDetallePage.jsx'

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Routes>
      <Route
        path="/"
        element={
          <PlaceholderPage
            title="Inicio"
            description="Página principal de Sonido Vivo."
          />
        }
      />

      <Route
        path="/productos"
        element={<CatalogoPage />}
      />

      <Route
        path="/productos/:id"
        element={<ProductoDetallePage />}
      />

      <Route
        path="/carrito"
        element={
          <PlaceholderPage
            title="Carrito"
            description="Aquí se administrarán los productos seleccionados."
          />
        }
      />

      <Route
        path="/registro"
        element={
          <PlaceholderPage
            title="Registro"
            description="Aquí se creará una cuenta ficticia."
          />
        }
      />

      <Route
        path="/login"
        element={
          <PlaceholderPage
            title="Inicio de sesión"
            description="Aquí se realizará el acceso simulado."
          />
        }
      />

      <Route
        path="/contacto"
        element={
          <PlaceholderPage
            title="Contacto"
            description="Aquí se encontrará el formulario de contacto."
          />
        }
      />

      <Route
        path="/nosotros"
        element={
          <PlaceholderPage
            title="Nosotros"
            description="Aquí se presentará la información de Sonido Vivo."
          />
        }
      />

      <Route
        path="/blog"
        element={
          <PlaceholderPage
            title="Blog"
            description="Aquí se mostrarán los artículos musicales."
          />
        }
      />

      <Route
        path="/blog/:id"
        element={
          <PlaceholderPage
            title="Artículo"
            description="Aquí se mostrará el detalle de un artículo."
          />
        }
      />

      <Route
        path="/admin/productos"
        element={
          <PlaceholderPage
            title="Administrar productos"
            description="Aquí se realizará el CRUD de productos."
          />
        }
      />

      <Route
        path="/admin/usuarios"
        element={
          <PlaceholderPage
            title="Administrar usuarios"
            description="Aquí se realizará el CRUD de usuarios."
          />
        }
      />

      <Route
        path="*"
        element={
          <PlaceholderPage
            title="Página no encontrada"
            description="La dirección ingresada no corresponde a una página existente."
          />
        }
      />
      </Routes>
      <SiteFooter />
    </div>
  )
}

export default App
