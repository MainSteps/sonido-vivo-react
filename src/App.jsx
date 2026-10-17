import { Route, Routes } from 'react-router-dom'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import { CarritoProvider } from './context/CarritoProvider.jsx'
import AdminProductosPage from './pages/AdminProductosPage.jsx'
import BlogDetallePage from './pages/BlogDetallePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import CatalogoPage from './pages/CatalogoPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import InicioPage from './pages/InicioPage.jsx'
import InicioSesionPage from './pages/InicioSesionPage.jsx'
import NosotrosPage from './pages/NosotrosPage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import ProductoDetallePage from './pages/ProductoDetallePage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'

function App() {
  return (
    <CarritoProvider>
      <div className="app-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<InicioPage />} />

          <Route path="/productos" element={<CatalogoPage />} />
          <Route path="/productos/:id" element={<ProductoDetallePage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/login" element={<InicioSesionPage />} />
          <Route path="/contacto" element={<ContactoPage />} />

          <Route path="/nosotros" element={<NosotrosPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetallePage />} />

          <Route path="/admin/productos" element={<AdminProductosPage />} />

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
    </CarritoProvider>
  )
}

export default App
