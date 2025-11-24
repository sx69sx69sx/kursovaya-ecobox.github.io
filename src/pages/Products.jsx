import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaBox, 
  FaLeaf, 
  FaFilter, 
  FaStar, 
  FaSearch, 
  FaArrowLeft 
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// 24 ПОПУЛЯРНЫХ ТОВАРА ДЛЯ ПОДПИСКИ
const PRODUCTS = [
  { id: 1, title: 'Эко-зубная паста', price: 350, image: '🦷', category: 'Косметика', rating: 4.8 },
  { id: 2, title: 'Бамбуковая щетка', price: 250, image: '🪥', category: 'Гигиена', rating: 4.9 },
  { id: 3, title: 'Натуральное мыло', price: 280, image: '🧼', category: 'Косметика', rating: 4.7 },
  { id: 4, title: 'Многоразовая бутылка', price: 890, image: '🥤', category: 'Аксессуары', rating: 4.9 },
  { id: 5, title: 'Бамбуковые палочки', price: 180, image: '👂', category: 'Гигиена', rating: 4.8 },
  { id: 6, title: 'Эко-шампунь', price: 420, image: '🧴', category: 'Косметика', rating: 4.6 },
  { id: 7, title: 'Хлопковая сумка', price: 450, image: '👜', category: 'Аксессуары', rating: 4.9 },
  { id: 8, title: 'Натуральный дезодорант', price: 320, image: '🫒', category: 'Косметика', rating: 4.7 },
  { id: 9, title: 'Металлическая соломинка', price: 150, image: '🥤', category: 'Аксессуары', rating: 4.8 },
  { id: 10, title: 'Эко-губка', price: 220, image: '🧽', category: 'Быт', rating: 4.9 },
  { id: 11, title: 'Органический крем', price: 580, image: '💧', category: 'Косметика', rating: 4.8 },
  { id: 12, title: 'Бамбуковая расческа', price: 310, image: '🪮', category: 'Гигиена', rating: 4.7 },
  { id: 13, title: 'Эко-зубная нить', price: 190, image: '🦷', category: 'Гигиена', rating: 4.6 },
  { id: 14, title: 'Натуральный скраб', price: 380, image: '🧴', category: 'Косметика', rating: 4.8 },
  { id: 15, title: 'Бамбуковые ватные палочки', price: 160, image: '👂', category: 'Гигиена', rating: 4.9 },
  { id: 16, title: 'Эко-стиральный порошок', price: 450, image: '🧺', category: 'Быт', rating: 4.7 },
  { id: 17, title: 'Хлопковые прокладки', price: 290, image: '🩸', category: 'Гигиена', rating: 4.8 },
  { id: 18, title: 'Натуральный бальзам', price: 340, image: '💋', category: 'Косметика', rating: 4.9 },
  { id: 19, title: 'Металлическая щетка', price: 210, image: '🧽', category: 'Быт', rating: 4.6 },
  { id: 20, title: 'Эко-менструальная чаша', price: 1290, image: '🩸', category: 'Гигиена', rating: 4.9 },
  { id: 21, title: 'Органическое масло', price: 520, image: '🫒', category: 'Косметика', rating: 4.8 },
  { id: 22, title: 'Бамбуковая подставка', price: 390, image: '🪮', category: 'Аксессуары', rating: 4.7 },
  { id: 23, title: 'Натуральный спрей', price: 260, image: '🧴', category: 'Косметика', rating: 4.6 },
  { id: 24, title: 'Эко-сумка для обуви', price: 480, image: '👟', category: 'Аксессуары', rating: 4.9 }
];

const CATEGORIES = ['Все', 'Косметика', 'Гигиена', 'Аксессуары', 'Быт'];

const Products = () => {
  const { dispatch } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState('popular');

  // ФИЛЬТРЫ
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Все' || product.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return b.id - a.id; // popular
  });

  // ДОБАВИТЬ В КОРОБКУ
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
    toast.success(`✅ ${product.title} добавлено в коробку!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-emerald-50"
    >
      {/* HEADER */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/" className="flex items-center text-emerald-600 mb-4 hover:text-emerald-800">
            <FaArrowLeft className="mr-2" /> На главную
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-800">Каталог товаров</h1>
              <p className="text-emerald-600 flex items-center">
                <FaLeaf className="mr-2" /> 100% натуральные продукты для подписки
              </p>
            </div>
            <Link 
              to="/box" 
              className="bg-yellow-400 text-emerald-800 px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-yellow-300"
            >
              <FaBox />
              <span>Моя коробка</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ФИЛЬТРЫ */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* ПОИСК */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-yellow-400 focus:outline-none"
              />
            </div>

            {/* КАТЕГОРИИ */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      category === cat
                        ? 'bg-yellow-400 text-emerald-800 shadow-lg'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* СОРТИРОВКА */}
          <div className="flex justify-end mt-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border-2 border-emerald-200 rounded-xl focus:border-yellow-400"
            >
              <option value="popular">Популярные</option>
              <option value="rating">По рейтингу</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
            </select>
          </div>
        </div>
      </div>

      {/* ТОВАРЫ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <FaBox className="text-9xl text-emerald-200 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Товары не найдены</h2>
            <p className="text-emerald-600 mb-8">Попробуйте изменить фильтры</p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('Все');
                setSort('popular');
              }}
              className="bg-yellow-400 text-emerald-800 px-8 py-3 rounded-full font-bold"
            >
              Показать все
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <p className="text-xl text-emerald-600">
                Найдено {filteredProducts.length} товаров
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden group cursor-pointer"
                >
                  {/* ИЗОБРАЖЕНИЕ */}
                  <div className="text-6xl mb-4 text-center">{product.image}</div>

                  {/* НАЗВАНИЕ */}
                  <h3 className="font-bold text-emerald-800 mb-3 text-center leading-tight">
                    {product.title}
                  </h3>

                  {/* РЕЙТИНГ */}
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={j < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-1 text-sm text-emerald-600">{product.rating}</span>
                  </div>

                  {/* КАТЕГОРИЯ */}
                  <p className="text-xs text-emerald-500 text-center mb-4 capitalize">
                    {product.category}
                  </p>

                  {/* ЦЕНА */}
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-2xl font-black text-emerald-600">
                      {product.price} ₽/мес
                    </span>
                  </div>

                  {/* КНОПКИ */}
                  <div className="space-y-2">
                    <button
                      onClick={() => addToBox(product)}
                      className="w-full bg-yellow-400 text-emerald-800 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-yellow-300 transition-all shadow-lg"
                    >
                      <FaBox />
                      <span>В коробку</span>
                    </button>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-emerald-50 text-emerald-700 py-2 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-emerald-100 transition-all"
                    >
                      Подробнее
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Products;