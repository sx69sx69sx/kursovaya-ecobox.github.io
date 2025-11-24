import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaBox, FaCrown, FaCheckCircle, FaTruck, FaLeaf, FaCreditCard, 
  FaShieldAlt, FaStar, FaArrowLeft, FaCalendarAlt, FaGift, FaUsers, 
  FaCheck, FaMapMarkerAlt, FaLock, FaUser, FaPhone, FaExclamationTriangle
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const PLANS = {
  basic: { id: 'basic', title: 'Базовая', price: 990, originalPrice: 1490, features: ['📦 5 товаров/мес','🚚 Бесплатная доставка','♻️ Эко-упаковка','🔄 Пауза/отмена','📞 Поддержка 24/7'], popular: false, badge: 'СТАРТ' },
  popular: { id: 'popular', title: 'Популярная', price: 1611, originalPrice: 2290, features: ['📦 8 товаров/мес','🚚 Бесплатная доставка','♻️ Эко-упаковка','🎁 Бонусный товар','🔄 Пауза/отмена','📞 Поддержка 24/7','⭐ Персональные рекомендации'], popular: true, badge: 'ХИТ' },
  premium: { id: 'premium', title: 'Премиум', price: 1990, originalPrice: 2990, features: ['📦 12 товаров/мес','🚚 Бесплатная доставка','♻️ Эко-упаковка','🎁 2 бонусных товара','🔄 Пауза/отмена','📞 Поддержка 24/7','⭐ Персональные рекомендации','👑 VIP-менеджер','💝 Подарок на день рождения'], popular: true, badge: 'PREMIUM' }
};

const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];

