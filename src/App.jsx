import { Route, Routes } from 'react-router-dom'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'
import InicioSesionPage from './pages/InicioSesionPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import { CarritoProvider } from './context/CarritoProvider.jsx'

function App() {
  return (
    <CarritoProvider>
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
        element={<ProductosPage />}
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
        element={<CarritoPage />}
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
    </CarritoProvider>
  )
}

export default App
