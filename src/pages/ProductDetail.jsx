import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FaStar,
  FaHeart,
  FaBox,
  FaTruck,
  FaLeaf,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// Базовые характеристики и преимущества (повторяются у всех товаров)
const DEFAULT_SPECS = [
  { name: 'Упаковка', value: 'Без пластика' },
  { name: 'Тип', value: 'Экологичный товар' },
  { name: 'Страна', value: 'Россия' }
];

const DEFAULT_FEATURES = [
  'Экологичный состав',
  'Подходит для подписки',
  'Минимум отходов',
  'Без лишней упаковки'
];

// ПОЛНЫЙ СПИСОК ТОВАРОВ
const PRODUCTS_DATA = {
  1: {
    id: 1,
    title: 'Эко-зубная паста',
    price: 350,
    image: '../src/assets/images/33333.jpg',
    category: 'Косметика',
    rating: 4.8,
    reviews: 127,
    description:
      'Натуральная зубная паста без фтора и SLS. Мягко очищает эмаль и освежает дыхание. Упаковка полностью перерабатывается.',
    specs: [
      { name: 'Объём', value: '100 мл' },
      ...DEFAULT_SPECS
    ],
    features: [
      'Без фтора и SLS',
      'Подходит для чувствительных зубов',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 47
  },
  2: {
    id: 2,
    title: 'Бамбуковая щетка',
    price: 250,
    image: '../src/assets/images/bambi.jpg',
    category: 'Гигиена',
    rating: 4.9,
    reviews: 203,
    description:
      'Щётка с бамбуковой ручкой и растительной щетиной. Полностью биоразлагается и заменяет пластиковые аналоги.',
    specs: [
      { name: 'Материал ручки', value: 'Бамбук' },
      ...DEFAULT_SPECS
    ],
    features: [
      'Биоразлагаемая щётка',
      'Эргономичная форма',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 156
  },
  3: {
    id: 3,
    title: 'Натуральное мыло',
    price: 280,
    image: '../src/assets/images/soap.jpg',
    category: 'Косметика',
    rating: 4.7,
    reviews: 89,
    description:
      'Мыло ручной работы на основе растительных масел. Без сульфатов и парабенов, подходит для чувствительной кожи.',
    specs: [
      { name: 'Вес', value: '100 г' },
      ...DEFAULT_SPECS
    ],
    features: [
      'Ручная работа',
      'Без агрессивных ПАВ',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 34
  },
  4: {
    id: 4,
    title: 'Многоразовая бутылка',
    price: 890,
    image: '../src/assets/images/2222.avif',
    category: 'Аксессуары',
    rating: 4.9,
    reviews: 142,
    description:
      'Лёгкая многоразовая бутылка для воды. Заменяет одноразовый пластик и удобно брать с собой.',
    specs: [
      { name: 'Объём', value: '500 мл' },
      ...DEFAULT_SPECS
    ],
    features: [
      'Подходит для холодных и горячих напитков',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 61
  },
  5: {
    id: 5,
    title: 'Бамбуковые палочки',
    price: 180,
    image: '../src/assets/images/4343.png',
    category: 'Быт',
    rating: 4.8,
    reviews: 75,
    description:
      'Одноразовые бамбуковые палочки вместо пластика. Подходят для сервировки и повседневного использования.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 120
  },
  6: {
    id: 6,
    title: 'Эко-шампунь',
    price: 420,
    image: '../src/assets/images/shampoo.jpg',
    category: 'Косметика',
    rating: 4.6,
    reviews: 98,
    description:
      'Шампунь на мягких ПАВ растительного происхождения. Бережно очищает кожу головы и волосы.',
    specs: DEFAULT_SPECS,
    features: [
      'Подходит для ежедневного использования',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 80
  },
  7: {
    id: 7,
    title: 'Хлопковая сумка',
    price: 450,
    image: '../src/assets/images/5555.jpg',
    category: 'Аксессуары',
    rating: 4.9,
    reviews: 210,
    description:
      'Плотная хлопковая эко-сумка для покупок. Заменяет десятки пластиковых пакетов.',
    specs: DEFAULT_SPECS,
    features: [
      'Складывается и почти не занимает места',
      ...DEFAULT_FEATURES
    ],
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 95
  },
  8: {
    id: 8,
    title: 'Натуральный дезодорант',
    price: 320,
    image: '../src/assets/images/6666.jpg',
    category: 'Косметика',
    rating: 4.7,
    reviews: 134,
    description:
      'Дезодорант без солей алюминия и спирта. Не блокирует потоотделение и не пересушивает кожу.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 70
  },
  9: {
    id: 9,
    title: 'Металлическая соломинка',
    price: 150,
    image: '../src/assets/images/solo.webp',
    category: 'Аксессуары',
    rating: 4.8,
    reviews: 190,
    description:
      'Многоразовая металлическая соломинка в комплекте с щёточкой для очистки. Заменяет сотни пластиковых.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 200
  },
  10: {
    id: 10,
    title: 'Эко-губка',
    price: 220,
    image: '../src/assets/images/gubka.jpg',
    category: 'Быт',
    rating: 4.9,
    reviews: 65,
    description:
      'Губка из натуральных материалов без микропластика. Подходит для посуды и кухни.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 110
  },
  11: {
    id: 11,
    title: 'Органический крем',
    price: 580,
    image: '../src/assets/images/kr.jpeg',
    category: 'Косметика',
    rating: 4.8,
    reviews: 52,
    description:
      'Лёгкий увлажняющий крем на основе растительных масел и экстрактов. Без минеральных масел и силиконов.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 45
  },
  12: {
    id: 12,
    title: 'Бамбуковая расческа',
    price: 310,
    image: '../src/assets/images/ras.jpg',
    category: 'Гигиена',
    rating: 4.7,
    reviews: 88,
    description:
      'Гребень из бамбука, не электризует волосы и мягко массирует кожу головы.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 60
  },
  13: {
    id: 13,
    title: 'Пакеты',
    price: 190,
    image: '../src/assets/images/bio_bags.jpg',
    category: 'Быт',
    rating: 4.8,
    reviews: 77,
    description:
      'Биоразлагаемые пакеты для отходов. Разлагаются быстрее обычного пластика.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 150
  },
  14: {
    id: 14,
    title: 'Термокружка',
    price: 990,
    image: '../src/assets/images/thermo.jpg',
    category: 'Аксессуары',
    rating: 4.9,
    reviews: 103,
    description:
      'Многоразовая термокружка для кофе и чая. Удобно брать с собой вместо одноразовых стаканов.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 54
  },
  15: {
    id: 15,
    title: 'Эко-гель для душа',
    price: 380,
    image: '../src/assets/images/gel.webp',
    category: 'Косметика',
    rating: 4.8,
    reviews: 91,
    description:
      'Гель для душа с мягкими ПАВ и натуральными ароматами. Без красителей и парабенов.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 73
  },
  16: {
    id: 16,
    title: 'Щётка для посуды',
    price: 260,
    image: '../src/assets/images/dish_brush.webp',
    category: 'Быт',
    rating: 4.7,
    reviews: 64,
    description:
      'Щётка для посуды из дерева и натуральной щетины. Заменяет пластиковые губки.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 90
  },
  17: {
    id: 17,
    title: 'Твёрдый кондиционер',
    price: 310,
    image: '../src/assets/images/cond.jpg',
    category: 'Косметика',
    rating: 4.8,
    reviews: 58,
    description:
      'Твёрдый кондиционер для волос в минималистичной упаковке. Удобен в дороге и хранении.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 50
  },
  18: {
    id: 18,
    title: 'Контейнер для еды',
    price: 650,
    image: '../src/assets/images/foodbox.jpg',
    category: 'Быт',
    rating: 4.9,
    reviews: 84,
    description:
      'Многоразовый контейнер для еды. Подходит для хранения и переноски обедов.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 68
  },
  19: {
    id: 19,
    title: 'Салфетки из бамбука',
    price: 210,
    image: '../src/assets/images/napkins.webp',
    category: 'Быт',
    rating: 4.5,
    reviews: 39,
    description:
      'Многоразовые салфетки из бамбукового волокна. Можно стирать и использовать повторно.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 130
  },
  20: {
    id: 20,
    title: 'Твёрдый шампунь',
    price: 390,
    image: '../src/assets/images/hardshampoo.jpg',
    category: 'Косметика',
    rating: 4.9,
    reviews: 112,
    description:
      'Твёрдый шампунь в бумажной упаковке. Экономичный и удобный формат для путешествий.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 77
  },
  21: {
    id: 21,
    title: 'Освежитель',
    price: 750,
    image: '../src/assets/images/fresh.webp',
    category: 'Быт',
    rating: 4.6,
    reviews: 46,
    description:
      'Натуральный освежитель воздуха без синтетических ароматизаторов. На основе эфирных масел.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 44
  },
  22: {
    id: 22,
    title: 'Кокосовое мыло',
    price: 240,
    image: '../src/assets/images/cocos.png',
    category: 'Косметика',
    rating: 4.8,
    reviews: 37,
    description:
      'Мыло с кокосовым маслом, хорошо пенится и не сушит кожу. Без искусственных ароматизаторов.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 65
  },
  23: {
    id: 23,
    title: 'Щётка для одежды',
    price: 330,
    image: '../src/assets/images/clothbrush.jpg',
    category: 'Быт',
    rating: 4.5,
    reviews: 29,
    description:
      'Щётка для одежды из дерева и натуральной щетины. Бережно удаляет загрязнения с ткани.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 52
  },
  24: {
    id: 24,
    title: 'Диски для лица',
    price: 280,
    image: '../src/assets/images/pads.webp',
    category: 'Гигиена',
    rating: 4.7,
    reviews: 61,
    description:
      'Многоразовые диски для снятия макияжа и тоника. Можно стирать и использовать снова.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 88
  },
  25: {
    id: 25,
    title: 'Эко-порошок',
    price: 460,
    image: '../src/assets/images/powder.jpeg',
    category: 'Быт',
    rating: 4.6,
    reviews: 72,
    description:
      'Стиральный порошок без фосфатов и агрессивных отбеливателей. Подходит для чувствительной кожи.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 76
  },
  26: {
    id: 26,
    title: 'Аромасаше',
    price: 150,
    image: '../src/assets/images/sachet.jpg',
    category: 'Быт',
    rating: 4.9,
    reviews: 33,
    description:
      'Натуральное аромасаше для шкафа, комода или сумки. Наполнено сухоцветами и эфирными маслами.',
    specs: DEFAULT_SPECS,
    features: DEFAULT_FEATURES,
    delivery: 'Бесплатная доставка от 990 ₽',
    stock: 59
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();

  const numericId = Number(id);
  const product = PRODUCTS_DATA[numericId];

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-2">
            Товар не найден
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const addToBox = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      }
    });
    toast.success(`${product.title} добавлено в коробку`);
  };

 const reviews = [ 
  {
    author: 'Анна С.',
    rating: 5,
    text: 'Отличный экотовар, беру уже не первый раз.',
    date: '15.10.2025'
  },
  {
    author: 'Дмитрий К.',
    rating: 5,
    text: 'Удобно в формате подписки — не нужно вспоминать о заказе.',
    date: '12.10.2025'
  },
  {
    author: 'Елена П.',
    rating: 4,
    text: 'Качественно, упаковка без лишнего пластика.',
    date: '10.10.2025'
  },
  {
    author: 'Мария Л.',
    rating: 5,
    text: 'Очень понравился подбор в коробке, всё нужное и без лишнего.',
    date: '08.10.2025'
  },
  {
    author: 'Игорь В.',
    rating: 5,
    text: 'Доставка быстрая, товары свежие, запахи натуральные.',
    date: '05.10.2025'
  },
  {
    author: 'Софья М.',
    rating: 4,
    text: 'В целом довольна, один товар показался менее удобным, но качество на высоте.',
    date: '02.10.2025'
  },
  {
    author: 'Павел Р.',
    rating: 5,
    text: 'Отличное соотношение цены и качества, всё продумано до мелочей.',
    date: '29.09.2025'
  },
  {
    author: 'Ольга К.',
    rating: 5,
    text: 'Нравится, что можно отказаться от лишней упаковки и всё реально эко.',
    date: '26.09.2025'
  },
  {
    author: 'Виктория З.',
    rating: 5,
    text: 'Красиво упаковано, приятно дарить и получать. Заказала ещё и подруге.',
    date: '22.09.2025'
  },
  {
    author: 'Алексей Н.',
    rating: 4,
    text: 'Пара позиций не совсем мои, но в остальном очень доволен сервисом.',
    date: '19.09.2025'
  },
  {
    author: 'Ксения Т.',
    rating: 5,
    text: 'Подписка — спасение, теперь дома всегда есть эко-средства для быта.',
    date: '15.09.2025'
  },
  {
    author: 'Роман Г.',
    rating: 5,
    text: 'Поддерживаю идею осознанного потребления, ваш сервис — хороший шаг в эту сторону.',
    date: '11.09.2025'
  },
  {
    author: 'Наталья Ч.',
    rating: 5,
    text: 'Всё аккуратно, удобно и понятно. Осталась только приятное впечатление.',
    date: '08.09.2025'
  }
];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/products"
            className="inline-flex items-center text-xs tracking-[0.25em] uppercase text-black/60 hover:text-black transition-colors"
          >
            <FaArrowLeft className="mr-2 text-[10px]" />
            Каталог
          </Link>

          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ФОТО */}
          <section className="space-y-6">
            <div className="border border-black/10 h-[620px] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-[500px] w-full object-contain"
              />
            </div>
          </section>

          {/* ИНФОРМАЦИЯ */}
          <section className="space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/50 mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(product.rating)
                          ? 'text-black'
                          : 'text-black/15'
                      }
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-black/60">
                  {product.reviews} отзывов
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold">
                  {product.price} ₽
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-black/60">
                  / мес
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-black/60">
                <span className="flex items-center gap-1">
                  <FaLeaf className="text-[11px]" />
                  В наличии: {product.stock} шт
                </span>
                <span className="flex items-center gap-1">
                  <FaTruck className="text-[11px]" />
                  {product.delivery}
                </span>
              </div>
            </div>

            {/* ДОБАВИТЬ В КОРОБКУ */}
            <div className="border border-black/10 p-6 space-y-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-black/60">
                    Ежемесячная коробка
                  </p>
                  <p className="text-sm text-black/70">
                    Добавьте этот товар в вашу подписку
                  </p>
                </div>
                <FaBox className="text-xl text-black/70" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-black/60">
                  Количество в месяц
                </span>
                <div className="flex gap-2">
                  {[1, 3, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuantity(num)}
                      className={`w-10 h-10 border text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center ${
                        quantity === num
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black/30 hover:border-black'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-black/10 px-4 py-3 flex items-center justify-between text-sm">
                <span className="text-black/60 uppercase tracking-[0.25em]">
                  Итого
                </span>
                <span className="text-lg font-semibold">
                  {totalPrice} ₽ / мес
                </span>
              </div>

              <button
                onClick={addToBox}
                className="w-full mt-2 border border-black bg-black text-white text-xs font-semibold tracking-[0.25em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors"
              >
                <FaCheckCircle className="text-[12px]" />
                Добавить в коробку
              </button>
            </div>

            <div className="border border-black/10 px-4 py-4 text-xs text-black/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <FaTruck className="text-[11px]" />
                  Доставка
                </span>
                <span>{product.delivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <FaShieldAlt className="text-[11px]" />
                  Возврат
                </span>
                <span>14 дней</span>
              </div>
            </div>
          </section>
        </div>

        {/* ОПИСАНИЕ + ХАРАКТЕРИСТИКИ */}
        <section className="grid lg:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-sm uppercase tracking-[0.3em] text-black/60 mb-3">
              Описание
            </h2>
            <div className="border border-black/10 p-6 text-sm leading-relaxed text-black/80">
              {product.description}
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.3ем] text-black/60 mb-3">
              Характеристики
            </h2>
            <div className="border border-black/10 p-6 text-sm space-y-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-black/60">{spec.name}</span>
                  <span className="font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.3em] text-black/60 mb-6 text-center">
            Преимущества
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {product.features.map((feature, i) => (
              <div
                key={i}
                className="border border-black/10 px-4 py-4 text-center"
              >
                <div className="text-[18px] mb-2">✓</div>
                <p className="text-black/80">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ОТЗЫВЫ */}
        <section className="mt-16 mb-12">
          <h2 className="text-sm uppercase tracking-[0.3em] text-black/60 mb-6 text-center">
            Отзывы ({product.reviews})
          </h2>
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="border border-black/10 px-6 py-4 text-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <FaStar
                        key={j}
                        className={
                          j < review.rating ? 'text-black' : 'text-black/15'
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-black/40 text-xs">{review.date}</span>
                </div>
                <p className="text-black/80 italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default ProductDetail;
