import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { 
  FaCrown, FaCreditCard, FaEdit, FaDownload, 
  FaBell, FaArrowLeft, FaCheckCircle, FaPhone, 
  FaFileInvoice, FaUser, FaPlusCircle
} from 'react-icons/fa';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, createSubscription } = useAuth();
  
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(0);

  if (!user) {
    navigate('/login');
    return null;
  }

  // ✅ ПОДПИСКА ТОЛЬКО ЕСЛИ ОПЛАЧЕНА
  const subscription = user.subscription;

  // ✅ СОЗДАТЬ ПОДПИСКУ ИЗ ЗАКАЗА
  useEffect(() => {
    const { state: orderData } = location;
    if (orderData && !subscription) {
      const success = createSubscription({
        plan: orderData.plan || 'Популярная',
        price: orderData.price || 1611,
        items: orderData.items || 5
      });
      if (success) {
        toast.success('🎉 Подписка оформлена из заказа!');
      }
    }
  }, [location, subscription, createSubscription]);

  // РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const handleEditProfile = (e) => {
    e.preventDefault();
    setEditMode(false);
    toast.success('✅ Профиль обновлен!');
  };

  // СКАЧАТЬ ЧЕК
  const downloadReceipt = () => {
    if (!subscription) {
      toast.error('❌ Сначала оформите подписку!');
      return;
    }
    toast.success('📥 Чек скачан!');
  };

  // ПОДДЕРЖКА
  const sendSupport = () => {
    toast.success('📞 Запрос отправлен в поддержку!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50"
    >
      {/* HEADER */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link to={subscription ? "/success" : "/subscription/popular"} className="flex items-center text-emerald-600 mb-6 hover:text-emerald-800">
            <FaArrowLeft className="mr-2" /> {subscription ? "Назад к статусу" : "Выбрать подписку"}
          </Link>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-3xl text-white" />
            </motion.div>
            <h1 className="text-4xl font-black text-emerald-800 mb-2">{user.name}</h1>
            {subscription ? (
              <p className="text-emerald-600 flex justify-center items-center">
                <FaCrown className="mr-2" /> {subscription.plan} клуб
              </p>
            ) : (
              <p className="text-yellow-600 flex justify-center items-center">
                <FaPlusCircle className="mr-2" /> Подписка не оформлена
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* ЛЕВАЯ КОЛОНКА: МЕНЮ */}
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="lg:col-span-1 space-y-4 sticky top-20">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-emerald-800 mb-6">Меню</h3>
              <nav className="space-y-2">
                {[
                  { icon: FaUser, label: 'Профиль', href: '#profile', active: true },
                  ...(subscription ? [
                    { icon: FaCreditCard, label: 'Платежи', href: '#payments' },
                    { icon: FaFileInvoice, label: 'Чеки', href: '#receipts' },
                  ] : []),
                  { icon: FaBell, label: `Уведомления (${notifications})`, href: '#notifications' },
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.href} 
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                      item.active 
                        ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500' 
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* ПРАВАЯ КОЛОНКА: КОНТЕНТ */}
          <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="lg:col-span-3 space-y-8">
            
            {/* 1. ПРОФИЛЬ */}
            <section id="profile">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-800 flex items-center">
                    <FaUser className="mr-2" /> Личные данные
                  </h2>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <FaEdit />
                    <span>{editMode ? 'Сохранить' : 'Редактировать'}</span>
                  </button>
                </div>

                <form onSubmit={handleEditProfile} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-emerald-700 font-semibold mb-2">ФИО</label>
                      <input 
                        type="text" 
                        value={user.name} 
                        className="w-full p-3 border border-emerald-200 rounded-xl focus:border-yellow-400" 
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-700 font-semibold mb-2">Email</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        className="w-full p-3 border border-emerald-200 rounded-xl bg-gray-50" 
                        disabled
                      />
                    </div>
                  </div>
                  {editMode && (
                    <button 
                      type="submit" 
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700"
                    >
                      Сохранить изменения
                    </button>
                  )}
                </form>
              </div>
            </section>

            {/* 2. ПОДПИСКА (ПУСТАЯ ИЛИ АКТИВНАЯ) */}
            <section id="orders">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                  <FaCrown className="mr-2" /> Подписка
                </h2>
                
                {subscription ? (
                  // ✅ АКТИВНАЯ ПОДПИСКА
                  <>
                    <div className="bg-gradient-to-r from-emerald-50 to-yellow-50 p-6 rounded-xl mb-6">
                      <div className="grid md:grid-cols-2 gap-6 text-center">
                        <div>
                          <div className="text-3xl font-black text-emerald-800">{subscription.plan}</div>
                          <div className="text-emerald-600 mt-1">Тариф</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-yellow-600">{subscription.items}</div>
                          <div className="text-yellow-600 mt-1">Товаров в месяц</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600">Стоимость:</span>
                          <span className="font-black text-emerald-800">{subscription.price} ₽/мес</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600">Начало:</span>
                          <span className="font-black text-emerald-800">{subscription.startDate}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600">След. платеж:</span>
                          <span className="font-black text-emerald-800">{subscription.nextPayment}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600">Статус:</span>
                          <span className="flex items-center space-x-2">
                            <FaCheckCircle className="text-emerald-500" />
                            <span className="font-black text-emerald-800">Активна</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-emerald-200">
                      <Link to="/subscription/popular" className="w-full bg-yellow-400 text-emerald-800 py-3 rounded-xl font-bold flex items-center justify-center space-x-2">
                        <FaFileInvoice className="text-sm" />
                        <span>Изменить подписку</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  // ✅ ПУСТАЯ ПОДПИСКА
                  <div className="text-center py-12">
                    <FaCrown className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">Подписка не оформлена</h3>
                    <p className="text-gray-500 mb-8">Оформите подписку, чтобы начать получать коробки!</p>
                    <Link 
                      to="/subscription/popular" 
                      className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-700 transition-all"
                    >
                      Оформить подписку
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* 3. ПОДДЕРЖКА (ТОЛЬКО ПРИ ПОДПИСКЕ) */}
            {subscription && (
              <section id="support">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-6">Поддержка</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <button 
                      onClick={downloadReceipt}
                      className="bg-yellow-400 text-emerald-800 p-4 rounded-xl flex items-center justify-center space-x-2 font-bold hover:bg-yellow-300"
                    >
                      <FaDownload className="text-lg" />
                      <span>Скачать чек</span>
                    </button>
                    <button 
                      onClick={sendSupport}
                      className="bg-emerald-600 text-white p-4 rounded-xl flex items-center justify-center space-x-2 font-bold hover:bg-emerald-700"
                    >
                      <FaPhone className="text-lg" />
                      <span>Связаться с поддержкой</span>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;