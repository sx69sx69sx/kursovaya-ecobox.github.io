import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCommentDots, 
  FaPaperPlane,
  FaMap,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

const Contacts = () => {
  // СОСТОЯНИЯ ФОРМЫ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ОБРАБОТКА ФОРМЫ
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка на сервер
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // ОБНОВЛЕНИЕ ФОРМЫ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-emerald-50"
    >
      {/* HEADER */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Контакты</h1>
          <p className="text-xl md:text-2xl">Мы всегда на связи</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* ЛЕВАЯ КОЛОНКА - КОНТАКТЫ + КАРТА */}
          <div className="space-y-8">
            
            {/* КОНТАКТНАЯ ИНФОРМАЦИЯ */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Свяжитесь с нами</h2>
              
              <div className="space-y-6">
                {/* ТЕЛЕФОН */}
                <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <FaPhone className="text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Телефон</h3>
                    <a href="tel:+74951234567" className="text-emerald-600 hover:text-emerald-700 font-bold">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-sm text-emerald-500">Пн-Пт: 9:00-18:00</p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <FaEnvelope className="text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Email</h3>
                    <a href="mailto:hello@ecobox.ru" className="text-emerald-600 hover:text-emerald-700 font-bold">
                      hello@ecobox.ru
                    </a>
                    <p className="text-sm text-emerald-500">Ответ в течение 2 часов</p>
                  </div>
                </div>

                {/* АДРЕС */}
                <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <FaMapMarkerAlt className="text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Адрес</h3>
                    <p className="text-emerald-600 font-bold">Москва, ул. Эко, 1</p>
                    <p className="text-sm text-emerald-500">м. Арбатская, 2 мин пешком</p>
                  </div>
                </div>

                {/* ВРЕМЯ РАБОТЫ */}
                <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                  <div className="bg-emerald-100 p-3 rounded-xl">
                    <FaClock className="text-2xl text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800">Время работы</h3>
                    <div className="text-emerald-600">
                      <p>Пн-Пт: <span className="font-bold">9:00-18:00</span></p>
                      <p>Сб-Вс: <span className="font-bold">10:00-16:00</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТА */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Наш офис</h3>
              <div className="bg-emerald-100 h-64 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FaMap className="text-6xl text-emerald-600 mx-auto mb-4" />
                  <p className="text-emerald-700">Интерактивная карта</p>
                  <p className="text-sm text-emerald-500">Яндекс.Карты / Google Maps</p>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА - ФОРМА */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Напишите нам</h2>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <FaCheckCircle className="text-6xl text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">Спасибо!</h3>
                  <p className="text-emerald-600">Мы получили ваше сообщение и свяжемся в течение 2 часов</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ИМЯ */}
                  <div>
                    <label className="block text-emerald-700 font-semibold mb-2">Имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ваше имя"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-emerald-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* ТЕЛЕФОН */}
                  <div>
                    <label className="block text-emerald-700 font-semibold mb-2">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  {/* СООБЩЕНИЕ */}
                  <div>
                    <label className="block text-emerald-700 font-semibold mb-2">Сообщение *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full p-4 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="Расскажите, чем можем помочь..."
                    ></textarea>
                  </div>

                  {/* КНОПКА */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-all"
                  >
                    <FaPaperPlane />
                    <span>Отправить сообщение</span>
                  </button>
                </form>
              )}
            </div>

            {/* ОНЛАЙН ЧАТ */}
            <div className="bg-emerald-600 text-white rounded-2xl p-6 mt-8 text-center">
              <FaCommentDots className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Онлайн чат</h3>
              <p className="mb-4">Помощь в реальном времени</p>
              <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-bold hover:bg-emerald-50">
                Начать чат
              </button>
            </div>
          </div>
        </div>

        {/* ОТЗЫВЫ О СЕРВИСЕ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Отзывы о поддержке</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { author: 'Анна С.', rating: 5, text: 'Ответили за 15 минут! Очень вежливо.' },
              { author: 'Дмитрий К.', rating: 5, text: 'Помогли с возвратом. Профессионально.' },
              { author: 'Елена П.', rating: 5, text: 'Чат работает 24/7. Удобно!' }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-emerald-700 italic">"{review.text}"</p>
                <p className="font-semibold text-emerald-800 mt-3">{review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contacts;