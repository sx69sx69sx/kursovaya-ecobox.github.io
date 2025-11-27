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
      icon: <FaTruck className="text-xl" />,
      priceLabel: 'от 250 ₽',
      time: '1–3 дня',
      description: 'Курьерская доставка и пункты выдачи по России'
    },
    {
      id: 'boxberry',
      name: 'Boxberry',
      icon: <FaBox className="text-xl" />,
      priceLabel: 'от 200 ₽',
      time: '2–4 дня',
      description: 'Пункты выдачи и курьерская доставка'
    },
    {
      id: 'courier',
      name: 'Курьер',
      icon: <FaBicycle className="text-xl" />,
      priceLabel: '350 ₽',
      time: '1 день',
      description: 'Доставка до двери в крупных городах'
    },
    {
      id: 'pickup',
      name: 'Самовывоз',
      icon: <FaMapMarkerAlt className="text-xl" />,
      priceLabel: '0 ₽',
      time: 'в день заказа',
      description: 'Из нашего офиса в Москве'
    }
  ];

  // Города с тарифами (примерная сетка)
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

    if (activeTab === 'cdek') return row.cdek ? `${row.cdek} ₽` : 'Недоступно';
    if (activeTab === 'boxberry')
      return row.boxberry ? `${row.boxberry} ₽` : 'Недоступно';
    if (activeTab === 'courier')
      return row.courier ? `${row.courier} ₽` : 'Недоступно';
    if (activeTab === 'pickup') return '0 ₽';

    return 'Недоступно';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER / ХЛЕБНЫЕ КРОШКИ */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <Link
              to="/"
              className="uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors flex items-center"
            >
              <span className="mr-2 text-[10px]">←</span>
              Главная
            </Link>
            <span className="text-black/30">/</span>
            <span className="uppercase tracking-[0.25em] text-black">
              Доставка
            </span>
          </div>

          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* HERO */}
        <section className="border-b border-black/10 pb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50 mb-3">
            Условия доставки
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-4">
            Доставка по всей России
          </h1>
          <p className="text-sm md:text-base text-black/60 max-w-2xl mx-auto">
            Мы отправляем ваши коробки и заказы по всей России с надёжными
            службами доставки. Прозрачные тарифы, отслеживание и минимальная
            упаковка без лишнего пластика.
          </p>
        </section>

        {/* СПОСОБЫ ДОСТАВКИ */}
        <section className="space-y-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60">
            Способы доставки
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {deliveryRates.map((rate, index) => (
              <motion.button
                key={rate.id}
                type="button"
                onClick={() => setActiveTab(rate.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={[
                  'border px-4 py-5 text-left text-sm',
                  activeTab === rate.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/15 hover:border-black'
                ].join(' ')}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-[0.3em]">
                    {rate.name}
                  </span>
                  {rate.icon}
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-base font-semibold">
                    {rate.priceLabel}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/60 md:text-black/60 md:group-hover:text-black/80">
                    {rate.time}
                  </span>
                </div>
                <p className="text-xs text-white/70 md:text-black/70">
                  {rate.description}
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* КАЛЬКУЛЯТОР */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60">
            Расчёт стоимости
          </h2>
          <div className="border border-black/15 px-6 py-6 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-black/60 mb-2">
                Город доставки
              </p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full md:w-64 border border-black/20 px-3 py-2 text-sm focus:outline-none focus:border-black"
              >
                <option value="">Выберите город</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 md:text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-black/60 mb-2">
                Ориентировочная стоимость
              </p>
              <div className="inline-flex items-center gap-2 text-xl font-semibold">
                <FaRubleSign className="text-sm" />
                <span>{calculatePrice()}</span>
              </div>
              <p className="text-[11px] text-black/50 mt-1">
                Точная стоимость будет показана при оформлении заказа.
              </p>
            </div>
          </div>
        </section>

        {/* ПОКРЫТИЕ / ГОРОДА */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60">
            Покрытие доставки
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-black/15 px-6 py-6 text-sm space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-black/60">
                  Город
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-black/60">
                  от, ₽
                </span>
              </div>
              {cities.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between border-t border-black/5 pt-2"
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-black/70">
                    СДЭК&nbsp;— {c.cdek} ₽
                    {c.boxberry && ` • Boxberry — ${c.boxberry} ₽`}
                    {c.courier && ` • Курьер — ${c.courier} ₽`}
                  </span>
                </div>
              ))}
              <p className="text-[11px] text-black/50 mt-2">
                В другие города доставляем по тарифам служб доставки.
              </p>
            </div>

            <div className="border border-black/15 px-6 py-6 flex flex-col justify-between text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-3">
                  География
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <FaMapMarkerAlt className="text-xl" />
                  <div>
                    <p className="text-sm font-semibold">
                      Более 200 городов России
                    </p>
                    <p className="text-[11px] text-black/60">
                      Сотни пунктов выдачи и курьерских маршрутов
                    </p>
                  </div>
                </div>
                <ul className="text-[11px] text-black/60 space-y-1">
                  <li>• Пункты выдачи в крупных и средних городах</li>
                  <li>• Курьерская доставка до двери</li>
                  <li>• Самовывоз из офиса в Москве</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА ДОСТАВКИ */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60">
            Преимущества
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            {[
              {
                icon: <FaShieldAlt className="text-lg" />,
                title: 'Эко-упаковка',
                desc: 'Минимум пластика, только перерабатываемые материалы.'
              },
              {
                icon: <FaCreditCard className="text-lg" />,
                title: 'Онлайн-оплата',
                desc: 'Безопасная оплата банковской картой.'
              },
              {
                icon: <FaClock className="text-lg" />,
                title: 'Отслеживание',
                desc: 'Трекинг отправления у службы доставки.'
              },
              {
                icon: <FaTruck className="text-lg" />,
                title: 'Страховка',
                desc: 'Посылки застрахованы по тарифам службы.'
              }
            ].map((b, i) => (
              <div
                key={i}
                className="border border-black/15 px-4 py-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {b.icon}
                  <p className="text-xs uppercase tracking-[0.25em]">
                    {b.title}
                  </p>
                </div>
                <p className="text-[12px] text-black/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60">
            Вопросы
          </h2>
          <div className="space-y-3 text-sm">
            {[
              {
                q: 'Сколько времени занимает доставка?',
                a: 'Обычно 1–3 дня по России, в отдалённых регионах — до 5–7 дней.'
              },
              {
                q: 'Сколько стоит доставка?',
                a: 'Стоимость зависит от города и способа доставки. Точные тарифы вы увидите при оформлении заказа.'
              },
              {
                q: 'Что делать, если посылка задерживается?',
                a: 'Свяжитесь с нами, мы запросим статус в службе доставки и поможем с розыском.'
              },
              {
                q: 'Есть ли бесплатная доставка?',
                a: 'Да, при заказе от 1500 ₽ доставка в большинство городов осуществляется бесплатно.'
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-black/10 px-5 py-4 flex flex-col gap-1"
              >
                <p className="text-xs uppercase tracking-[0.25em]">
                  {faq.q}
                </p>
                <p className="text-[13px] text-black/75">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-black/10 pt-10 pb-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-3">
            Готовы оформить заказ
          </p>
          <p className="text-sm text-black/70 mb-6">
            Соберите свою эко-коробку и оформите подписку — доставка подключится
            автоматически.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-10 py-4 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            Перейти в каталог
          </Link>
        </section>
      </main>
    </motion.div>
  );
};

export default Delivery;
