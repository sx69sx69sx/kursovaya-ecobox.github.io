import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaSearch, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: '/images/33333.jpg', category: 'Косметика', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: '/images/bambi.jpg', category: 'Гигиена', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: '/images/soap.jpg', category: 'Косметика', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: '/images/2222.avif', category: 'Аксессуары', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: '/images/4343.png', category: 'Быт', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: '/images/shampoo.jpg', category: 'Косметика', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: '/images/5555.jpg', category: 'Аксессуары', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: '/images/6666.jpg', category: 'Косметика', rating: 4.7 },
  { id: 9, title: 'Металлическая соломинка', price: 150, image: '/images/solo.webp', category: 'Аксессуары', rating: 4.8 },
  { id: 10, title: 'Эко-губка', price: 220, image: '/images/gubka.jpg', category: 'Быт', rating: 4.9 },
  { id: 11, title: 'Органический крем', price: 580, image: '/images/kr.jpeg', category: 'Косметика', rating: 4.8 },
  { id: 12, title: 'Бамбуковая расческа', price: 310, image: '/images/ras.jpg', category: 'Гигиена', rating: 4.7 },
  { id: 13, title: 'Пакеты', price: 190, image: '/images/bio_bags.jpg', category: 'Быт', rating: 4.8 },
  { id: 14, title: 'Термокружка', price: 990, image: '/images/thermo.jpg', category: 'Аксессуары', rating: 4.9 },
  { id: 15, title: 'Эко-гель для душа', price: 380, image: '/images/gel.webp', category: 'Косметика', rating: 4.8 },
  { id: 16, title: 'Щётка для посуды', price: 260, image: '/images/dish_brush.webp', category: 'Быт', rating: 4.7 },
  { id: 17, title: 'Твёрдый кондиционер', price: 310, image: '/images/cond.jpg', category: 'Косметика', rating: 4.8 },
  { id: 18, title: 'Контейнер для еды', price: 650, image: '/images/foodbox.jpg', category: 'Быт', rating: 4.9 },
  { id: 19, title: 'Салфетки из бамбука', price: 210, image: '/images/napkins.webp', category: 'Быт', rating: 4.5 },
  { id: 20, title: 'Твёрдый шампунь', price: 390, image: '/images/hardshampoo.jpg', category: 'Косметика', rating: 4.9 },
  { id: 21, title: 'Освежитель', price: 750, image: '/images/fresh.webp', category: 'Быт', rating: 4.6 },
  { id: 22, title: 'Кокосовое мыло', price: 240, image: '/images/cocos.png', category: 'Косметика', rating: 4.8 },
  { id: 23, title: 'Щётка для одежды', price: 330, image: '/images/clothbrush.jpg', category: 'Быт', rating: 4.5 },
  { id: 24, title: 'Диски для лица', price: 280, image: '/images/pads.webp', category: 'Гигиена', rating: 4.7 },
  { id: 25, title: 'Эко-порошок', price: 460, image: '/images/powder.jpeg', category: 'Быт', rating: 4.6 },
  { id: 26, title: 'Аромасаше', price: 150, image: '/images/sachet.jpg', category: 'Быт', rating: 4.9 },
];

const CATEGORIES = ['Все', 'Косметика', 'Гигиена', 'Аксессуары', 'Быт'];

const Products = () => {
  const { dispatch } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState('popular');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Все' || product.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return b.id - a.id;
  });

  const addToBox = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }
    });
    toast.success(`${product.title} добавлено в коробку`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Link to="/" className="flex items-center mb-6 text-black hover:opacity-50 transition">
            <FaArrowLeft className="mr-2" /> На главную
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-medium tracking-tight uppercase">Каталог</h1>
              <p className="text-black/50 mt-1">Выберите товары для подписки</p>
            </div>

            
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-6">

            {/* SEARCH */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
              <input
                type="text"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-black/20 focus:border-black outline-none"
              />
            </div>

            {/* CATEGORIES */}
            <div className="md:col-span-2 flex  gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 border text-sm tracking-wide transition ${
                    category === cat ? 'bg-black text-white' : 'border-black/20 hover:border-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
             {/* SORT */}
          
        </div>
        <div className="flex  mt-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-black/20 focus:border-black outline-none"
            >
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="price-low">Цена: вверх</option>
              <option value="price-high">Цена: вниз</option>
            </select>
          </div>
      </div>
          </div>

         

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

          {filteredProducts.map((product, i) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border border-black/15 p-6 hover:bg-black hover:text-white transition group cursor-pointer"
              >
                <div className="w-full h-48 bg-black/5 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:opacity-80 transition"
                  />
                </div>

                <h3 className="font-medium uppercase tracking-wide mb-2">{product.title}</h3>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      className={j < Math.floor(product.rating)
                        ? 'text-black group-hover:text-white'
                        : 'text-black/20 group-hover:text-white/30'}
                    />
                  ))}
                  <span className="text-sm opacity-70">{product.rating}</span>
                </div>

                <div className="text-lg font-medium mb-4">{product.price} ₽</div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addToBox(product);
                  }}
                  className="w-full border border-black py-2 uppercase tracking-wide hover:bg-white hover:text-black transition"
                >
                  Добавить
                </button>
              </motion.div>
            </Link>
          ))}

        </div>
      </div>

    </motion.div>
  );
};

export default Products;
