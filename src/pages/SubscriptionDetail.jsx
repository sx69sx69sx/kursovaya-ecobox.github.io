import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FaBox,
  FaCrown,
  FaCheckCircle,
  FaTruck,
  FaCreditCard,
  FaShieldAlt,
  FaArrowLeft,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaLock,
  FaUser,
  FaPhone,
  FaCheck
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PLANS = {
  basic: {
    id: 'basic',
    title: 'Базовая',
    price: 990,
    originalPrice: 1490,
    features: [
      '5 эко-товаров в месяц',
      'Бесплатная доставка',
      'Эко-упаковка',
      'Пауза / отмена в любой момент',
      'Поддержка'
    ],
    badge: 'СТАРТ'
  },
  popular: {
    id: 'popular',
    title: 'Популярная',
    price: 1611,
    originalPrice: 2290,
    features: [
      '8 отобранных эко-товаров',
      'Бесплатная доставка',
      'Эко-упаковка',
      'Бонусный продукт в каждой коробке',
      'Пауза / отмена',
      'Поддержка',
      'Персональные рекомендации'
    ],
    badge: 'ХИТ'
  },
  premium: {
    id: 'premium',
    title: 'Премиум',
    price: 1990,
    originalPrice: 2990,
    features: [
      '12 премиальных эко-товаров',
      'Бесплатная ч/б-упаковка',
      '2 бонусных продукта',
      'Пауза / отмена',
      'Приоритетная поддержка',
      'Персональные рекомендации',
      'Персональный менеджер',
      'Подарок на день рождения'
    ],
    badge: 'PREMIUM'
  }
};

const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Волгоград'
];

