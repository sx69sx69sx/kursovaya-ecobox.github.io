import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import ReviewsCarousel from '../components/ReviewsCarousel';

const POPULAR_PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: 'src/assets/images/33333.jpg', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: 'src/assets//images/bambi.jpg', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: 'src/assets//images/soap.jpg', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: 'src/assets//images/2222.avif', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: 'src/assets//images/4343.png', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: 'src/assets//images/shampoo.jpg', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: 'src/assets//images/5555.jpg', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: 'src/assets/images/6666.jpg', rating: 4.7 },
];

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white text-black"
    >

      {/* HERO — ЛЁГКИЙ, АКЦЕНТНЫЙ, ЧИСТЫЙ */}
      <section className="pt-32 pb-24 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-10"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
              Экотовары нового поколения
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase">
              Чистые<br /> 
              ингредиенты.<br />
              Чистый дом.
            </h1>

            <p className="text-lg text-black/70 max-w-md leading-relaxed">
              Натуральные средства, товары для ухода и экотовары, которые приходят к вам автоматически — по подписке.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/subscription/popular"
                className="border border-black px-10 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                Оформить подписку
              </Link>

              <Link
                to="/products"
                className="border border-black px-10 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
              >
                Каталог
              </Link>
            </div>

            <div className="flex items-center text-black/50 text-sm">
              <FaStar className="mr-2" />
              Рейтинг 4.9 • 5000+ клиентов
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block"
          >
            <img
              src="src/assets/images/promik.jpg"
              className="w-full h-[550px] object-cover"
              alt="EcoBox Promo"
            />
          </motion.div>

        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="py-24 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-extrabold uppercase text-center mb-12">
            Популярные товары
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {POPULAR_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="border border-black/20 p-6 hover:border-black transition-all"
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
                        className={
                          j < Math.floor(product.rating)
                            ? 'text-black'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                    <span className="ml-2 text-sm text-black/60">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{product.price} ₽</span>
                    <FaArrowRight className="opacity-50 group-hover:opacity-100" />
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-black px-10 py-4 text-sm font-semibold uppercase hover:bg-black hover:text-white transition-all"
            >
              Смотреть все
              <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 border-b border-black/10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold uppercase mb-12">
            Отзывы клиентов
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6">
          Готовы начать?
        </h2>
        <p className="text-xl mb-10 text-black/70">
          Первая коробка будет у вас уже через <span className="font-semibold">3 дня</span>.
        </p>

        <Link
          to="/subscription/popular"
          className="border border-black px-12 py-5 text-base font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
        >
          Оформить подписку
        </Link>
      </section>

    </motion.div>
  );
};

export default Home;
