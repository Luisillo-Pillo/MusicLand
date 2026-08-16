import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// React.lazy: en vez de importar cada página al inicio (lo que las mete a TODAS
// en el mismo bundle inicial), cada import() se resuelve solo cuando esa ruta
// se visita por primera vez. Vite genera un chunk .js aparte por cada una, así
// que el usuario descarga Home al entrar al sitio y, por ejemplo, AdminProducts
// solo si de verdad navega a /admin/productos (algo que la gran mayoría de
// visitantes nunca hace). Resultado: bundle inicial más chico y carga inicial
// más rápida, a cambio de una pequeña espera (cubierta por el Suspense de abajo)
// la primera vez que se visita cada ruta nueva.
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const Categories = lazy(() => import('./pages/Categories'));
const Brands = lazy(() => import('./pages/Brands'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ShippingReturns = lazy(() => import('./pages/ShippingReturns'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Sección de administración: agrupada aparte a propósito. Un cliente normal
// jamás visita estas rutas, así que todo su código (tablas, formularios CRUD,
// etc.) no debe pesar en la carga de nadie que no sea admin.
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminOrderDetail = lazy(() => import('./pages/AdminOrderDetail'));
const AdminReturns = lazy(() => import('./pages/AdminReturns'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminUserProfile = lazy(() => import('./pages/AdminUserProfile'));
const AdminUserOrders = lazy(() => import('./pages/AdminUserOrders'));
const AdminMessages = lazy(() => import('./pages/AdminMessages'));

// Fallback que se muestra mientras el chunk de la ruta destino todavía se está
// descargando. Reutiliza el mismo spinner que ya usan las páginas para sus
// estados de carga (.spinner-wrapper / .spinner en index.css), así que no se
// siente como un elemento nuevo o fuera de lugar.
function RouteLoadingFallback() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      {/* Suspense envuelve todas las rutas: basta un único punto de espera para
          cualquier página que todavía no se haya descargado, sin repetirlo por
          cada <Route>. */}
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/marcas" element={<Brands />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          <Route path="/envios-y-devoluciones" element={<ShippingReturns />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedido-confirmado"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/historial-compras"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pedidos/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/devoluciones"
            element={
              <ProtectedRoute adminOnly>
                <AdminReturns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios/:id/compras"
            element={
              <ProtectedRoute adminOnly>
                <AdminUserOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mensajes"
            element={
              <ProtectedRoute adminOnly>
                <AdminMessages />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
