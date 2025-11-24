import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaStar, 
  FaHeart, 
  FaBox, 
  FaMinus, 
  FaPlus, 
  FaTruck, 
  FaLeaf, 
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// ДАННЫЕ ТОВАРОВ (24 ТОВАРА)
const PRODUCTS_DATA = {
  1: {
    id: 1,
    title: 'Эко-зубная паста с мятой',
    price: 350,
    category: 'Косметика',
    rating: 4.8,
    reviews: 127,
    images: ['🦷', '🧴', '🦷', '🧴'],
    description: '100% натуральная зубная паста без фтора и SLS. Состав: кальций карбонат, эфирные масла мяты, эвкалипта, кокосовое масло. Биоразлагаемая упаковка.',
    specs: [
      { name: 'Объем', value: '100 мл' },
      { name: 'Срок годности', value: '24 месяца' },
      { name: 'Страна', value: 'Россия' },
      { name: 'Вес', value: '120 г' },
      { name: 'Состав', value: '100% натурально' }
    ],
    features: [
      'Без фтора и SLS',
      'Эко-упаковка',
      'Для чувствительных зубов',
      'Веганская формула'
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 47
  },
  2: {
    id: 2,
    title: 'Бамбуковая зубная щетка',
    price: 250,
    category: 'Гигиена',
    rating: 4.9,
    reviews: 203,
    images: ['🪥', '🪥', '🪥', '🪥'],
    description: 'Щетина из касторовых волокон, ручка из бамбука. Полностью биоразлагаемая за 6 месяцев. Средняя жесткость.',
    specs: [
      { name: 'Материал', value: 'Бамбук 100%' },
      { name: 'Щетина', value: 'Кастор' },
      { name: 'Срок службы', value: '3 месяца' },
      { name: 'Вес', value: '15 г' }
    ],
    features: [
      'Биоразлагаемая',
      'Средняя жесткость',
      'Эргономичная ручка',
      'Для взрослых'
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 156
  },
  3: {
    id: 3,
    title: 'Натуральное мыло ручной работы',
    price: 280,
    category: 'Косметика',
    rating: 4.7,
    reviews: 89,
    images: ['🧼', '🧼', '🧼', '🧼'],
    description: 'Органическое мыло с оливковым маслом и лавандой. Без сульфатов и парабенов. Подходит для сухой кожи.',
    specs: [
      { name: 'Вес', value: '100 г' },
      { name: 'Срок годности', value: '12 месяцев' },
      { name: 'Запах', value: 'Лаванда' },
      { name: 'Тип кожи', value: 'Все типы' }
    ],
    features: [
      'Органическое',
      'Без сульфатов',
      'Для сухой кожи',
      'Ручная работа'
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 34
  },
  // ... остальные 21 товар аналогично
};

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = PRODUCTS_DATA[id] || PRODUCTS_DATA[1];
  
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const totalPrice = product.price * quantity;

  // ДОБАВЛЕНИЕ В КОРОБКУ
  const addToBox = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.images[0], 
        quantity 
      } 
    });
    toast.success(`✅ ${product.title} добавлено в коробку!`);
  };

  // ОТЗЫВЫ
  const reviews = [
    { author: 'Анна С.', rating: 5, text: 'Отличная паста! Зубы чистые, дыхание свежее целый день.', date: '15.10.2025' },
    { author: 'Дмитрий К.', rating: 5, text: 'Натуральная и эффективная. Беру второй тюбик!', date: '12.10.2025' },
    { author: 'Елена П.', rating: 4, text: 'Хорошая, но пенится слабо. Привыкну.', date: '10.10.2025' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-emerald-50"
    >
      {/* BREADCRUMBS */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/products" className="flex items-center text-emerald-600 hover:text-emerald-800">
            <FaArrowLeft className="mr-2" /> Назад к каталогу
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ИЗОБРАЖЕНИЯ */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-9xl mb-4">{product.images[currentImage]}</div>
            </div>

            {/* ГАЛЕРЕЯ */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    i === currentImage ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-4xl">{img}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ИНФОРМАЦИЯ */}
          <div className="space-y-6">
            {/* НАЗВАНИЕ + РЕЙТИНГ */}
            <div>
              <h1 className="text-4xl font-bold text-emerald-800 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-emerald-600 font-semibold">{product.rating}</span>
                </div>
                <span className="text-emerald-600">({product.reviews} отзывов)</span>
              </div>
            </div>

            {/* ЦЕНА */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-emerald-600">{product.price} ₽/мес</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-emerald-600">
                <FaLeaf className="text-emerald-500" />
                <span>В наличии: {product.stock} шт</span>
              </div>
            </div>

            {/* 📦 ДОБАВИТЬ В КОРОБКУ */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                <FaBox className="mr-2 text-yellow-500" />
                Добавить в ежемесячную коробку
              </h3>
              
              <div className="space-y-4">
                {/* КОЛИЧЕСТВО НА МЕСЯЦ */}
                <div className="flex items-center justify-between">
                  <span className="text-emerald-700 font-semibold">Количество в месяц:</span>
                  <div className="flex items-center space-x-2">
                    {[1, 3, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`w-12 h-12 rounded-full font-bold border-2 transition-all ${
                          quantity === num
                            ? 'bg-yellow-400 text-emerald-800 border-yellow-400 shadow-lg'
                            : 'bg-white text-emerald-700 border-emerald-200 hover:border-yellow-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ЦЕНА */}
                <div className="text-center bg-white p-3 rounded-xl">
                  <span className="text-2xl font-black text-emerald-600">
                    {totalPrice} ₽/мес
                  </span>
                </div>

                {/* КНОПКА */}
                <button
                  onClick={addToBox}
                  className="w-full bg-yellow-400 text-emerald-800 py-4 rounded-xl font-black text-lg flex items-center justify-center space-x-2 hover:bg-yellow-300 shadow-lg transition-all"
                >
                  <FaBox className="text-xl" />
                  <span>Добавить в коробку</span>
                </button>
              </div>
            </div>

            {/* ИЗБРАННОЕ */}
            <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl font-bold hover:bg-emerald-50 flex items-center justify-center space-x-2">
              <FaHeart />
              <span>В избранное</span>
            </button>

            {/* ДОСТАВКА */}
            <div className="bg-emerald-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <FaTruck className="text-emerald-500" />
                <span className="font-bold text-emerald-800">Доставка</span>
              </div>
              <p className="text-emerald-600">{product.delivery}</p>
            </div>

            <div className="flex items-center space-x-4 text-emerald-600 text-sm">
              <div className="flex items-center space-x-1">
                <FaShieldAlt className="text-emerald-500" />
                <span>14 дней на возврат</span>
              </div>
            </div>
          </div>
        </div>

        {/* ОПИСАНИЕ + ХАРАКТЕРИСТИКИ */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Описание</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-emerald-700 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">Характеристики</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-emerald-700">{spec.name}</span>
                  <span className="font-semibold text-emerald-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✓ ПРЕИМУЩЕСТВА */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Преимущества</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.features.map((feature, i) => (
              <div key={i} className="bg-white p-4 rounded-xl text-center shadow-lg">
                <div className="text-2xl text-emerald-500 mb-2">✓</div>
                <p className="text-emerald-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 💬 ОТЗЫВЫ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">
            Отзывы ({product.reviews})
          </h2>
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={j < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-emerald-800">{review.author}</span>
                  <span className="text-gray-500">• {review.date}</span>
                </div>
                <p className="text-emerald-700 italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;