import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaTruck,
  FaBox,
  FaClock,
  FaRubleSign,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCreditCard,
  FaBicycle
} from 'react-icons/fa';

const Delivery = () => {
  const [activeTab, setActiveTab] = useState('cdek');
  const [city, setCity] = useState('');

  // Способы доставки
  const deliveryRates = [
    {
      id: 'cdek',
      name: 'СДЭК',
      icon: <FaTruck className="text-base" />,
      priceLabel: 'от 250 ₽',
      time: '1–3 дня',
      description: 'Курьер и пункты выдачи по всей России.'
    },
    {
      id: 'boxberry',
      name: 'Boxberry',
      icon: <FaBox className="text-base" />,
      priceLabel: 'от 200 ₽',
      time: '2–4 дня',
      description: 'Пункты выдачи и доставка до двери.'
    },
    {
      id: 'courier',
      name: 'Курьер',
      icon: <FaBicycle className="text-base" />,
      priceLabel: '350 ₽',
      time: '1 день',
      description: 'Доставка до двери в крупных городах.'
    },
    {
      id: 'pickup',
      name: 'Самовывоз',
      icon: <FaMapMarkerAlt className="text-base" />,
      priceLabel: '0 ₽',
      time: 'в день заказа',
      description: 'Забор из нашего офиса в Москве.'
    }
  ];

  // Примеры городов
  const cities = [
    { name: 'Москва', cdek: 250, boxberry: 200, courier: 350 },
    { name: 'Санкт-Петербург', cdek: 300, boxberry: 220, courier: 350 },
    { name: 'Екатеринбург', cdek: 350, boxberry: 250 },
    { name: 'Новосибирск', cdek: 400, boxberry: 280 },
    { name: 'Казань', cdek: 320, boxberry: 240 }
  ];

  const calculatePrice = () => {
    if (!city) return 'Выберите город';
    const row = cities.find((c) => c.name === city);
    if (!row) return 'Недоступно';

    if (activeTab === 'cdek') return row.cdek ? `${row.cdek} ` : 'Недоступно';
    if (activeTab === 'boxberry') return row.boxberry ? `${row.boxberry} ` : 'Недоступно';
    if (activeTab === 'courier') return row.courier ? `${row.courier} ` : 'Недоступно';
    if (activeTab === 'pickup') return '0';

    return 'Недоступно';
  };

  const SectionLabel = ({ index, children }) => (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/60">
        {index.toString().padStart(2, '0')}
      </span>
      <span className="flex-1 h-px bg-black" />
      <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em]">
        {children}
      </h2>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER / КРОШКИ */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px]">
            <Link
              to="/"
              className="uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors flex items-center"
            >
              <span className="mr-2 text-[9px]">←</span>
              Главная
            </Link>
            <span className="text-black/30">/</span>
            <span className="uppercase tracking-[0.25em] text-black">
              Доставка
            </span>
          </div>
          <div className="hidden md:block text-[11px] uppercase tracking-[0.32em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-18">
        {/* HERO */}
        <section className="mt-10 mb-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black text-white border border-black overflow-hidden"
          >
            <div className="grid md:grid-cols-[3fr,2fr]">
              {/* ЛЕВАЯ ЧАСТЬ */}
              <div className="px-8 lg:px-10 py-10 lg:py-12 border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-4">
                  Условия доставки
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-5">
                  Доставка по всей России
                </h1>
                <p className="text-sm md:text-[15px] text-white/75 max-w-xl mb-6">
                  Отправляем коробки и заказы в более чем 200 городов.
                  Используем минимум упаковки и работаем только с надёжными
                  службами доставки.
                </p>

                <div className="inline-flex items-center gap-3 border border-white/25 px-4 py-2 text-[11px] uppercase tracking-[0.25em]">
                  <span className="bg-white text-black px-3 py-1 text-[10px] font-semibold">
                    Бесплатно
                  </span>
                  <span className="text-white/75">доставка от 5000 ₽</span>
                </div>
              </div>

              {/* ПРАВАЯ ЧАСТЬ — ЦИФРЫ */}
              <div className="px-8 lg:px-10 py-8 lg:py-10 bg-black/90">
                <div className="grid grid-rows-3 gap-5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/12 pb-4">
                    <span className="uppercase tracking-[0.25em] text-white/60">
                      Срок
                    </span>
                    <span className="text-2xl font-semibold">1–3 дня</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/12 pb-4">
                    <span className="uppercase tracking-[0.25em] text-white/60">
                      Города
                    </span>
                    <span className="text-2xl font-semibold">200+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.25em] text-white/60">
                      Пункты выдачи
                    </span>
                    <span className="text-2xl font-semibold">1500+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* СПОСОБЫ ДОСТАВКИ */}
        <section className="mb-16 space-y-6">
          <SectionLabel index={1}>Способы доставки</SectionLabel>

          <div className="flex items-end justify-between gap-4">
            <p className="text-[13px] text-black/70 max-w-md">
              Выберите службу, чтобы увидеть примерные тарифы и сроки
              доставки для вашего города.
            </p>
            <p className="hidden md:block text-[11px] text-black/45">
              Способ доставки можно поменять позже в корзине.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {deliveryRates.map((rate, index) => {
              const isActive = activeTab === rate.id;
              return (
                <motion.button
                  key={rate.id}
                  type="button"
                  onClick={() => setActiveTab(rate.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={[
                    'border text-left px-5 py-5 flex flex-col gap-3',
                    'transition-all duration-200',
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/12 hover:border-black/60'
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.25em]">
                      {rate.name}
                    </span>
                    {rate.icon}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-semibold">
                      {rate.priceLabel}
                    </span>
                    <span
                      className={
                        'text-[11px] uppercase tracking-[0.25em]' +
                        ' ' +
                        (isActive ? 'text-white/70' : 'text-black/50')
                      }
                    >
                      {rate.time}
                    </span>
                  </div>
                  <p
                    className={
                      'text-[12px] leading-relaxed' +
                      ' ' +
                      (isActive ? 'text-white/75' : 'text-black/65')
                    }
                  >
                    {rate.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* КАЛЬКУЛЯТОР СТОИМОСТИ — ЧЁРНЫЙ БЛОК */}
        <section className="mb-16 space-y-6">
          <SectionLabel index={2}>Расчёт стоимости</SectionLabel>

          <div className="border border-black bg-black text-white overflow-hidden">
            <div className="grid md:grid-cols-[2fr,1.6fr]">
              {/* Город */}
              <div className="px-6 lg:px-8 py-7 border-b md:border-b-0 md:border-r border-white/15">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                  Город доставки
                </p>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full md:w-80 border border-white/40 bg-white text-black px-3 py-2.5 text-sm focus:outline-none focus:border-white"
                >
                  <option value="">Выберите город</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-white/60 mt-3 max-w-md">
                  Для других населённых пунктов стоимость рассчитывается по
                  тарифам выбранной службы доставки.
                </p>
              </div>

              {/* Цена */}
              <div className="px-6 lg:px-8 py-7 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                    Ориентировочная стоимость
                  </p>
                  <div className="inline-flex items-center gap-2 text-2xl font-semibold">
                    <FaRubleSign className="text-sm" />
                    <span>{calculatePrice()}</span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-2 max-w-md">
                    Итоговая сумма будет рассчитана автоматически на шаге
                    оформления заказа.
                  </p>
                </div>

                <div className="mt-5 text-[11px] text-white/70 flex items-center gap-2">
                  <FaClock className="text-xs" />
                  <span>
                    В среднем 1–3 дня по России, для отдалённых регионов — до
                    5–7 дней.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ПРИМЕРЫ ТАРИФОВ / ГЕОГРАФИЯ */}
        <section className="mb-16 space-y-6">
          <SectionLabel index={3}>Примеры тарифов</SectionLabel>

          <div className="grid md:grid-cols-2 gap-8 text-sm">
            {/* Таблица городов */}
            <div className="border border-black/12 overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between text-[14px] uppercase tracking-[0.25em] font-bold text-white border-b border-black/10 bg-black">
                <span>Город</span>
                <span>от, ₽</span>
              </div>
              <div className="px-6 py-4 space-y-3">
                {cities.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-start justify-between border-t border-black/5 pt-3"
                  >
                    <span className="text-sm">{c.name}</span>
                    <span className="text-[11px] text-black/70 text-right">
                      СДЭК — {c.cdek} ₽
                      {c.boxberry && <span> • Boxberry — {c.boxberry} ₽</span>}
                      {c.courier && <span> • Курьер — {c.courier} ₽</span>}
                    </span>
                  </div>
                ))}
                <p className="text-[11px] text-black/50 mt-3">
                  Для других городов стоимость зависит от зоны обслуживания
                  конкретной службы.
                </p>
              </div>
            </div>

            {/* География */}
            <div className="border border-black/12 overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-black/10 bg-black">
                <p className="text-[14px] uppercase tracking-[0.25em] text-white font-bold">
                  География
                </p>
              </div>
              <div className="px-6 py-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-base" />
                    <div>
                      <p className="text-sm font-semibold">
                        Более 200 городов России
                      </p>
                      <p className="text-[11px] text-black/60">
                        Крупные города, областные центры и часть районных
                        городов.
                      </p>
                    </div>
                  </div>
                  <ul className="text-[11px] text-black/65 space-y-1">
                    <li>• Пункты выдачи в крупных и средних городах</li>
                    <li>• Курьерская доставка до двери</li>
                    <li>• Самовывоз из офиса в Москве</li>
                  </ul>
                </div>
                <div className="mt-4 text-[11px] text-black/55">
                  При оформлении подписки система автоматически предложит
                  доступные способы доставки по вашему адресу.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА ДОСТАВКИ */}
        <section className="mb-16 space-y-6">
          <SectionLabel index={4}>Как мы отправляем</SectionLabel>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            {[
              {
                icon: <FaShieldAlt className="text-sm" />,
                title: 'Эко-упаковка',
                desc: 'Крафт-коробка и бумажный наполнитель, без лишнего пластика.'
              },
              {
                icon: <FaCreditCard className="text-sm" />,
                title: 'Безопасная оплата',
                desc: 'Оплата картой, шифрование и сертифицированные платёжные шлюзы.'
              },
              {
                icon: <FaClock className="text-sm" />,
                title: 'Трекинг',
                desc: 'Отслеживание отправления на сайте партнёрской службы доставки.'
              },
              {
                icon: <FaTruck className="text-sm" />,
                title: 'Страховка',
                desc: 'Посылки застрахованы по базовым тарифам СДЭК и Boxberry.'
              }
            ].map((b, i) => (
              <div
                key={i}
                className="border border-black/12 px-5 py-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {b.icon}
                  <p className="text-[11px] uppercase tracking-[0.25em]">
                    {b.title}
                  </p>
                </div>
                <p className="text-[12px] text-black/70 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ КРАТКО */}
        <section className="mb-18 space-y-6">
          <SectionLabel index={5}>Вопросы по доставке</SectionLabel>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {[
              {
                q: 'Сколько времени занимает доставка?',
                a: 'В среднем 1–3 дня по России. Для отдалённых регионов — до 5–7 дней, в зависимости от графика службы доставки.'
              },
              {
                q: 'Сколько стоит доставка?',
                a: 'Стоимость зависит от города, веса и способа доставки. Примеры тарифов — выше, точная сумма будет рассчитана в корзине.'
              },
              {
                q: 'Что делать, если посылка задерживается?',
                a: 'Напишите нам или свяжитесь по телефону — запросим статус у службы доставки и поможем с розыском.'
              },
              {
                q: 'Есть ли бесплатная доставка?',
                a: 'Да. Для заказов от 1500 ₽ доставка в большинство городов осуществляется бесплатно стандартным способом.'
              }
            ].map((faq, i) => (
              <div key={i} className="border border-black/12 px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.25em] mb-1">
                  {faq.q}
                </p>
                <p className="text-[13px] text-black/75 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-black/10 pt-10 pb-8 text-center">
          <p className="text-[14px] font-bold uppercase tracking-[0.3em] text-black mb-3">
            Готовы оформить заказ?
          </p>
          <p className="text-sm text-black/70 mb-6">
            Соберите свою коробку, выберите удобный способ доставки — остальное
            мы сделаем за вас.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-10 py-4 border border-black text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            Перейти в каталог
          </Link>
        </section>
      </main>
    </motion.div>
  );
};

export default Delivery;
