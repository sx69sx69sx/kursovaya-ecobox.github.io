import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaLeaf, FaTruck, FaShieldAlt, FaStar, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import ReviewsCarousel from '../components/ReviewsCarousel';

// 12 ПОПУЛЯРНЫХ ТОВАРОВ (СВЯЗЬ С Products.jsx)
const POPULAR_PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: '🦷', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: '🪥', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: '🧼', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: '🥤', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: '👂', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: '🧴', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: '👜', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: '🫒', rating: 4.7 },
  { id: 9, title: 'Металлическая соломинка', price: 150, image: '🥤', rating: 4.8 },
  { id: 10, title: 'Эко-губка', price: 220, image: '🧽', rating: 4.9 },
  { id: 11, title: 'Органический крем', price: 580, image: '💧', rating: 4.8 },
  { id: 12, title: 'Бамбуковая расческа', price: 310, image: '🪮', rating: 4.7 }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // КАРУСЕЛЬ ПРОМО
  const promoSlides = [
    {
      title: 'Первая коробка -50%',
      subtitle: 'Только до 31 октября!',
      price: 'от 495 ₽',
      bg: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Бесплатная доставка',
      subtitle: 'По всей России',
      price: '1-3 дня',
      bg: 'from-teal-600 to-blue-600'
    },
    {
      title: '14 дней на возврат',
      subtitle: 'Без вопросов',
      price: '100% гарантия',
      bg: 'from-blue-600 to-indigo-600'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-emerald-50 to-white"
    >
      {/* 🔥 ПРОМО КАРУСЕЛЬ */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-teal-700/90 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            {/* ЛЕВЫЙ ТЕКСТ */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-white">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                Eco<span className="text-yellow-400">Box</span>
              </h1>
              <p className="text-2xl md:text-3xl mb-8 font-light">
                Экологичные товары <span className="font-bold">каждый месяц</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/subscription/popular" 
                  className="bg-yellow-400 text-emerald-800 px-8 py-4 rounded-full font-black text-xl hover:bg-yellow-300 shadow-lg"
                >
                  Оформить подписку {promoSlides[currentSlide].price}
                </Link>
                <Link 
                  to="/products" 
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-emerald-800"
                >
                  Каталог товаров
                </Link>
              </div>
              <div className="flex items-center text-yellow-300">
                <FaStar className="mr-2" />
                <span className="text-lg">4.9/5 от 5000+ клиентов</span>
              </div>
            </motion.div>

            {/* ПРАВЫЙ ПРОМО */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              className="hidden lg:block"
            >
              {promoSlides.map((slide, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === currentSlide ? 1 : 0.3 }}
                  className={`relative bg-gradient-to-r ${slide.bg} rounded-3xl p-8 text-white text-center mb-4`}
                >
                  <h3 className="text-3xl font-black mb-2">{slide.title}</h3>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </motion.div>
              ))}
              <div className="flex justify-center space-x-2 mt-4">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📊 СТАТИСТИКА */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5000+', label: 'Счастливых клиентов', icon: '👥' },
              { num: '12 000', label: 'Коробок доставлено', icon: '📦' },
              { num: '98%', label: 'Удовлетворенность', icon: '⭐' },
              { num: '24ч', label: 'Доставка по РФ', icon: '🚚' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-black text-emerald-600 mb-2 group-hover:text-yellow-500 transition-all">{stat.num}</div>
                <p className="text-emerald-700 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛍️ 12 ПОПУЛЯРНЫХ ТОВАРОВ */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-5xl font-black text-emerald-800 mb-4">🔥 Популярные товары</h2>
            <p className="text-xl text-emerald-600">Выбрано 5000+ клиентов</p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {POPULAR_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="text-6xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-bold text-emerald-800 mb-3 text-center leading-tight">{product.title}</h3>
                  
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={j < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-1 text-sm text-emerald-600">{product.rating}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600">{product.price} ₽</span>
                    <FaArrowRight className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link 
              to="/products" 
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-black text-lg hover:bg-emerald-700"
            >
              <span>Все товары (240+)</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 💎 ПРЕИМУЩЕСТВА ПОДПИСКИ */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-black mb-8">
            Почему <span className="text-yellow-400">EcoBox</span>?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                icon: <FaBox className="text-5xl text-yellow-400" />, 
                title: '5-12 товаров', 
                desc: 'Натуральная косметика, быт, аксессуары' 
              },
              { 
                icon: <FaTruck className="text-5xl text-yellow-400" />, 
                title: 'Бесплатная доставка', 
                desc: 'По всей России за 1-3 дня' 
              },
              { 
                icon: <FaShieldAlt className="text-5xl text-yellow-400" />, 
                title: '14 дней возврат', 
                desc: 'Полный возврат денег без вопросов' 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-yellow-200">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <Link 
              to="/subscription/popular" 
              className="bg-yellow-400 text-emerald-800 px-12 py-5 rounded-full font-black text-2xl shadow-2xl hover:bg-yellow-300"
            >
              Выбрать тариф от 990 ₽
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ⭐ ОТЗЫВЫ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-black text-emerald-800 text-center mb-12">
            Что говорят наши клиенты
          </motion.h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* 🚀 ФИНАЛЬНЫЙ CTA */}
      <section className="py-24 bg-gradient-to-r from-yellow-400 to-orange-400 text-emerald-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h2 className="text-5xl font-black mb-6">Готовы к экологии?</h2>
            <p className="text-2xl mb-8 font-light">Первая коробка уже через <span className="font-black">3 дня!</span></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/subscription/popular" 
                className="bg-emerald-800 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-emerald-900 shadow-lg"
              >
                Оформить подписку
              </Link>
              <Link 
                to="/products" 
                className="border-2 border-emerald-800 text-emerald-800 px-10 py-5 rounded-full font-bold text-xl hover:bg-emerald-800 hover:text-white"
              >
                Посмотреть товары
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;