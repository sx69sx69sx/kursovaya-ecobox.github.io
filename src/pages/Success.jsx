import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { 
  FaCheckCircle, FaBox, FaTruck, FaCrown, FaCalendarAlt, 
  FaStar, FaGift, FaUsers, FaLeaf, FaArrowLeft, FaDownload,
  FaFileInvoice, FaShieldAlt, FaClock, FaSpinner, FaUser, 
  FaSignInAlt, FaUserPlus
} from 'react-icons/fa';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, createSubscription } = useAuth();
  
  const { state } = location;
  const [countdown, setCountdown] = useState(7);

  // ✅ ДАННЫЕ ПОДПИСКИ
  const planData = state || {
    plan: 'Популярная',
    price: 1611,
    items: 5,
    name: 'Иванов Иван',
    phone: '+7 (999) 123-45-67',
    city: 'Москва',
    address: 'ул. Ленина, д. 5'
  };

  // ✅ ЗАЩИТА: НЕАВТОРИЗОВАННЫЙ → LOGIN
  useEffect(() => {
    if (!user) {
      toast.error('🔒 Авторизуйтесь для сохранения подписки!');
      navigate('/login', { 
        state: { 
          from: '/success', 
          planData  // ← ДАННЫЕ ПОДПИСКИ ДЛЯ ВОССТАНОВЛЕНИЯ
        } 
      });
      return;
    }

    // ✅ АВТОРИЗОВАННЫЙ: СОЗДАТЬ ПОДПИСКУ
    if (user && state && !user.subscription) {
      const success = createSubscription({
        plan: planData.plan,
        price: planData.price,
        items: planData.items
      });
      if (success) {
        toast.success('🎉 Подписка сохранена в профиле!');
      }
    }
  }, [user, state, createSubscription, planData, navigate]);

  // ✅ ЕСЛИ НЕ АВТОРИЗОВАН - ПОКАЗАТЬ ЭКРАН ЛОГИНА
  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-emerald-100 flex items-center justify-center"
      >
        <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md text-center">
          <FaSignInAlt className="text-6xl text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-emerald-800 mb-4">Авторизация обязательна!</h1>
          <p className="text-emerald-600 mb-6">
            Для сохранения подписки <strong>{planData.plan}</strong> 
            войдите в аккаунт
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/login" 
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-all"
            >
              <FaSignInAlt />
              <span>Войти</span>
            </Link>
            
            <Link 
              to="/register" 
              className="w-full bg-yellow-400 text-emerald-800 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-yellow-300 transition-all"
            >
              <FaUserPlus />
              <span>Регистрация</span>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Ваша подписка: {planData.items} товаров за {planData.price} ₽
          </p>
        </div>
      </motion.div>
    );
  }

  // COUNTDOWN 7 ДНЕЙ
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // TOAST
  useEffect(() => {
    toast.success('🎉 Подписка успешно оформлена!');
    toast('📦 Коробка готовится к отправке', { duration: 4000 });
  }, []);

  // ... ВСЁ ОСТАЛЬНОЕ ОСТАЁТСЯ ТАК ЖЕ! ...
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 - 100,
    rotation: Math.random() * 360,
    color: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 5)]
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-emerald-100 overflow-hidden relative"
    >
      {/* КОНФЕТТИ */}
      {confetti.map((particle, i) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ left: `${particle.x}%`, top: `${particle.y}%`, backgroundColor: particle.color }}
          animate={{ y: [particle.y, particle.y + 200], rotate: [0, 360], opacity: [1, 0] }}
          transition={{ duration: 3 + Math.random() * 2, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}

      {/* HEADER */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/" className="flex items-center text-emerald-600 mb-6 hover:text-emerald-800">
            <FaArrowLeft className="mr-2" /> На главную
          </Link>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-5xl text-white" />
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl font-black text-emerald-800 mb-4">
              Подписка оформлена!
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-emerald-600 flex justify-center items-center">
              <FaCrown className="mr-2" /> Добро пожаловать в {planData.plan} клуб!
            </motion.p>
          </div>
        </div>
      </div>

      {/* ... ВСЁ ОСТАЛЬНОЕ ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ ... */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ОСНОВНАЯ ИНФО */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-2 space-y-8">
            {/* ДЕТАЛИ ПОДПИСКИ */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                <FaCrown className="mr-2 text-yellow-400" /> Ваша подписка
              </h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2"><span className="text-emerald-600 font-semibold">Тариф:</span><span className="text-2xl font-black text-emerald-800">{planData.plan}</span></div>
                <div className="space-y-2"><span className="text-emerald-600 font-semibold">Стоимость:</span><span className="text-2xl font-black text-emerald-800">{planData.price} ₽/мес</span></div>
                <div className="space-y-2"><span className="text-emerald-600 font-semibold">Товаров:</span><span className="text-2xl font-black text-emerald-800">{planData.items}</span></div>
                <div className="space-y-2"><span className="text-emerald-600 font-semibold">Доставка:</span><span className="text-2xl font-black text-emerald-800">{planData.address}</span></div>
              </div>

              {/* ПРОГРЕСС + COUNTDOWN (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-yellow-50 to-emerald-50 p-6 rounded-xl border-2 border-yellow-200"
              >
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaSpinner className="text-xl text-white animate-spin" />
                  </motion.div>
                  <span className="text-xl font-bold text-yellow-800">Статус: Готовим коробку</span>
                </div>
                
                <div className="relative mb-6">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "33%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="absolute -top-2 left-0 w-full flex justify-between text-xs text-gray-500">
                    <span className="font-bold text-yellow-600">Готовим</span>
                    <span>В пути</span>
                    <span>Доставлено</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <motion.div className="flex flex-col items-center flex-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shadow-md mb-1 animate-pulse">
                      <FaSpinner className="text-sm animate-spin" />
                    </div>
                    <span className="text-xs font-bold text-yellow-600">Готовим</span>
                  </motion.div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shadow-md mb-1">
                      <FaTruck className="text-sm" />
                    </div>
                    <span className="text-xs text-gray-500">В пути</span>
                  </div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shadow-md mb-1">
                      <FaCheckCircle className="text-sm" />
                    </div>
                    <span className="text-xs text-gray-500">Доставлено</span>
                  </div>
                </div>

                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center justify-center space-x-2 text-yellow-700 mb-2">
                    <FaClock className="text-xl animate-pulse" />
                    <span className="text-lg font-bold">
                      Первая доставка через <span className="text-2xl text-yellow-600">{countdown}</span> дней
                    </span>
                  </div>
                  <motion.div 
                    className="inline-flex items-center px-6 py-2 bg-yellow-100 text-yellow-800 rounded-full shadow-lg font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaTruck className="mr-2 animate-bounce" />
                    <span>СЛЕДИ ЗА СТАТУСОМ</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* ПРЕИМУЩЕСТВА (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ) */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Что вас ждет</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: FaBox, text: `${planData.items} эксклюзивных товаров`, color: 'emerald' },
                  { icon: FaTruck, text: 'Бесплатная доставка по России', color: 'yellow' },
                  { icon: FaGift, text: 'Ежемесячные сюрпризы', color: 'purple' },
                  { icon: FaShieldAlt, text: '14 дней на возврат', color: 'blue' },
                  { icon: FaCalendarAlt, text: 'Автопродление', color: 'green' },
                  { icon: FaStar, text: 'Персональные рекомендации', color: 'orange' }
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-white to-emerald-50 rounded-xl">
                    <item.icon className={`text-2xl text-${item.color}-500`} />
                    <span className="font-semibold text-emerald-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ) */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 sticky top-20">
            <div className="bg-gradient-to-r from-emerald-600 to-yellow-500 text-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-4xl font-black mb-2">{planData.price}</div>
              <div className="text-lg">₽/месяц</div>
              <div className="text-sm opacity-90 mt-2">Автоплатеж</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h4 className="text-lg font-bold text-emerald-800 mb-4 text-center">Статистика</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><FaUsers className="text-2xl text-emerald-500 mx-auto mb-1" /><div className="font-bold text-emerald-600">10 000+</div><div className="text-xs text-gray-500">клиентов</div></div>
                <div><FaStar className="text-2xl text-yellow-400 mx-auto mb-1" /><div className="font-bold text-emerald-600">4.9</div><div className="text-xs text-gray-500">рейтинг</div></div>
                <div><FaBox className="text-2xl text-emerald-500 mx-auto mb-1" /><div className="font-bold text-emerald-600">5000+</div><div className="text-xs text-gray-500">коробок/мес</div></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
              <Link to="/profile" className="w-full bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 font-bold hover:bg-emerald-700 transition-all">
                <FaUser className="text-sm" /><span>Личный кабинет</span>
              </Link>
              <button onClick={() => window.print()} className="w-full bg-yellow-400 text-emerald-800 py-3 rounded-xl flex items-center justify-center space-x-2 font-bold hover:bg-yellow-300 transition-all">
                <FaDownload className="text-sm" /><span>Скачать чек</span>
              </button>
              <Link to="/subscription/manage" className="w-full bg-gray-100 text-emerald-700 py-3 rounded-xl flex items-center justify-center space-x-2 font-bold hover:bg-gray-200 transition-all">
                <FaFileInvoice className="text-sm" /><span>Управление подпиской</span>
              </Link>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-center">
              <FaLeaf className="text-2xl text-emerald-500 mx-auto mb-2" />
              <p className="text-sm text-emerald-700">Спасибо за выбор экологии! 🌱</p>
              <p className="text-xs text-emerald-600 mt-1">Каждый месяц вы помогаете планете</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ОТЗЫВЫ (ОСТАЁТСЯ БЕЗ ИЗМЕНЕНИЙ) */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-emerald-800 text-center mb-12">Первые впечатления</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { author: 'Анна, Москва', text: 'Только оформила! Уже жду первую коробку!', rating: 5 },
            { author: 'Дмитрий, СПб', text: 'Простое оформление, супер сервис!', rating: 5 },
            { author: 'Елена, Казань', text: 'Эко-подписка мечты! Обожаю!', rating: 5 }
          ].map((review, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-3">{[...Array(review.rating)].map((_, j) => <FaStar key={j} className="text-yellow-400" />)}</div>
              <p className="text-emerald-700 italic mb-4">"{review.text}"</p>
              <p className="font-semibold text-emerald-800">{review.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Success;