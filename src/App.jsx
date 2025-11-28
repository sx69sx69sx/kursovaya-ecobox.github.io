import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Success from './pages/Success';

// КОМПОНЕНТЫ
import Header from './components/Header';
import Footer from './components/Footer';

// СТРАНИЦЫ
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Box from './pages/Box';
import SubscriptionDetail from './pages/SubscriptionDetail';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Компонент, который поднимает страницу наверх при смене маршрута
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // мгновенно в начало страницы
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* basename важен для GitHub Pages */}
        <Router basename="/">
          <ScrollToTop />

          <div className="App">
            <Header />

            <Routes>
              {/* ГЛАВНАЯ */}
              <Route path="/" element={<Home />} />

              {/* ПРОДУКТЫ + КОРЗИНА */}
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/box" element={<Box />} />

              {/* ПОДПИСКА */}
              <Route path="/subscription/:plan" element={<SubscriptionDetail />} />

              {/* АУТЕНТИФИКАЦИЯ */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />

              {/* СТАТИЧЕСКИЕ */}
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/success" element={<Success />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-2">404</h1>
                    <p className="text-black/60">Страница не найдена</p>
                  </div>
                }
              />
            </Routes>

            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
