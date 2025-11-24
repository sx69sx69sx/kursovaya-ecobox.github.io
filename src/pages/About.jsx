import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaTruck, FaAward, FaGlobe } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { number: '5000+', label: 'Довольных клиентов', icon: <FaUsers className="text-4xl" /> },
    { number: '2 года', label: 'На рынке', icon: <FaAward className="text-4xl" /> },
    { number: '50+', label: 'Эко-партнёров', icon: <FaGlobe className="text-4xl" /> },
    { number: '10000 кг', label: 'Пластика сэкономлено', icon: <FaLeaf className="text-4xl" /> }
  ];

  const team = [
    { name: 'Анна Иванова', role: 'Основатель & CEO', photo: '/images/client1.jpg' },
    { name: 'Михаил Петров', role: 'Эко-эксперт', photo: '/images/client2.jpg' },
    { name: 'Елена Сидорова', role: 'Логистика', photo: '/images/client3.jpg' },
    { name: 'Дмитрий Козлов', role: 'Маркетинг', photo: '/images/client4.jpg' }
  ];

  const mission = "Создаём устойчивый мир через экологичные товары и осознанное потребление. Каждый месяц мы доставляем натуральные продукты, которые заботятся о вашем здоровье и планете.";
  const values = [
    '100% натуральные ингредиенты',
    'Биоразлагаемая упаковка',
    'Поддержка локальных производителей',
    'Прозрачность производства',
    'Социальная ответственность'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* BREADCRUMBS */}
      <nav className="border-b border-gray-300 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center text-sm">
            <Link to="/" className="hover:underline">← Главная</Link>
            <span className="mx-3 text-gray-500">/</span>
            <span className="font-medium">О нас</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="border-b border-gray-300 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6"
          >
            О компании "ЭкоБокс"
          </motion.h1>
          <motion.p
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-700"
          >
            2 года заботимся о природе и вашем здоровье
          </motion.p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-6">{stat.icon}</div>
                <div className="text-4xl font-black mb-2">{stat.number}</div>
                <p className="text-gray-600 uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Buttons */}
          <div className="flex justify-center mb-16 border-b border-gray-300">
            {['story', 'mission', 'team'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-5 text-lg font-medium border-b-4 transition-all ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {tab === 'story' && 'Наша история'}
                {tab === 'mission' && 'Миссия'}
                {tab === 'team' && 'Команда'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-12">
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <h2 className="text-4xl font-black mb-8">Наша история</h2>
                  <p className="text-lg leading-relaxed text-gray-700 mb-8">
                    EcoBox родился в 2025 году, когда мы поняли: мир нуждается в простом способе жить экологично.
                    Наша команда из 4 единомышленников создала подписку, которая привозит натуральные товары прямо к двери.
                  </p>
                  <div className="space-y-6 text-lg">
                    <div className="flex items-center">
                      <span className="mr-4 text-2xl">•</span>
                      <span>2025: Запуск в Москве</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4 text-2xl">•</span>
                      <span>2025: Доставка по России</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4 text-2xl">•</span>
                      <span>2025: 5000+ клиентов</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-200 border-2 border-dashed h-96" />
              </motion.div>
            )}

            {activeTab === 'mission' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-4xl font-black mb-10">Наша миссия</h2>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-16 leading-relaxed">
                  {mission}
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  {values.map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-gray-300 p-8"
                    >
                      <p className="font-medium text-lg">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
              >
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center border border-gray-300 p-8"
                  >
                    <div className="w-28 h-28 bg-gray-200 border-2 border-dashed mx-auto mb-6" />
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20 bg-gray-50 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wider">Наши партнёры</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-12 items-center opacity-60">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-gray-300 border-2 border-dashed h-20" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black uppercase mb-6">Присоединяйтесь к нам</h2>
          <p className="text-xl mb-10 text-gray-300">Станьте частью движения за устойчивый мир</p>
          <Link
            to="/products"
            className="inline-block border-2 border-white px-12 py-5 text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black transition"
          >
            Начать покупки
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default About;