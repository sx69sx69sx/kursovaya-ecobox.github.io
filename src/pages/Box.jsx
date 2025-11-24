import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaBox, 
  FaMinus, 
  FaPlus, 
  FaTrash, 
  FaCheckCircle,
  FaArrowLeft 
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Box = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubscription = () => {
    if (totalItems >= 5) {
      toast.success('✅ Коробка готова! Переходим к подписке');
      navigate('/subscription/popular');
    } else {
      toast.error('❌ Добавьте минимум 5 товаров в коробку');
    }
  };

  if (state.items.length === 0) {
    return (
      <motion.div className="min-h-screen bg-emerald-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaBox className="text-9xl text-emerald-200 mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-emerald-800 mb-4">Ваша коробка пуста</h1>
          <p className="text-xl text-emerald-600 mb-8">Выберите товары для ежемесячной подписки</p>
          <Link to="/products" className="bg-yellow-400 text-emerald-800 px-8 py-4 rounded-full font-bold text-xl">
            Выбрать товары
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center mb-8">
          <Link to="/products" className="flex items-center text-emerald-600 mr-4">
            <FaArrowLeft /> Каталог
          </Link>
          <h1 className="text-4xl font-bold text-emerald-800">
            Моя коробка ({totalItems} товаров)
          </h1>
        </div>

        {/* ТОВАРЫ В КОРОБКЕ */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {state.items.map((item) => (
            <motion.div key={item.id} className="flex items-center p-6 border-b border-emerald-100">
              <div className="w-20 h-20 bg-emerald-50 rounded-xl flex items-center justify-center mr-4">
                <span className="text-3xl">{item.image}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-emerald-800">{item.title}</h3>
                <p className="text-emerald-600">{item.price} ₽/мес</p>
              </div>

              <div className="flex items-center space-x-3 mr-4">
                <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })} className="p-2 bg-emerald-100 rounded-full">
                  <FaMinus />
                </button>
                <span className="w-10 text-center font-bold">{item.quantity}</span>
                <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })} className="p-2 bg-emerald-100 rounded-full">
                  <FaPlus />
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-xl text-emerald-600">{(item.price * item.quantity)} ₽/мес</p>
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })} className="text-red-500 mt-2">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ПРОГРЕСС + ОФОРМЛЕНИЕ */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-xl text-emerald-700">Итого в месяц:</span>
              <p className={`text-lg font-bold ${totalItems >= 5 ? 'text-emerald-600' : 'text-red-500'}`}>
                {totalItems >= 5 ? '✅ Готово к подписке' : `❌ Нужно еще ${5 - totalItems} товаров`}
              </p>
            </div>
            <span className="text-4xl font-black text-emerald-800">{totalPrice} ₽/мес</span>
          </div>
          
          <button
            onClick={handleSubscription}
            disabled={totalItems < 5}
            className={`w-full py-4 rounded-xl font-black text-xl flex items-center justify-center space-x-2 transition-all ${
              totalItems >= 5
                ? 'bg-yellow-400 text-emerald-800 hover:bg-yellow-300'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaCheckCircle />
            <span>Оформить подписку</span>
          </button>

          <div className="mt-6 text-center text-emerald-600">
            <p>📦 Доставка каждый месяц</p>
            <p className="text-sm">🚚 Бесплатно по России</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Box;