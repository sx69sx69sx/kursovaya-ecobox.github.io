import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUndo, FaBox, FaCreditCard, FaFileInvoice, FaPhone,  FaCamera, FaTruck, FaCheckCircle, FaTimesCircle, FaCalculator } from 'react-icons/fa';

const Returns = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orderNumber: '',
    reason: '',
    photo: null,
    comment: ''
  });
  const [calculatedRefund, setCalculatedRefund] = useState(0);

  // РЕАЛИСТИЧНЫЕ ПРАВИЛА ВОЗВРАТА
  const returnRules = [
    { condition: 'Не вскрытая упаковка', refund: '100%', days: '14 дней' },
    { condition: 'Брак/повреждение', refund: '100%', days: '30 дней' },
    { condition: 'Не подошел размер', refund: '100%', days: '14 дней' },
    { condition: 'Передумал(а)', refund: '90%', days: '7 дней' },
    { condition: 'Неправильный товар', refund: '100%', days: '14 дней' }
  ];

  // КАЛЬКУЛЯТОР ВОЗВРАТА
  const calculateRefund = (reason, orderAmount = 2000) => {
    const rule = returnRules.find(r => r.condition.includes(reason));
    if (!rule) return 0;
    const percent = rule.refund === '100%' ? 1 : 0.9;
    return Math.round(orderAmount * percent);
  };

  // ШАГИ ВОЗВРАТА
  const returnSteps = [
    { number: 1, title: 'Заполните форму', icon: <FaFileInvoice className="text-3xl text-emerald-500" />, desc: 'Укажите номер заказа и причину' },
    { number: 2, title: 'Отправьте фото', icon: <FaCamera className="text-3xl text-emerald-500" />, desc: 'Загрузите 2-3 фото товара' },
    { number: 3, title: 'Получите этикетку', icon: <FaTruck className="text-3xl text-emerald-500" />, desc: 'Скачайте PDF-лейбл бесплатно' },
    { number: 4, title: 'Отправьте посылку', icon: <FaBox className="text-3xl text-emerald-500" />, desc: 'СДЭК до пункта приема' },
    { number: 5, title: 'Получите возврат', icon: <FaCreditCard className="text-3xl text-emerald-500" />, desc: 'Деньги 3-5 дней на карту' }
  ];

  // ОБРАБОТКА ФОРМЫ
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleReasonChange = (reason) => {
    setFormData({ ...formData, reason });
    setCalculatedRefund(calculateRefund(reason));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
    >
      {/* HEADER */}
      <nav className="py-4 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-700 transition">
              <span className="mr-2">←</span> Главная
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-emerald-800">Возвраты</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            Возврат и обмен
          </motion.h1>
          <motion.p 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-6"
          >
            14 дней • Бесплатная этикетка • Деньги 3-5 дней
          </motion.p>
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-6 text-3xl"
          >
            <FaUndo className="text-white" />
            <FaCheckCircle className="text-white" />
          </motion.div>
        </div>
      </section>

      {/* RETURN RULES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Условия возврата</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {returnRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-emerald-50 p-4 rounded-xl text-center"
              >
                <div className="font-bold text-lg text-emerald-800 mb-2">{rule.refund}</div>
                <p className="text-sm text-emerald-700 mb-1">{rule.condition}</p>
                <p className="text-xs text-emerald-600">{rule.days}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-8">
            <FaCalculator className="inline mr-2" /> Калькулятор возврата
          </h2>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">Сумма заказа</label>
                <input
                  type="number"
                  defaultValue="2000"
                  className="w-full p-3 border border-emerald-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-emerald-800 font-semibold mb-2">Причина возврата</label>
                <select
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="w-full p-3 border border-emerald-200 rounded-lg"
                >
                  <option value="">Выберите причину</option>
                  {returnRules.map((rule, i) => (
                    <option key={i} value={rule.condition}>{rule.condition}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {calculatedRefund} ₽
              </div>
              <p className="text-emerald-700">Вы получите возврат</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RETURN FORM */}
      {step === 1 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Оформить возврат</h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-emerald-800 font-semibold mb-2">Номер заказа *</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="ECOB-2025-001234"
                    required
                    className="w-full p-3 border border-emerald-200 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-emerald-800 font-semibold mb-2">Причина возврата *</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    required
                    className="w-full p-3 border border-emerald-200 rounded-lg"
                  >
                    <option value="">Выберите причину</option>
                    {returnRules.map((rule, i) => (
                      <option key={i} value={rule.condition}>{rule.condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-emerald-800 font-semibold mb-2">Фото товара</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                    accept="image/*"
                    className="w-full p-3 border border-emerald-200 rounded-lg"
                  />
                  <p className="text-sm text-emerald-600 mt-1">2-3 четких фото (упаковка + дефект)</p>
                </div>
                
                <div>
                  <label className="block text-emerald-800 font-semibold mb-2">Комментарий</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    rows="3"
                    placeholder="Опишите проблему подробно..."
                    className="w-full p-3 border border-emerald-200 rounded-lg"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700"
                >
                  Оформить возврат
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* SUCCESS STEP */}
      {step === 2 && (
        <section className="py-20 bg-emerald-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">Заявка принята!</h2>
            <p className="text-xl text-emerald-700 mb-8">Этикетка отправлена на email</p>
            <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
              <p className="font-semibold">Номер заявки: <span className="text-emerald-600">#RET-2025-789</span></p>
              <p className="text-sm text-emerald-600 mt-2">Срок возврата: 3 дня</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold"
            >
              Новый возврат
            </button>
          </div>
        </section>
      )}

      {/* STEPS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">5 простых шагов</h2>
          <div className="grid md:grid-cols-5 gap-8">
            {returnSteps.map((s, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{s.number}</span>
                </div>
                <div className="mb-2">{s.icon}</div>
                <h3 className="font-bold text-emerald-800 mb-2">{s.title}</h3>
                <p className="text-emerald-700 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-6">
            {[
              { q: 'Сколько времени на возврат?', a: '14 дней с момента получения заказа' },
              { q: 'Кто оплачивает обратную доставку?', a: 'Брак — бесплатно. Передумали — 250 ₽ (СДЭК)' },
              { q: 'Когда придут деньги?', a: '3-5 банковских дней после получения посылки' },
              { q: 'Можно вернуть подписку?', a: 'Только первый месяц. Дальше — пропуск месяца' }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <h3 className="font-semibold text-emerald-800 mb-2">{faq.q}</h3>
                <p className="text-emerald-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Нужна помощь?</h2>
          <p className="text-xl mb-8">Позвоните нам за 5 минут</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+74951234567" className="flex items-center justify-center space-x-2 bg-white text-emerald-800 px-8 py-4 rounded-full font-bold">
              <FaPhone />
              <span>+7 (495) 123-45-67</span>
            </a>
            <Link to="/contacts" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold">
              Написать в чат
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Returns;