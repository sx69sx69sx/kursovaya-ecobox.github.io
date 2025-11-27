import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import ReviewsCarousel from '../components/ReviewsCarousel';

const POPULAR_PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: '/images/33333.jpg', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: '/images/bambi.jpg', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: '/images/soap.jpg', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: '/images/2222.avif', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: '/images/4343.png', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: '/images/shampoo.jpg', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: '/images/5555.jpg', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: '/images/6666.jpg', rating: 4.7 },

];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white text-black"
    >

      {/* HERO */}
      <section className="pt-28 pb-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <h1 className="text-6xl font-extrabold tracking-tight uppercase">
              Экологичные товары
            </h1>

            <p className="text-2xl font-light leading-snug">
 Поставляем каждый месяц более 500 коробок своим любимым клиентам          
</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/subscription/popular"
                className="border border-black px-10 py-4 text-lg font-semibold uppercase hover:bg-black hover:text-white transition-all"
              >
                Оформить подписку
              </Link>

              <Link
                to="/products"
                className="px-10 py-4 border border-black text-lg font-semibold uppercase hover:bg-black hover:text-white transition-all"
              >
                Каталог
              </Link>
            </div>

            <div className="flex items-center text-black/60 text-sm">
              <FaStar className="mr-2" />
              4.9 / 5 • 5000+ клиентов
            </div>
          </motion.div>

          {/* IMAGE / BIG HERO PHOTO */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block"
          >
            <img
              src="/images/promik.jpg"
              className="w-full object-cover"
              alt="EcoBox Promo"
            />
          </motion.div>

        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="py-24 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-extrabold uppercase text-center mb-16">
            Популярные товары
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {POPULAR_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="border border-black/20 p-6 cursor-pointer hover:border-black transition-all"
              >
                <Link to={`/product/${product.id}`}>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover mb-6"
                  />

                  <h3 className="font-semibold mb-3 uppercase text-sm tracking-wide">
                    {product.title}
                  </h3>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={j < Math.floor(product.rating)
                          ? 'text-black'
                          : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-black/60">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{product.price} ₽</span>
                    <FaArrowRight className="opacity-60 group-hover:opacity-100" />
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-black px-10 py-4 text-lg font-semibold uppercase hover:bg-black hover:text-white transition-all"
            >
              Смотреть все
              <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black uppercase mb-12">
            Отзывы клиентов
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h2 className="text-5xl font-extrabold uppercase mb-8">
          Готовы начать?
        </h2>
        <p className="text-xl mb-10">
          Первая коробка будет у вас уже через <span className="font-bold">3 дня</span>
        </p>

        <Link
          to="/subscription/popular"
          className="border border-black px-12 py-5 text-xl font-semibold uppercase hover:bg-black hover:text-white transition-all"
        >
          Оформить подписку
        </Link>
      </section>

    </motion.div>
  );
};

export default Home;
