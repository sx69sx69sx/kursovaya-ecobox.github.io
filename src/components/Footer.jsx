import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="relative bg-[#000000] text-white overflow-hidden
                 border-t border-white/10"
    >
      {/* subtle gradient on top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20
                      animate-[fadeIn_0.8s_ease-out]">
        
        <div className="grid md:grid-cols-4 gap-20">
          
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl tracking-wide font-light">ЭКОБОКС</h3>
            <p className="text-white/50 leading-relaxed max-w-xs">
              Экологичные товары каждый месяц — заботимся о Вас и экологии.
            </p>
          </div>

          {/* Columns */}
          <FooterColumn
            title="Меню"
            links={[
              ["Главная", "/"],
              ["Товары", "/products"],
              ["Подписка", "/subscription/popular"],
            ]}
          />

          <FooterColumn
            title="Компания"
            links={[
              ["О нас", "/about"],
              ["Доставка", "/delivery"],
              ["Контакты", "/contacts"],
            ]}
          />

          <FooterColumn
            title="Поддержка"
            links={[
              ["FAQ", "/faq"],
              ["Возвраты", "/returns"],
              ["Конфиденциальность", "/privacy"],
            ]}
          />

        </div>

        {/* bottom line divider */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-white/40 tracking-wide text-sm">
            © 2025 "ЭКОБОКС". Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div className="space-y-5">
    <h4 className="font-light tracking-wide text-white/80 text-sm">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map(([label, href]) => (
        <li key={href}>
          <Link
            to={href}
            className="text-white/50 hover:text-white transition-all duration-300ФМ
                       block hover:translate-x-[2px]"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
