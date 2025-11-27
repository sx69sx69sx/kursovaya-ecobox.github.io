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

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubscription = () => {
    if (totalItems >= 5) {
      toast.success('Коробка готова. Переходим к оформлению подписки.');
      navigate('/subscription/popular');
    } else {
      toast.error('Добавьте минимум 5 товаров в коробку.');
    }
  };

  // пустая коробка
  if (state.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white text-black"
      >
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <FaBox className="text-7xl text-black/10 mx-auto mb-8" />
          <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-4">
            Ваша коробка пуста
          </h1>
          <p className="text-sm uppercase tracking-[0.25em] text-black/50 mb-10">
            выберите товары для ежемесячной подписки
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-10 py-4 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            Выбрать товары
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* шапка */}
        <header className="mb-10 border-b border-black/10 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/products"
              className="inline-flex items-center text-xs tracking-[0.25em] uppercase text-black/60 hover:text-black transition-colors"
            >
              <FaArrowLeft className="mr-2 text-[10px]" />
              Каталог
            </Link>

            <div className="text-[11px] uppercase tracking-[0.25em] text-black/50 hidden sm:block">
              Эко-товары по подписке
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
              Моя коробка
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-black/60">
              {totalItems} товаров • обновление каждый месяц
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* товары в коробке */}
          <section className="lg:col-span-2 border border-black/10 bg-white">
            {state.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="flex items-center px-6 py-4 border-b border-black/5 last:border-b-0"
              >
                <div className="w-20 h-20 mr-5 border border-black/15 bg-black/5 flex items-center justify-center overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black/60">
                    {item.price} ₽ / мес
                  </p>
                </div>

                <div className="flex items-center gap-2 mr-6">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity - 1 }
                      })
                    }
                    className="w-8 h-8 border border-black/20 flex items-center justify-center text-xs hover:bg-black hover:text-white transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity: item.quantity + 1 }
                      })
                    }
                    className="w-8 h-8 border border-black/20 flex items-center justify-center text-xs hover:bg-black hover:text-white transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="text-sm font-semibold mb-1">
                    {item.price * item.quantity} ₽
                  </p>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                    }
                    className="text-[11px] uppercase tracking-[0.2em] text-black/50 hover:text-black inline-flex items-center gap-1"
                  >
                    <FaTrash className="text-[10px]" />
                    Удалить
                  </button>
                </div>
              </motion.div>
            ))}
          </section>

          {/* итог + переход к подписке */}
          <section className="border border-black/10 bg-white px-6 py-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-black/60 mb-1">
                    Итого в месяц
                  </p>
                  <p
                    className={`text-xs uppercase tracking-[0.25em] ${
                      totalItems >= 5 ? 'text-black/60' : 'text-red-500'
                    }`}
                  >
                    {totalItems >= 5
                      ? 'Готово к подписке'
                      : `Нужно ещё ${5 - totalItems} товар(ов)`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold">{totalPrice} ₽</p>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">
                    / мес
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubscription}
                disabled={totalItems < 5}
                className={`w-full py-4 border text-xs font-semibold tracking-[0.25em] uppercase flex items-center justify-center gap-2 transition-all ${
                  totalItems >= 5
                    ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                    : 'bg-black/5 text-black/30 border-black/15 cursor-not-allowed'
                }`}
              >
                <FaCheckCircle className="text-[12px]" />
                <span>Оформить подписку</span>
              </button>
            </div>

            <div className="mt-8 border-t border-black/10 pt-4 text-[11px] text-black/60 space-y-1">
              <p className="flex items-center justify-between">
                <span className="uppercase tracking-[0.25em]">Доставка</span>
                <span>1 раз в месяц</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="uppercase tracking-[0.25em]">Стоимость</span>
                <span>включена в подписку</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="uppercase tracking-[0.25em]">Изменения</span>
                <span>коробку можно редактировать каждый месяц</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default Box;
