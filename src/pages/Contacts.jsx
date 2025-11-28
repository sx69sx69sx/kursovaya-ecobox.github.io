import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // тут будет отправка на сервер
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER / ХЛЕБНЫЕ КРОШКИ */}
      <header className="border-b border-black/10 bg-white/90 backdrop-blur">
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
              Контакты
            </span>
          </div>

          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Служба поддержки • ЭКОБОКС
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO + БЫСТРЫЕ КОНТАКТЫ */}
        <section className="border-b border-black/10 pb-8 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/50 mb-3">
                Мы на связи
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-3">
                Контакты и поддержка
              </h1>
              <p className="text-sm md:text-base text-black/60 max-w-xl">
                Пишите по любым вопросам: подписка, доставка, возвраты и подбор
                экотоваров. В рабочее время отвечаем в течение нескольких часов.
              </p>
            </div>

          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* ЛЕВАЯ КОЛОНКА — КОНТАКТЫ + КАРТА */}
          <div className="space-y-8">
            {/* КОНТАКТЫ */}
            <section className="border border-black px-6 py-6 text-sm">
              <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-6 flex items-center justify-between">
                <span>Свяжитесь с нами</span>
                <span className="text-[10px] tracking-[0.25em] text-black/40">
                  Ответим • 09:00–18:00
                </span>
              </h2>

              <div className="space-y-4">
                {/* Телефон */}
                <div className="border border-black/15 px-4 py-4 flex items-center gap-4 bg-black text-white">
                  <div className="w-10 h-10 border border-white flex items-center justify-center text-xs">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-1">
                      Телефон
                    </p>
                    <a
                      href="tel:+74951234567"
                      className="text-sm font-semibold hover:underline"
                    >
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-[11px] text-white/60">
                      Пн–Пт • 09:00–18:00
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="border border-black/15 px-4 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 border border-black/40 flex items-center justify-center text-xs">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@ecobox.ru"
                      className="text-sm font-semibold hover:underline"
                    >
                      hello@ecobox.ru
                    </a>
                    <p className="text-[11px] text-black/50">
                      Обычно отвечаем в течение 2 часов
                    </p>
                  </div>
                </div>

                {/* Адрес */}
                <div className="border border-black/15 px-4 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 border border-black/40 flex items-center justify-center text-xs">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                      Офис
                    </p>
                    <p className="text-sm font-semibold">
                      ул. Малая Дмитровка, 15, Москва, Россия, 127006
                    </p>
                    <p className="text-[11px] text-black/50">
                      м. Арбатская • 2 минуты пешком
                    </p>
                  </div>
                </div>

                {/* Время работы */}
                <div className="border border-black/15 px-4 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 border border-black/40 flex items-center justify-center text-xs">
                    <FaClock />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                      Время работы
                    </p>
                    <p className="text-sm">
                      Пн–Пт:{' '}
                      <span className="font-semibold">09:00–18:00</span>
                    </p>
                    <p className="text-sm">
                      Сб–Вс:{' '}
                      <span className="font-semibold">10:00–16:00</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* КАРТА */}
            <section className="border border-black px-6 py-6 text-sm">
              <h3 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4 flex items-center justify-between">
                <span>Наш офис на карте</span>
                <span className="text-[10px] tracking-[0.25em] text-black/40">
                  Google Maps
                </span>
              </h3>
              <div className="border border-black/20 h-56 md:h-72 w-full">
                <iframe
                  title="Офис EcoBox на карте"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d140.27282492415998!2d37.60507595052962!3d55.76952888862515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a3f9edfc433%3A0x55e2fb7e121f7a5a!2z0K3QutC-0LvQvtCz!5e0!3m2!1sru!2sde!4v1764206001765!5m2!1sru!2sde"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  style={{ border: 0, width: '100%', height: '100%' }}
                />
              </div>
            </section>
          </div>

          {/* ПРАВАЯ КОЛОНКА — ФОРМА + ТЕЛЕГРАМ */}
          <div className="space-y-8">
            {/* ФОРМА */}
            <section className="border border-black px-6 py-6 text-sm bg-black text-white">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/70 mb-6 text-center">
                Напишите нам
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <FaCheckCircle className="text-3xl mx-auto mb-3" />
                  <p className="text-sm font-semibold mb-1">
                    Сообщение отправлено
                  </p>
                  <p className="text-[13px] text-white/70">
                    Мы получили ваш запрос и свяжемся с вами в рабочее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Имя */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-white/30 bg-transparent px-3 py-3 text-sm focus:outline-none focus:border-white"
                      placeholder="Ваше имя"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-white/30 bg-transparent px-3 py-3 text-sm focus:outline-none focus:border-white"
                      placeholder="you@email.com"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-white/30 bg-transparent px-3 py-3 text-sm focus:outline-none focus:border-white"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  {/* Сообщение */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full border border-white/30 bg-transparent px-3 py-3 text-sm focus:outline-none focus:border-white resize-none"
                      placeholder="Расскажите, чем мы можем помочь"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-white bg-white text-black text-xs font-semibold tracking-[0.25em] uppercase py-4 flex items-center justify-center gap-2 hover:bg-transparent hover:text-white transition-colors"
                  >
                    <FaPaperPlane className="text-[12px]" />
                    <span>Отправить сообщение</span>
                  </button>

                  <p className="text-[11px] text-white/60 mt-3 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </form>
              )}
            </section>

            {/* ONLINE CHAT / TELEGRAM */}
            <section className="border border-black px-6 py-6 text-center text-sm bg-white">
              <p className="text-[20px] uppercase tracking-[0.3em] text-black/70 mb-5">
                ♡
              </p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-3">
                Быстрые сообщения
              </p>
              
              <h3 className="text-lg font-semibold mb-2">
                Онлайн-чат в Telegram
              </h3>
              <p className="text-[13px] text-black/70 mb-5 max-w-md mx-auto leading-relaxed">
                Нужна помощь в моменте? Напишите нам в Telegram — обычно отвечаем
                в течение нескольких минут в рабочее время.
              </p>

              <a
                href="https://t.me/sp1xy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-semibold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all"
              >
                Открыть чат в Telegram →
              </a>
            </section>
          </div>
        </div>

        {/* ОТЗЫВЫ О ПОДДЕРЖКЕ */}
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-6 text-center">
            Отзывы о поддержке
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              {
                author: 'Анна С.',
                rating: 5,
                text: 'Ответили за 15 минут, помогли с оформлением подписки.'
              },
              {
                author: 'Дмитрий К.',
                rating: 5,
                text: 'Быстро решили вопрос с возвратом. Всё чётко и спокойно.'
              },
              {
                author: 'Елена П.',
                rating: 5,
                text: 'Удобно, что можно написать и в мессенджер, и на почту.'
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="border border-black/10 px-5 py-5 text-center"
              >
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      className={
                        j < review.rating ? 'text-black' : 'text-black/15'
                      }
                    />
                  ))}
                </div>
                <p className="text-[13px] text-black/75 italic mb-3">
                  "{review.text}"
                </p>
                <p className="text-sm font-semibold">{review.author}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default Contacts;
