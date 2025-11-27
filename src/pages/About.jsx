import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaTruck, FaAward, FaGlobe } from "react-icons/fa";

// ❗ ВСТАВЬ СВОИ КАРТИНКИ
// Если картинки в public/images — оставь "/images/название"
const HERO_IMAGE = "/images/shop2.jpg";
const STORY_IMAGE = "/images/shop.jpg";

// ❗ Вставь рабочие пути к картинкам
const team = [
  { name: "Анна Иванова", role: "Основатель & CEO", photo: "/images/client1.jpg" },
  { name: "Михаил Петров", role: "Эко-эксперт", photo: "/images/client2.jpg" },
  { name: "Елена Сидорова", role: "Логистика", photo: "/images/client3.jpg" },
  { name: "Дмитрий Козлов", role: "Маркетинг", photo: "/images/client4.jpg" }
];

// ❗ Партнёры
const partners = [
  "/images/partner22.png",
  "/images/partner1.jpg",
  "/images/partner2.png",
  "/images/1.jpg",
  "/images/333.png"
];

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { number: "5000+", label: "Довольных клиентов", icon: <FaUsers className="text-4xl" /> },
    { number: "2 года", label: "На рынке", icon: <FaAward className="text-4xl" /> },
    { number: "50+", label: "Эко-партнёров", icon: <FaGlobe className="text-4xl" /> },
    { number: "10000 кг", label: "Пластика сэкономлено", icon: <FaLeaf className="text-4xl" /> }
  ];

  const mission =
    "Создаём устойчивый мир через экологичные товары и осознанное потребление. Каждый месяц мы доставляем натуральные продукты, которые заботятся о вашем здоровье и планете.";

  const values = [
    "100% натуральные ингредиенты",
    "Биоразлагаемая упаковка",
    "Поддержка локальных производителей",
    "Прозрачность производства",
    "Социальная ответственность",
    "Быстрая логистика"
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-black font-sans"
    >
      {/* ===== BREADCRUMBS ===== */}
      <nav className="border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center text-sm tracking-tight">
            <Link to="/" className="text-black/60 hover:underline"> ← Главная </Link>
            <span className="mx-3 text-black/30">/</span>
            <span className="font-medium">О нас</span>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-12 gap-12 items-center">

            {/* LEFT */}
            <div className="md:col-span-7 lg:col-span-6">
              <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight tracking-tight" style={{ lineHeight: 0.95 }}>
                О компании <span className="block mt-2">ЭкоБокс</span>
              </h1>

              <p className="text-lg md:text-xl text-black/70 mt-8 max-w-2xl">
                2 года заботимся о природе и вашем здоровье. Это наш вклад в устойчивое будущее.
              </p>

              <div className="mt-10 flex gap-6">
                <Link to="/products" className="inline-block border border-black/20 px-8 py-3 text-sm font-semibold uppercase hover:bg-black hover:text-white">
                  Начать покупки
                </Link>

                <Link to="/subscription/popular" className="inline-block px-8 py-3 text-sm font-semibold uppercase text-black/70 hover:text-black">
                  Узнать о подписке
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-5 lg:col-span-6">
              <div className="w-full h-[420px] overflow-hidden border border-black/5">
                <img src={HERO_IMAGE} alt="ЭкоБокс" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="mb-4 text-black/70">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-black">{s.number}</div>
                <div className="text-sm uppercase tracking-wider text-black/60 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TABS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* TAB BUTTONS */}
          <div className="flex justify-center mb-12 border-b border-black/10">
            {[["story", "Наша история"], ["mission", "Миссия"], ["team", "Команда"]].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-4 text-base font-medium tracking-wide border-b-4 transition-all ${
                  activeTab === key
                    ? "border-black text-black"
                    : "border-transparent text-black/60 hover:text-black"
                }`}
                style={{ whiteSpace: "nowrap" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div>

            {/* STORY */}
            {activeTab === "story" && (
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-4xl font-black mb-6">Наша история</h2>
                  <p className="text-lg text-black/70 leading-relaxed mb-8">
                    ЭкоБокс родился из желания упростить экологичный образ жизни.
                  </p>

                  <ul className="space-y-4 text-lg">
                    <li className="flex gap-4"><span>•</span>2025 — Запуск в Москве</li>
                    <li className="flex gap-4"><span>•</span>2025 — Доставка по России</li>
                    <li className="flex gap-4"><span>•</span>2025 — 5000+ довольных клиентов</li>
                  </ul>
                </div>

                <div className="border border-black/5 p-8">
                  <img src={STORY_IMAGE} alt="История" className="w-full h-64 object-cover" />
                </div>
              </div>
            )}

            {/* MISSION */}
            {activeTab === "mission" && (
              <div className="text-center">
                <h2 className="text-4xl font-black mb-6">Наша миссия</h2>
                <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed mb-12">{mission}</p>

                <div className="grid md:grid-cols-3 gap-8">
                  {values.map((val) => (
                    <div key={val} className="border border-black/10 p-8 text-lg font-medium">{val}</div>
                  ))}
                </div>
              </div>
            )}

            {/* TEAM */}
            {activeTab === "team" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((m) => (
                  <div key={m.name} className="text-center border border-black/10 p-6">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-28 h-28 object-cover object-center mx-auto mb-4"
                    />
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-black/60 mt-1">{m.role}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="py-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-8">Наши партнёры</h2>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center opacity-70">
            {partners.map((p, i) => (
              <div key={i} className="h-20 flex items-center justify-center border border-black/10 bg-black/5">
                <img src={p} alt={`Партнёр ${i + 1}`} className="max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase mb-4">Присоединяйтесь к нам</h2>
          <p className="text-lg text-white/70 mb-10">Станьте частью движения за устойчивый мир</p>

          <Link
            to="/products"
            className="inline-block border border-white px-10 py-3 text-sm font-semibold uppercase hover:bg-white hover:text-black"
          >
            Начать покупки
          </Link>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