const SubscriptionDetail = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const selectedPlan = PLANS[plan] || PLANS.popular;

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const subscriptionPrice = totalItems >= 5 ? totalPrice : selectedPlan.price;

  const [step, setStep] = useState(1); // 1 — адрес, 2 — оплата
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // единый источник правды для ошибок
  const getFieldError = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Минимум 2 символа' : '';
      case 'phone':
        return !/^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
          value.replace(/\D/g, '')
        )
          ? 'Неверный формат телефона'
          : '';
      case 'city':
        return !value ? 'Выберите город' : '';
      case 'address':
        return value.trim().length < 5 ? 'Укажите полный адрес' : '';
      case 'cardNumber':
        return value.replace(/\s/g, '').length !== 16 ? '16 цифр карты' : '';
      case 'expiry':
        return !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
          ? 'Формат MM/YY'
          : '';
      case 'cvv':
        return !/^\d{3}$/.test(value) ? '3 цифры CVV' : '';
      default:
        return '';
    }
  };

  const validateFields = (fieldNames) => {
    const newErrors = {};
    fieldNames.forEach((field) => {
      const error = getFieldError(field, formData[field]);
      newErrors[field] = error;
    });

    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));

    const isValid = Object.values(newErrors).every((err) => !err);
    return { isValid, newErrors };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'phone') {
      formatted = value
        .replace(/[^\d+]/g, '')
        .replace(
          /(\+?7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
          (match, p1, p2, p3, p4, p5) =>
            (p1 || '+7') +
            (p2 ? ' (' + p2 : '') +
            (p2 ? ')' : '') +
            (p3 ? ' ' + p3 : '') +
            (p4 ? '-' + p4 : '') +
            (p5 ? '-' + p5 : '')
        )
        .slice(0, 20);
    } else if (name === 'cardNumber') {
      formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/, '$1 $2 $3 $4')
        .trim()
        .slice(0, 19);
    } else if (name === 'expiry') {
      formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{0,2})(\d{0,2})/, '$1/$2')
        .slice(0, 5);
    } else if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formatted
    }));

    const error = getFieldError(name, formatted);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const validateCurrentStep = () => {
    const fieldsStep1 = ['name', 'phone', 'city', 'address'];
    const fieldsStep2 = ['cardNumber', 'expiry', 'cvv'];
    const fields = step === 1 ? fieldsStep1 : fieldsStep2;

    const { isValid } = validateFields(fields);

    if (!isValid) {
      toast.error('Проверьте выделенные поля');
    }
    return isValid;
  };

  const handleSubscribe = () => {
    if (totalItems < 5) {
      toast.error('Добавьте минимум 5 товаров в коробку');
      navigate('/box');
      return;
    }

    if (!validateCurrentStep()) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'CLEAR_CART' });
      toast.success(`Подписка «${selectedPlan.title}» оформлена`);
      toast.success('Первая коробка будет у вас в течение 7–10 дней');

      navigate('/success', {
        state: {
          plan: selectedPlan.title,
          price: subscriptionPrice,
          items: totalItems,
          address: `${formData.city}, ${formData.address}`
        }
      });
    }, 2000);
  };

  const getInputClass = (name) => {
    const hasError = errors[name];
    const hasValue = formData[name];

    return [
      'w-full p-3 border text-sm transition-all duration-200 focus:outline-none',
      hasError
        ? 'border-red-500 bg-red-50'
        : hasValue
        ? 'border-black bg-black/5'
        : 'border-black/15 hover:border-black/50 focus:border-black'
    ].join(' ');
  };

  const isButtonDisabled = loading || totalItems < 5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/box"
              className="inline-flex items-center text-xs tracking-[0.25em] uppercase text-black/50 hover:text-black transition-colors"
            >
              <FaArrowLeft className="mr-2 text-[10px]" />
              Моя коробка
            </Link>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 border border-black/40 tracking-[0.25em] uppercase">
                {selectedPlan.badge}
              </span>
              <span className="uppercase tracking-[0.25em] text-black/60 flex items-center gap-1">
                <FaCrown className="text-[10px]" />
                {selectedPlan.title}
              </span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-[11px] tracking-[0.35em] uppercase text-black/50">
              ЭКО-ТОВАРЫ ПО ПОДПИСКЕ
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              Оформление подписки
            </h1>
          </div>

          {/* СХЕМА: коробка → данные → оплата */}
          <div className="mt-8 flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.25em] text-black/50">
            {/* 1: коробка */}
            <div className="flex items-center gap-3">
              <div
                className={[
                  'w-7 h-7 border flex items-center justify-center text-[10px]',
                  totalItems >= 5 ? 'bg-black text-white border-black' : 'border-black/40'
                ].join(' ')}
              >
                1
              </div>
              <span className="flex items-center gap-1">
                <FaBox className="text-[10px]" /> Коробка
              </span>
            </div>
            <div className="w-10 h-px bg-black/20" />
            {/* 2: данные */}
            <div className="flex items-center gap-3">
              <div
                className={[
                  'w-7 h-7 border flex items-center justify-center text-[10px]',
                  step === 1 ? 'bg-black text-white border-black' : 'border-black/40'
                ].join(' ')}
              >
                2
              </div>
              <span>Данные</span>
            </div>
            <div className="w-10 h-px bg-black/20" />
            {/* 3: оплата */}
            <div className="flex items-center gap-3">
              <div
                className={[
                  'w-7 h-7 border flex items-center justify-center text-[10px]',
                  step === 2 ? 'bg-black text-white border-black' : 'border-black/40'
                ].join(' ')}
              >
                3
              </div>
              <span>Оплата</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ЛЕВАЯ КОЛОНКА */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-8"
          >
            {totalItems >= 5 ? (
              <section className="border border-black/10 p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-1">
                      ВАША КОРОБКА
                    </h3>
                    <p className="text-xs text-black/50">
                      {totalItems} товаров • обновление каждый месяц
                    </p>
                  </div>
                  <div className="text-right">
                    {selectedPlan.originalPrice && (
                      <div className="text-xs line-through text-black/40">
                        {selectedPlan.originalPrice} ₽
                      </div>
                    )}
                    <div className="text-2xl font-extrabold">
                      {subscriptionPrice} ₽
                      <span className="text-xs uppercase text-black/50 ml-1">
                        / мес
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-4 py-3 border border-black/10 bg-black/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-black/20 flex items-center justify-center text-xs bg-white">
                          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium uppercase tracking-wide">
                            {item.title}
                          </h4>
                          <p className="text-xs text-black/60">
                            {item.quantity} × {item.price} ₽
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {item.price * item.quantity} ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/10 pt-4 mt-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-black/50">
                    ИТОГ ПО ПОДПИСКЕ
                  </span>
                  <span className="text-lg font-semibold">
                    {subscriptionPrice} ₽ / мес
                  </span>
                </div>
              </section>
            ) : (
              <section className="border border-black/20 p-8 text-center bg-black/[0.02]">
                <FaBox className="text-4xl mx-auto mb-4 text-black/50" />
                <h3 className="text-xs uppercase tracking-[0.25em] mb-3">
                  Недостаточно товаров
                </h3>
                <p className="text-sm text-black/60 mb-6">
                  Для оформления подписки добавьте минимум 5 товаров в коробку.
                </p>
                <Link
                  to="/box"
                  className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
                >
                  Дополнить коробку
                </Link>
              </section>
            )}

            <section className="border border-black/10 p-8 bg-white">
              <h3 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-6">
                Что включено
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 border border-black/40 flex items-center justify-center text-[10px]">
                      <FaCheckCircle />
                    </div>
                    <span className="text-sm text-black/80">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: ФОРМА */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
            className="space-y-8"
          >
            <section className="border border-black/10 p-8 bg-white sticky top-20">
              <div className="flex items-center justify-between mb-6 text-[11px] uppercase tracking-[0.25em] text-black/50">
                <span>Шаг {step} из 2</span>
                <span>{step === 1 ? 'Данные для доставки' : 'Оплата'}</span>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-address"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[11px]" />
                      Адрес доставки
                    </h3>

                    {['name', 'phone', 'city', 'address'].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1 flex items-center gap-2">
                          {field === 'name' && <FaUser className="text-[11px]" />}
                          {field === 'phone' && (
                            <FaPhone className="text-[11px]" />
                          )}
                          {(field === 'city' || field === 'address') && (
                            <FaMapMarkerAlt className="text-[11px]" />
                          )}
                          {field === 'name' && 'ФИО'}
                          {field === 'phone' && 'Телефон'}
                          {field === 'city' && 'Город'}
                          {field === 'address' && 'Адрес'}
                        </label>

                        {field === 'city' ? (
                          <select
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className={getInputClass(field)}
                          >
                            <option value="">Выберите город</option>
                            {CITIES.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className={getInputClass(field)}
                            placeholder={
                              field === 'name'
                                ? 'Иванов Иван Иванович'
                                : field === 'phone'
                                ? '+7 (999) 123-45-67'
                                : field === 'address'
                                ? 'Улица, дом, квартира'
                                : ''
                            }
                          />
                        )}

                        <AnimatePresence>
                          {errors[field] && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-500 flex items-center gap-1 mt-1"
                            >
                              <FaExclamationTriangle className="text-[10px]" />
                              {errors[field]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-card"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-2 flex items-center gap-2">
                      <FaCreditCard className="text-[11px]" />
                      Данные карты
                    </h3>

                    <div className="space-y-1">
                      <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                        Номер карты
                      </label>
                      <input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={getInputClass('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                      />
                      <AnimatePresence>
                        {errors.cardNumber && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-xs text-red-500 flex items-center gap-1 mt-1"
                          >
                            <FaExclamationTriangle className="text-[10px]" />
                            {errors.cardNumber}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                          Срок действия
                        </label>
                        <input
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className={getInputClass('expiry')}
                          placeholder="MM/YY"
                        />
                        <AnimatePresence>
                          {errors.expiry && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-500 flex items-center gap-1 mt-1"
                            >
                              <FaExclamationTriangle className="text-[10px]" />
                              {errors.expiry}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] uppercase tracking-[0.25em] text-black/60 mb-1">
                          CVV
                        </label>
                        <input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={getInputClass('cvv')}
                          placeholder="123"
                        />
                        <AnimatePresence>
                          {errors.cvv && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-500 flex items-center gap-1 mt-1"
                            >
                              <FaExclamationTriangle className="text-[10px]" />
                              {errors.cvv}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-black/60 mt-1">
                      <FaLock className="text-[10px]" />
                      <span>Безопасная оплата, данные карты не сохраняются</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleSubscribe}
                disabled={isButtonDisabled}
                className={`w-full mt-8 py-4 border font-semibold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all ${
                  isButtonDisabled
                    ? 'bg-black/5 text-black/30 border-black/15 cursor-not-allowed'
                    : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white" />
                    <span>Обработка...</span>
                  </>
                ) : step === 1 ? (
                  <>
                    <FaCreditCard className="text-[11px]" />
                    <span>Перейти к оплате</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="text-[11px]" />
                    <span>Подтвердить оплату</span>
                  </>
                )}
              </button>
            </section>

            {/* СВОДКА УСЛОВИЙ */}
            <section className="border border-black/10 p-6 bg-white space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-black/70">
                  <FaTruck className="text-[11px]" />
                  Доставка
                </span>
                <span className="text-black/60 text-[11px] uppercase tracking-[0.25em]">
                  7–10 дней
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-black/70">
                  <FaCalendarAlt className="text-[11px]" />
                  Списание
                </span>
                <span className="text-black/60 text-[11px] uppercase tracking-[0.25em]">
                  Ежемесячно
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-black/70">
                  <FaShieldAlt className="text-[11px]" />
                  Возврат
                </span>
                <span className="text-black/60 text-[11px] uppercase tracking-[0.25em]">
                  14 дней
                </span>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default SubscriptionDetail;
