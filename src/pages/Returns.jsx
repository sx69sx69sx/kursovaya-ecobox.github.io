import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUndo,
  FaBox,
  FaCreditCard,
  FaFileInvoice,
  FaPhone,
  FaCamera,
  FaTruck,
  FaCheckCircle,
  FaCalculator
} from 'react-icons/fa';

const returnRules = [
  { condition: 'Не вскрытая упаковка', refund: '100%', days: '14 дней' },
  { condition: 'Брак/повреждение', refund: '100%', days: '30 дней' },
  { condition: 'Не подошел размер', refund: '100%', days: '14 дней' },
  { condition: 'Передумал(а)', refund: '90%', days: '7 дней' },
  { condition: 'Неправильный товар', refund: '100%', days: '14 дней' }
];

const returnSteps = [
  {
    number: 1,
    title: 'Заполните форму',
    icon: <FaFileInvoice className="text-base" />,
    desc: 'Укажите номер заказа и причину.'
  },
  {
    number: 2,
    title: 'Прикрепите фото',
    icon: <FaCamera className="text-base" />,
    desc: 'Загрузите 2–3 фото товара и упаковки.'
  },
  {
    number: 3,
    title: 'Получите этикетку',
    icon: <FaTruck className="text-base" />,
    desc: 'Мы отправим PDF-лейбл для отправки.'
  },
  {
    number: 4,
    title: 'Отправьте посылку',
    icon: <FaBox className="text-base" />,
    desc: 'Передайте возврат в пункт приёма.'
  },
  {
    number: 5,
    title: 'Получите деньги',
    icon: <FaCreditCard className="text-base" />,
    desc: 'Возврат на карту в течение нескольких дней.'
  }
];

const calculateRefund = (reason, orderAmount) => {
  if (!reason || !orderAmount) return 0;
  const rule = returnRules.find((r) => r.condition === reason);
  if (!rule) return 0;
  const percent = parseInt(rule.refund, 10) || 0;
  return Math.round((orderAmount * percent) / 100);
};

