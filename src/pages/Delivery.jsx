import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTruck, FaBox, FaClock, FaRubleSign, FaMapMarkerAlt, FaShieldAlt, FaCreditCard, FaBicycle } from 'react-icons/fa';

const Delivery = () => {
  const [activeTab, setActiveTab] = useState('cdek');
  const [city, setCity] = useState('');

  // ТАРИФЫ ДОСТАВКИ
  const deliveryRates = [
    {
      id: 'cdek',
      name: 'СДЭК',
      icon: <FaTruck className="text-3xl text-emerald-500" />,
      price: 'от 250 ₽',
      time: '1-3 дня',
      description: 'Курьерская доставка по России',
      cities: 'Москва, СПб, Екатеринбург, Новосибирск + 200 городов'
    },
    {
      id: 'boxberry',
      name: 'Boxberry',
      icon: <FaBox className="text-3xl text-emerald-500" />,
      price: 'от 200 ₽',
      time: '2-4 дня',
      description: 'Пункты выдачи и курьер',
      cities: '1500+ пунктов по России'
    },
    {
      id: 'courier',
      name: 'Курьер',
      icon: <FaBicycle className="text-3xl text-emerald-500" />,
      price: '350 ₽',
      time: '1 день',
      description: 'До двери в Москве и СПб',
      cities: 'Москва, Санкт-Петербург'
    },
    {
      id: 'pickup',
      name: 'Самовывоз',
      icon: <FaMapMarkerAlt className="text-3xl text-emerald-500" />,
      price: 'Бесплатно',
      time: '30 минут',
      description: 'Из нашего офиса',
      cities: 'г. Москва, ул. Экологическая, д. 15'
    }
  ];

  // РАСчёт стоимости
  const calculatePrice = () => {
    if (!city) return 'Выберите город';
    const rate = deliveryRates.find(r => activeTab === r.id);
    return rate.price;
  };

  // ГОРОДА С ТАРФАМИ
  const cities = [
    { name: 'Москва', cdek: 250, boxberry: 200, courier: 350 },
    { name: 'Санкт-Петербург', cdek: 300, boxberry: 220, courier: 350 },
    { name: 'Екатеринбург', cdek: 350, boxberry: 250 },
    { name: 'Новосибирск', cdek: 400, boxberry: 280 },
    { name: 'Казань', cdek: 320, boxberry: 240 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
    >
      {/* HEADER */}
      <nav className="py-4 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-700 transition">
              <span className="mr-2">←</span> Главная
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-emerald-800">Доставка</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Доставка по всей России
          </motion.h1>
          <motion.p 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Быстро • Надёжно • Экологично
          </motion.p>
        </div>
      </section>

      {/* DELIVERY RATES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Способы доставки</h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {deliveryRates.map((rate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(rate.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  activeTab === rate.id
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <div className="mb-4">{rate.icon}</div>
                <h3 className="font-bold text-lg mb-2">{rate.name}</h3>
                <p className="text-emerald-700 mb-1">{rate.price}</p>
                <p className="text-sm opacity-90">{rate.time}</p>
                <p className="text-xs mt-2 line-clamp-2">{rate.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CITY CALCULATOR */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-emerald-50 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Рассчитать стоимость</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Выберите город</option>
                {cities.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
              
              <div className="flex items-center space-x-2 font-bold text-2xl text-emerald-600">
                <FaRubleSign />
                <span>{calculatePrice()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DELIVERY BENEFITS */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Преимущества нашей доставки</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaShieldAlt className="text-4xl text-emerald-500" />, title: 'Эко-упаковка', desc: '100% перерабатываемая' },
              { icon: <FaCreditCard className="text-4xl text-emerald-500" />, title: 'Оплата при получении', desc: 'Без предоплаты' },
              { icon: <FaClock className="text-4xl text-emerald-500" />, title: 'Трекинг', desc: 'Отслеживание в реальном времени' },
              { icon: <FaTruck className="text-4xl text-emerald-500" />, title: 'Страховка груза', desc: 'До 50 000 ₽' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl text-center shadow-md"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-emerald-800 mb-2">{benefit.title}</h3>
                <p className="text-emerald-700">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY MAP */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-8">Покрытие доставки</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Основные города</h3>
              <div className="space-y-2">
                {cities.map((c, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{c.name}</span>
                    <span className="text-emerald-600 font-semibold">
                      {activeTab === 'cdek' ? `${c.cdek} ₽` : `${c.boxberry} ₽`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-64 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <div className="text-white text-center">
                <FaMapMarkerAlt className="text-6xl mx-auto mb-4" />
                <p className="text-xl">200+ городов России</p>
                <p className="text-lg">1500+ пунктов выдачи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            {[
              { q: 'Сколько времени занимает доставка?', a: '1-3 дня по России, 1 день в Москве и СПб' },
              { q: 'Можно ли оплатить при получении?', a: 'Да, все способы доставки поддерживают оплату при получении' },
              { q: 'Что делать, если посылка не пришла?', a: 'Свяжитесь с нами по телефону +7 (495) 123-45-67 или в Telegram' },
              { q: 'Бесплатная доставка от какой суммы?', a: 'От 1500 ₽ по всей России' }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold text-emerald-800 mb-3">{faq.q}</h3>
                <p className="text-emerald-700">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы заказать?</h2>
          <p className="text-xl mb-8">Бесплатная доставка от 1500 ₽</p>
          <Link
            to="/products"
            className="inline-block bg-white text-emerald-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition"
          >
            Выбрать товары
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Delivery;