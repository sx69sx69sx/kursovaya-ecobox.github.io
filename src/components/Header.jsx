import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBoxOpen,
  FaLeaf,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaQuestionCircle,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { user, logout } = useAuth();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-white/10">
      
      {/* DESKTOP */}
      <div className="hidden md:flex max-w-7xl mx-auto px-12 py-7 items-center">

        {/* LOGO (left, fixed width) */}
        <div className="flex items-center flex-none">
          <Link to="/" className="group flex items-center gap-4 select-none">
            <FaLeaf className="text-3xl group-hover:opacity-60 transition" />
            <span className="text-3xl font-bold tracking-tight group-hover:opacity-60 transition">
              ЭкоБокс
            </span>
          </Link>
        </div>

        {/* NAV (center, takes available space but constrained) */}
        <nav className="flex-1 flex justify-center">
          <div
            className="flex items-center gap-12 text-sm uppercase tracking-wider whitespace-nowrap
                       max-w-[700px] w-full px-4 justify-center"
          >
            {[
              { to: "/", label: "Главная" },
              { to: "/products", label: "Товары" },
              { to: "/subscription/popular", label: "Подписка" },
              { to: "/about", label: "О нас" },
              { to: "/delivery", label: "Доставка" },
              { to: "/contacts", label: "Контакты" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative group"
              >
                <span className="group-hover:opacity-60 transition">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all"></span>
              </Link>
            ))}
          </div>
        </nav>

        {/* ACTIONS (right, fixed width) */}
        <div className="flex items-center gap-16 flex-none">
          {/* CART */}
          <Link to="/box" className="relative group ml-4">
            <FaBoxOpen className="text-2xl group-hover:opacity-60 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-white text-black text-xs w-6 h-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-8">
              <Link to="/profile" className="flex items-center gap-3 group">
                <FaUser className="text-xl group-hover:opacity-60 transition" />
                <span className="hidden lg:inline group-hover:opacity-60 transition">
                  {user.name.toUpperCase()}
                </span>
              </Link>
              <button onClick={logout} className="group">
                <FaSignOutAlt className="text-xl group-hover:opacity-60 transition" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-12">
              <Link to="/login" className="group flex items-center gap-3">
                <FaSignInAlt className="text-xl group-hover:opacity-60 transition" />
                <span className="hidden lg:inline group-hover:opacity-60 transition">Вход</span>
              </Link>

              <Link
                to="/register"
                className="px-10 py-3 border border-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE (без изменений) */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 select-none">
            <FaLeaf className="text-3xl" />
            <span className="text-xl font-bold">ЭкоБокс</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/box" className="relative">
              <FaBoxOpen className="text-3xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black text-sm w-7 h-7 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav className="bg-black border-t border-white/10">
            <div className="px-6 py-8 space-y-7 text-lg tracking-wide">
              {[
                { to: "/", label: "Главная" },
                { to: "/products", label: "Товары" },
                { to: "/subscription/popular", label: "Подписка" },
                { to: "/about", label: "О нас" },
                { to: "/delivery", label: "Доставка" },
                { to: "/contacts", label: "Контакты" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block opacity-80 hover:opacity-100 transition"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-8 border-t border-white/10 space-y-6">
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-3 opacity-80 hover:opacity-100" onClick={() => setIsMenuOpen(false)}>
                      <FaUser className="text-xl" />
                      <span>{user.name.toUpperCase()}</span>
                    </Link>

                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-3 opacity-70 hover:opacity-100"
                    >
                      <FaSignOutAlt className="text-xl" />
                      <span>Выход</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-3 opacity-80 hover:opacity-100" onClick={() => setIsMenuOpen(false)}>
                      <FaSignInAlt className="text-xl" />
                      <span>Вход</span>
                    </Link>

                    <Link
                      to="/register"
                      className="block border border-white py-4 text-center font-bold uppercase tracking-widest hover:bg-white hover:text-black transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-5 text-sm opacity-60">
                <Link to="/faq" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <FaQuestionCircle />
                  <span>FAQ</span>
                </Link>
                <Link to="/returns" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <FaUndo />
                  <span>Возвраты</span>
                </Link>
                <Link to="/privacy" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <FaShieldAlt />
                  <span>Конфиденциальность</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