const Returns = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orderNumber: '',
    reason: '',
    photo: null,
    comment: ''
  });
  const [orderAmount, setOrderAmount] = useState(2000);
  const [calculatedRefund, setCalculatedRefund] = useState(0);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({ ...prev, photo: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReasonChange = (value) => {
    setFormData((prev) => ({ ...prev, reason: value }));
    setCalculatedRefund(calculateRefund(value, orderAmount));
  };

  const handleAmountChange = (e) => {
    const value = Number(e.target.value) || 0;
    setOrderAmount(value);
    setCalculatedRefund(calculateRefund(formData.reason, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь могла бы быть отправка на сервер
    setStep(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER */}
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
              Возвраты
            </span>
          </div>
          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="border-b border-black/10 pb-10 mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50 mb-3">
            Правила возврата и обмена
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-3">
            Возврат и обмен
          </h1>
          <p className="text-sm md:text-base text-black/60 max-w-2xl mx-auto mb-4">
            Если что-то пошло не так, мы постараемся решить вопрос максимально
            просто. Ниже — условия, расчёт возврата и форма заявки.
          </p>
          <div className="flex items-center justify-center gap-3 text-xl">
            <FaUndo />
            <FaCheckCircle />
          </div>
        </section>

        {/* УСЛОВИЯ ВОЗВРАТА */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4">
            Условия возврата
          </h2>
          <div className="grid md:grid-cols-5 gap-4 text-sm">
            {returnRules.map((rule, index) => (
              <div
                key={index}
                className="border border-black/10 px-4 py-4 text-center"
              >
                <div className="text-lg font-semibold mb-1">{rule.refund}</div>
                <p className="text-[13px] text-black/80 mb-1">
                  {rule.condition}
                </p>
                <p className="text-[11px] text-black/50">{rule.days}</p>
              </div>
            ))}
          </div>
        </section>

        {/* КАЛЬКУЛЯТОР */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4 flex items-center gap-2">
            <FaCalculator className="text-[11px]" />
            Калькулятор возврата
          </h2>
          <div className="border border-black/10 px-6 py-6 text-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Сумма заказа
                </p>
                <input
                  type="number"
                  min="0"
                  value={orderAmount}
                  onChange={handleAmountChange}
                  className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Причина возврата
                </p>
                <select
                  value={formData.reason}
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black"
                >
                  <option value="">Выберите причину</option>
                  {returnRules.map((rule, i) => (
                    <option key={i} value={rule.condition}>
                      {rule.condition}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                Ориентировочная сумма возврата
              </p>
              <div className="text-2xl font-semibold mb-1">
                {calculatedRefund} ₽
              </div>
              <p className="text-[11px] text-black/50">
                Точная сумма будет указана в подтверждении заявки.
              </p>
            </div>
          </div>
        </section>

        {/* ФОРМА ВОЗВРАТА / ШАГ 1 */}
        {step === 1 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4 text-left">
              Оформить возврат
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-black/10 px-6 py-6 text-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                    Номер заказа *
                  </label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleFormChange}
                    required
                    placeholder="ECOB-2025-001234"
                    className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                    Причина возврата *
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={(e) => {
                      handleFormChange(e);
                      handleReasonChange(e.target.value);
                    }}
                    required
                    className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black"
                  >
                    <option value="">Выберите причину</option>
                    {returnRules.map((rule, i) => (
                      <option key={i} value={rule.condition}>
                        {rule.condition}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                    Фото товара
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFormChange}
                    className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black"
                  />
                  <p className="text-[11px] text-black/50 mt-1">
                    Желательно приложить 2–3 чётких фото товара и упаковки.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                    Комментарий
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                    rows={4}
                    placeholder="Опишите проблему и желаемое решение."
                    className="w-full border border-black/20 px-3 py-3 text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border border-black bg-black text-white text-xs font-semibold uppercase tracking-[0.25em] py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                  <FaUndo className="text-[12px]" />
                  Отправить заявку на возврат
                </button>
              </form>
            </motion.div>
          </section>
        )}

        {/* ШАГ 2 — ПОДТВЕРЖДЕНИЕ */}
        {step === 2 && (
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-black/10 px-6 py-10 text-center text-sm"
            >
              <div className="text-3xl mb-3">✓</div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-3">
                Заявка отправлена
              </p>
              <p className="text-sm text-black/75 mb-4">
                Мы проверим данные и отправим этикетку для возврата на ваш
                email в течение рабочего дня.
              </p>
              <div className="border border-black/10 px-4 py-4 max-w-sm mx-auto mb-6 text-left text-[13px]">
                <p className="mb-1">
                  Номер заказа: <span className="font-semibold">{formData.orderNumber || '—'}</span>
                </p>
                <p className="mb-1">
                  Причина: <span className="font-semibold">{formData.reason || '—'}</span>
                </p>
                <p className="text-black/60 text-[11px]">
                  Если вы указали неверные данные, напишите нам в поддержку.
                </p>
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    orderNumber: '',
                    reason: '',
                    photo: null,
                    comment: ''
                  });
                }}
                className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
              >
                Оформить ещё один возврат
              </button>
            </motion.div>
          </section>
        )}

        {/* 5 ШАГОВ */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4 text-left">
            Как это работает
          </h2>
          <div className="grid md:grid-cols-5 gap-4 text-xs">
            {returnSteps.map((s, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-black/10 px-4 py-4 text-center"
              >
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="text-[11px] font-semibold">{s.number}</span>
                  {s.icon}
                </div>
                <p className="uppercase tracking-[0.2em] text-[10px] mb-2">
                  {s.title}
                </p>
                <p className="text-[11px] text-black/70">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* КОРОТКИЙ FAQ */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/60 mb-4">
            Частые вопросы
          </h2>
          <div className="space-y-3 text-sm">
            {[
              {
                q: 'Сколько времени у меня есть на возврат?',
                a: 'Обычно 14 дней с момента получения заказа. Для бракованных товаров срок может быть увеличен.'
              },
              {
                q: 'Кто оплачивает обратную доставку?',
                a: 'Если подтверждён производственный брак — обратную доставку оплачиваем мы. В остальных случаях — покупатель.'
              },
              {
                q: 'Когда придут деньги?',
                a: 'После получения и проверки возврата мы оформим возврат средств на карту. Срок зачисления зависит от банка (в среднем до 5 рабочих дней).'
              },
              {
                q: 'Можно ли вернуть подписку?',
                a: 'Отмена подписки действует на будущие списания. Уже доставленные коробки возвращаются по общим правилам магазина.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="border border-black/10 px-5 py-4 text-[13px]"
              >
                <p className="font-semibold mb-1">{item.q}</p>
                <p className="text-black/75">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-black/10 pt-10 pb-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-3">
            Нужна помощь
          </p>
          <p className="text-sm text-black/70 mb-5">
            Если у вас нестандартная ситуация, напишите в поддержку или
            позвоните нам — разберёмся и подберём решение.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+74951234567"
              className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
            >
              <FaPhone className="text-[11px] mr-2" />
              +7 (495) 123-45-67
            </a>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
            >
              Написать в поддержку
            </Link>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default Returns;
