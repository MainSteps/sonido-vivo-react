import { Route, Routes } from 'react-router-dom'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'
import InicioSesionPage from './pages/InicioSesionPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'

function App() {
  return (
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
        element={
          <PlaceholderPage
            title="Catálogo"
            description="Aquí se mostrará el catálogo de productos."
          />
        }
      />

      <Route
        path="/productos/:id"
        element={
          <PlaceholderPage
            title="Detalle del producto"
            description="Aquí se mostrará la información de un producto."
          />
        }
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

      <Route path="/registro" element={<RegistroPage />} />

      <Route path="/login" element={<InicioSesionPage />} />

      <Route path="/contacto" element={<ContactoPage />} />

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
  )
}

export default App