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

  const mainNav = [
    { to: "/", label: "Главная" },
    { to: "/products", label: "Товары" },
    { to: "/subscription/popular", label: "Подписка" },
    { to: "/about", label: "О нас" },
    { to: "/delivery", label: "Доставка" },
    { to: "/contacts", label: "Контакты" },
  ];

  const secondaryNav = [
    { to: "/faq", label: "FAQ", icon: FaQuestionCircle },
    { to: "/returns", label: "Возвраты", icon: FaUndo },
    { to: "/privacy", label: "Политика", icon: FaShieldAlt },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-white/20">

      {/* TOP STRIP */}
      <div className="hidden md:block border-b border-white/10 bg-white/15">
        <div className="max-w-7xl mx-auto px-10 h-9 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <span className="text-white/50">
            Ежемесячные экобоксы • Доставка по России
          </span>

          <nav className="flex items-center gap-6 text-white/60">
            {secondaryNav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Icon className="text-[10px]" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* MAIN DESKTOP */}
      <div className="hidden md:block bg-black">
        <div className="max-w-7xl mx-auto px-10 h-16 flex items-center">

          {/* LOGO */}
          <div className="flex items-center border-r border-white/20 pr-8 mr-8">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaLeaf className="text-2xl text-white" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em]">
                ЭКОБОКС
              </span>
            </Link>
          </div>

          {/* CENTER NAV */}
          <nav className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.18em]">
              {mainNav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="relative pb-1 hover:opacity-70 transition"
                >
                  {label}
                  <span className="absolute left-0 -bottom-[1px] h-[1px] w-0 bg-white group-hover:w-full transition-all" />
                </Link>
              ))}
            </div>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-8 pl-8 border-l border-white/20">

            {/* CART */}
            <Link
              to="/box"
              className="relative hover:opacity-70 transition-opacity"
            >
              <FaBoxOpen className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[20px] h-[20px] border border-white bg-black text-[11px] flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.18em]">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:opacity-70 transition"
                >
                  <FaUser className="text-sm" />
                  <span className="hidden lg:inline">
                    {user.name?.toUpperCase()}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:opacity-70 transition"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span className="hidden lg:inline">Выход</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] hover:opacity-70"
                >
                  <FaSignInAlt className="text-sm" />
                  <span className="hidden lg:inline">Вход</span>
                </Link>

                <Link
                  to="/register"
                  className="text-[11px] uppercase tracking-[0.18em] border border-white px-5 py-2 hover:bg-white hover:text-black transition"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BAR */}
      <div className="md:hidden border-b border-white/10 bg-black text-white">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <FaLeaf className="text-2xl" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              ЭКОБОКС
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/box" className="relative">
              <FaBoxOpen className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] border border-white bg-black text-[10px] flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setIsMenuOpen((v) => !v)}>
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav className="border-t border-white/10 bg-black text-white">
            <div className="px-4 py-6 space-y-6 text-sm">

              {/* MAIN NAV LINKS */}
              <div className="space-y-4">
                {mainNav.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block uppercase tracking-[0.16em] border-b border-white/10 pb-2"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* AUTH */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 uppercase tracking-[0.16em]"
                    >
                      <FaUser />
                      <span>{user.name?.toUpperCase()}</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 uppercase tracking-[0.16em]"
                    >
                      <FaSignOutAlt />
                      <span>Выход</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 uppercase tracking-[0.16em]"
                    >
                      <FaSignInAlt />
                      <span>Вход</span>
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block border border-white py-3 text-center font-bold tracking-[0.18em] uppercase hover:bg-white hover:text-black transition"
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>

              {/* BOTTOM LINKS */}
              <div className="pt-4 border-t border-white/10 space-y-4 text-xs text-white/70">
                {secondaryNav.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 uppercase tracking-[0.16em]"
                  >
                    <Icon className="text-xs" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