const SubscriptionDetail = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  
  const selectedPlan = PLANS[plan] || PLANS.popular;
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subscriptionPrice = totalItems >= 5 ? totalPrice : selectedPlan.price;

  // ФОРМА + СТРОГАЯ ВАЛИДАЦИЯ
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', phone: '', city: '', address: '',
    cardNumber: '', expiry: '', cvv: ''
  });

  // СТРОКАЯ ВАЛИДАЦИЯ ПОЛЯ
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        newErrors.name = value.length < 2 ? 'Минимум 2 символа' : '';
        break;
      case 'phone':
        newErrors.phone = !/^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value.replace(/\D/g, '')) ? 'Неверный формат телефона' : '';
        break;
      case 'city':
        newErrors.city = !value ? 'Выберите город' : '';
        break;
      case 'address':
        newErrors.address = value.length < 5 ? 'Укажите полный адрес' : '';
        break;
      case 'cardNumber':
        newErrors.cardNumber = value.replace(/\s/g, '').length !== 16 ? '16 цифр карты' : '';
        break;
      case 'expiry':
        newErrors.expiry = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? 'MM/YY формат' : '';
        break;
      case 'cvv':
        newErrors.cvv = !/^\d{3}$/.test(value) ? '3 цифры CVV' : '';
        break;
    }
    
    setErrors(newErrors);
  };

  // ОБНОВЛЕНИЕ + ВАЛИДАЦИЯ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // ФОРМАТИРОВАНИЕ
    if (name === 'phone') {
      formattedValue = value.replace(/[^\d+]/g, '').replace(/(\+?7|8)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, 
        (match, p1, p2, p3, p4, p5) => 
        (p1 || '+7') + ' (' + p2 + (p2 ? ')' : '') + p3 + (p3 ? '-' : '') + p4 + (p4 ? '-' : '') + p5
      ).slice(0, 18);
    } else if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/, '$1 $2 $3 $4').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{0,2})(\d{0,2})/, '$1/$2').slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    validateField(name, formattedValue);
  };

  // ВАЛИДАЦИЯ ШАГА
  const validateStep = () => {
    const stepFields = step === 1 ? ['name', 'phone', 'city', 'address'] : ['cardNumber', 'expiry', 'cvv'];
    const newErrors = {};
    
    stepFields.forEach(field => {
      validateField(field, formData[field]);
    });
    
    const hasErrors = Object.values(newErrors).some(err => err);
    if (hasErrors) {
      toast.error('❌ Заполните все поля правильно!');
      Object.entries(newErrors).forEach(([field, error]) => {
        if (error) setErrors(prev => ({ ...prev, [field]: error }));
      });
      return false;
    }
    return true;
  };

  // ОФОРМИТЬ ПОДПИСКУ
  const handleSubscribe = async () => {
    if (totalItems < 5) {
      toast.error('❌ Добавьте минимум 5 товаров в коробку!');
      navigate('/box');
      return;
    }

    if (!validateStep()) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    setErrors({});
    
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'CLEAR_CART' });
      toast.success(`🎉 Подписка ${selectedPlan.title} оформлена!`);
      toast.success('📦 Первая коробка в пути через 7-10 дней!');
      
      navigate('/success', { 
        state: { plan: selectedPlan.title, price: subscriptionPrice, items: totalItems, address: `${formData.city}, ${formData.address}` }
      });
    }, 3000);
  };

  // CSS КЛАССЫ ПОЛЯ
  const getInputClass = (name) => {
    const hasError = errors[name];
    return `w-full p-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
      hasError 
        ? 'border-red-400 bg-red-50 shake-horizontal' 
        : formData[name] 
        ? 'border-emerald-400 bg-emerald-50' 
        : 'border-emerald-200 hover:border-emerald-300'
    }`;
  };

  // АНИМАЦИЯ ОШИБКИ
  const shakeAnimation = {
    initial: { x: 0 },
    animate: { x: [0, -5, 5, -5, 0] },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-emerald-50 to-yellow-50">
      {/* HEADER */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/box" className="flex items-center text-emerald-600 mb-6 hover:text-emerald-800">
            <FaArrowLeft className="mr-2" /> ← Моя коробка
          </Link>
          <div className="text-center">
            <h1 className="text-5xl font-black text-emerald-800 mb-4">Оформление подписки</h1>
            <p className="text-xl text-emerald-600 flex justify-center items-center">
              <FaCrown className="mr-2" /> {selectedPlan.title} {selectedPlan.badge === 'ХИТ' && '(Популярный выбор)'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ЛЕВАЯ КОЛОНКА */}
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="lg:col-span-2 space-y-8">
            {totalItems >= 5 ? (
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                  <FaBox className="mr-2" /> Ваша коробка ({totalItems} товаров)
                </h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center p-4 bg-emerald-50 rounded-xl">
                      <div className="text-2xl mr-4">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-emerald-800">{item.title}</h4>
                        <p className="text-emerald-600">{item.quantity} × {item.price} ₽</p>
                      </div>
                      <span className="font-bold text-emerald-600">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-200 pt-4 mt-6">
                  <div className="flex justify-between text-xl font-black text-emerald-800">
                    <span>Итого:</span>
                    <span>{subscriptionPrice} ₽/мес</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
                <FaBox className="text-6xl text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Добавьте товары</h3>
                <p className="text-yellow-700 mb-4">Нужно минимум 5 товаров для подписки</p>
                <Link to="/box" className="bg-yellow-400 text-emerald-800 px-6 py-3 rounded-full font-bold">Дополнить коробку</Link>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Что включено</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                    <span className="text-emerald-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: ФОРМА */}
          <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl sticky top-20">
              {/* ПРОГРЕСС */}
              <div className="flex justify-between mb-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>1</div>
                <div className="w-16 h-1 bg-emerald-200 rounded-full mt-4"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>2</div>
              </div>

              {/* ШАГ 1: АДРЕС */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-emerald-800 flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> Адрес доставки
                    </h3>
                    
                    {['name', 'phone', 'city', 'address'].map(field => (
                      <div key={field} className="space-y-1">
                        <label className="block text-emerald-700 font-semibold mb-1 flex items-center">
                          {field === 'name' && <FaUser className="mr-1" />}
                          {field === 'phone' && <FaPhone className="mr-1" />}
                          {field === 'city' && <FaMapMarkerAlt className="mr-1" />}
                          {field === 'address' && <FaMapMarkerAlt className="mr-1" />}
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {field === 'city' ? (
                          <select name={field} value={formData[field]} onChange={handleInputChange} className={getInputClass(field)}>
                            <option value="">Выберите город</option>
                            {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                          </select>
                        ) : (
                          <motion.input
                            {...shakeAnimation}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className={getInputClass(field)}
                            placeholder={
                              field === 'name' ? 'Иванов Иван Иванович' :
                              field === 'phone' ? '+7 (999) 123-45-67' :
                              field === 'address' ? 'ул. Ленина, д. 5, кв. 23' : ''
                            }
                          />
                        )}
                        <AnimatePresence>
                          {errors[field] && (
                            <motion.p
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-red-500 text-sm flex items-center mt-1"
                            >
                              <FaExclamationTriangle className="mr-1" />
                              {errors[field]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* ШАГ 2: КАРТА */}
                {step === 2 && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-emerald-800 flex items-center">
                      <FaCreditCard className="mr-2" /> Данные карты
                    </h3>
                    
                    <div className="space-y-1">
                      <label className="block text-emerald-700 font-semibold mb-1">Номер карты</label>
                      <motion.input
                        {...shakeAnimation}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={getInputClass('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                      />
                      <AnimatePresence>
                        {errors.cardNumber && (
                          <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-red-500 text-sm flex items-center mt-1">
                            <FaExclamationTriangle className="mr-1" /> {errors.cardNumber}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-emerald-700 font-semibold mb-1">Срок действия</label>
                        <motion.input
                          {...shakeAnimation}
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className={getInputClass('expiry')}
                          placeholder="MM/YY"
                        />
                        <AnimatePresence>
                          {errors.expiry && (
                            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-red-500 text-sm flex items-center mt-1">
                              <FaExclamationTriangle className="mr-1" /> {errors.expiry}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-emerald-700 font-semibold mb-1">CVV</label>
                        <motion.input
                          {...shakeAnimation}
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={getInputClass('cvv')}
                          placeholder="123"
                        />
                        <AnimatePresence>
                          {errors.cvv && (
                            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-red-500 text-sm flex items-center mt-1">
                              <FaExclamationTriangle className="mr-1" /> {errors.cvv}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleSubscribe}
                disabled={loading || totalItems < 5}
                className={`w-full py-4 rounded-xl font-black text-xl flex items-center justify-center space-x-3 transition-all shadow-lg ${
                  totalItems >= 5 && Object.values(errors).every(e => !e)
                    ? 'bg-gradient-to-r from-emerald-600 to-yellow-500 text-white hover:from-emerald-700 hover:to-yellow-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Обрабатываем оплату...</span>
                  </>
                ) : step === 1 ? (
                  <> <FaCreditCard /> <span>Оплатить {subscriptionPrice} ₽</span> </>
                ) : (
                  <> <FaCheck /> <span>Подтвердить оплату</span> </>
                )}
              </button>

              {step === 2 && (
                <div className="flex items-center justify-center space-x-2 text-xs text-emerald-600 mt-4">
                  <FaLock className="text-emerald-500" />
                  <span>Безопасная оплата • Данные не сохраняются</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl space-y-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-emerald-600"><FaTruck className="text-xl" /> Доставка: 7-10 дней</div>
              <div className="flex items-center justify-center space-x-2 text-emerald-600"><FaCalendarAlt className="text-xl" /> Ежемесячно</div>
              <div className="flex items-center justify-center space-x-2 text-emerald-600"><FaShieldAlt className="text-xl" /> 14 дней на возврат</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionDetail;