import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaSearch, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
const PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: 'src/assets/images/33333.jpg', category: 'Косметика', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: 'src/assets/images/bambi.jpg', category: 'Гигиена', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: 'src/assets/images/soap.jpg', category: 'Косметика', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: 'src/assets/images/2222.avif', category: 'Аксессуары', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: 'src/assets/images/4343.png', category: 'Быт', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: 'src/assets/images/shampoo.jpg', category: 'Косметика', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: 'src/assets/images/5555.jpg', category: 'Аксессуары', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: 'src/assets/images/6666.jpg', category: 'Косметика', rating: 4.7 },
  { id: 9, title: 'Металлическая соломинка', price: 150, image: 'src/assets/images/solo.webp', category: 'Аксессуары', rating: 4.8 },
  { id: 10, title: 'Эко-губка', price: 220, image: 'src/assets/images/gubka.jpg', category: 'Быт', rating: 4.9 },
  { id: 11, title: 'Органический крем', price: 580, image: 'src/assets/images/kr.jpeg', category: 'Косметика', rating: 4.8 },
  { id: 12, title: 'Бамбуковая расческа', price: 310, image: 'src/assets/images/ras.jpg', category: 'Гигиена', rating: 4.7 },
  { id: 13, title: 'Пакеты', price: 190, image: 'src/assets/images/bio_bags.jpg', category: 'Быт', rating: 4.8 },
  { id: 14, title: 'Термокружка', price: 990, image: 'src/assets/images/thermo.jpg', category: 'Аксессуары', rating: 4.9 },
  { id: 15, title: 'Эко-гель для душа', price: 380, image: 'src/assets/images/gel.webp', category: 'Косметика', rating: 4.8 },
  { id: 16, title: 'Щётка для посуды', price: 260, image: 'src/assets/images/dish_brush.webp', category: 'Быт', rating: 4.7 },
  { id: 17, title: 'Твёрдый кондиционер', price: 310, image: 'src/assets/images/cond.jpg', category: 'Косметика', rating: 4.8 },
  { id: 18, title: 'Контейнер для еды', price: 650, image: 'src/assets/images/foodbox.jpg', category: 'Быт', rating: 4.9 },
  { id: 19, title: 'Салфетки из бамбука', price: 210, image: 'src/assets/images/napkins.webp', category: 'Быт', rating: 4.5 },
  { id: 20, title: 'Твёрдый шампунь', price: 390, image: 'src/assets/images/hardshampoo.jpg', category: 'Косметика', rating: 4.9 },
  { id: 21, title: 'Освежитель', price: 750, image: 'src/assets/images/fresh.webp', category: 'Быт', rating: 4.6 },
  { id: 22, title: 'Кокосовое мыло', price: 240, image: 'src/assets/images/cocos.png', category: 'Косметика', rating: 4.8 },
  { id: 23, title: 'Щётка для одежды', price: 330, image: 'src/assets/images/clothbrush.jpg', category: 'Быт', rating: 4.5 },
  { id: 24, title: 'Диски для лица', price: 280, image: 'src/assets/images/pads.webp', category: 'Гигиена', rating: 4.7 },
  { id: 25, title: 'Эко-порошок', price: 460, image: 'src/assets/images/powder.jpeg', category: 'Быт', rating: 4.6 },
  { id: 26, title: 'Аромасаше', price: 150, image: 'src/assets/images/sachet.jpg', category: 'Быт', rating: 4.9 },
];

const CATEGORIES = ['Все', 'Косметика', 'Гигиена', 'Аксессуары', 'Быт'];

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/60">
      {index.toString().padStart(2, '0')}
    </span>
    <span className="flex-1 h-px bg-black" />
    <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em]">
      {children}
    </h2>
  </div>
);

const Products = () => {
  const { dispatch } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState('popular');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Все' || product.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return b.id - a.id; // "Популярные" – новые выше
  });

  const addToBox = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });
    toast.success(`${product.title} добавлено в коробку`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black mb-10"
    >

      <main className="max-w-7xl mx-auto px-6 pb-18">
        {/* HERO — ЧЁРНАЯ ПОЛОСА */}
        <section className="mt-10 mb-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black text-white border border-black overflow-hidden"
          >
            <div className="grid md:grid-cols-[3fr,2fr]">
              {/* ЛЕВАЯ ЧАСТЬ */}
              <div className="px-8 lg:px-10 py-9 lg:py-11 border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">
                  Каталог
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-4">
                  Соберите свою эко-коробку
                </h1>
                <p className="text-sm md:text-[15px] text-white/75 max-w-xl">
                  Косметика, гигиена, аксессуары и товары для дома. 
                  Всё, что вы выбираете здесь, можно добавить в подписку или разовый заказ.
                </p>
              </div>

              {/* ПРАВАЯ ЧАСТЬ — ЦИФРЫ */}
              <div className="px-8 lg:px-10 py-8 lg:py-10 bg-black/90 text-xs">
                <div className="flex items-center justify-between border-b border-white/12 pb-4 mb-4">
                  <span className="uppercase tracking-[0.25em] text-white/60">
                    Товаров
                  </span>
                  <span className="text-2xl font-semibold">{PRODUCTS.length}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/12 pb-4 mb-4">
                  <span className="uppercase tracking-[0.25em] text-white/60">
                    Средний рейтинг
                  </span>
                  <span className="text-2xl font-semibold">4.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.25em] text-white/60">
                    Категории
                  </span>
                  <span className="text-2xl font-semibold">
                    {CATEGORIES.length - 1}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ФИЛЬТРЫ */}
        <section className="mb-12 space-y-6">
          <SectionLabel index={1}>Фильтры</SectionLabel>

          <div className="border border-black/12 px-5 py-5 md:px-6 md:py-6">
            <div className="grid md:grid-cols-[2fr,3fr,1.5fr] gap-4 md:gap-6 items-center">
              {/* SEARCH */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Поиск
                </p>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
                  <input
                    type="text"
                    placeholder="Название товара"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-black/20 focus:border-black outline-none text-sm"
                  />
                </div>
              </div>

              {/* CATEGORIES */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Категории
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={[
                        'px-3 py-1.5 border text-[11px] tracking-[0.18em] uppercase transition',
                        category === cat
                          ? 'bg-black text-white border-black'
                          : 'border-black/25 hover:border-black hover:bg-black/5'
                      ].join(' ')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Сортировка
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full border border-black/20 px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
                >
                  <option value="popular">Популярные</option>
                  <option value="rating">По рейтингу</option>
                  <option value="price-low">Цена: вверх</option>
                  <option value="price-high">Цена: вниз</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ ТОВАРОВ */}
        <section className="mb-18 space-y-6">
          <SectionLabel index={2}>Все товары</SectionLabel>

          <div className="flex justify-between items-center text-[11px] text-black/60 mb-2">
            <span>
              Найдено: <span className="font-semibold text-black">{filteredProducts.length}</span>
            </span>
            <span className="hidden md:inline">
              Клик по карточке — детали товара, кнопка «Добавить» — сразу в коробку
            </span>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product, i) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="border border-black/15 p-5 hover:bg-black hover:text-white transition group cursor-pointer h-full flex flex-col"
                >
                  {/* КАРТИНКА */}
                  <div className="w-full h-48 bg-black/5 mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:opacity-80 transition"
                    />
                  </div>

                  {/* КАТЕГОРИЯ */}
                  <div className="flex items-center justify-between mb-2 text-[11px] uppercase tracking-[0.18em]">
                    <span className="opacity-70">{product.category}</span>
                    <span className="opacity-40 group-hover:opacity-60">
                      ID {product.id.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* НАЗВАНИЕ */}
                  <h3 className="font-medium uppercase tracking-[0.12em] mb-2 text-sm">
                    {product.title}
                  </h3>

                  {/* РЕЙТИНГ */}
                  <div className="flex items-center gap-1 mb-3 text-xs">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={
                          j < Math.round(product.rating)
                            ? 'text-black group-hover:text-white'
                            : 'text-black/20 group-hover:text-white/30'
                        }
                      />
                    ))}
                    <span className="ml-1 opacity-70">{product.rating.toFixed(1)}</span>
                  </div>

                  {/* ЦЕНА */}
                  <div className="text-lg font-semibold mb-4">{product.price} ₽</div>

                  {/* КНОПКА */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addToBox(product);
                    }}
                    className="mt-auto w-full border border-black group-hover:border-white py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition"
                  >
                    Добавить в коробку
                  </button>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default Products;
