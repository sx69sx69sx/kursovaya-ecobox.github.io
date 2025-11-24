import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaSearch, FaPlus, FaMinus, FaPhone  } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState({
    subscriptions: true,
    products: true,
    delivery: true,
    payment: true,
    returns: true,
    other: true
  });

  // 30+ РЕАЛИСТИЧНЫХ ВОПРОСОВ
  const faqData = [
    // ПОДПИСКИ
    {
      category: 'subscriptions',
      questions: [
        {
          q: 'Что такое подписка EcoBox?',
          a: 'Подписка — это ежемесячная доставка экологичных товаров. Выбираете тариф (Basic/Popular/Premium) и получаете коробку с 5-12 товарами на дом.'
        },
        {
          q: 'Можно ли пропустить месяц?',
          a: 'Да! Пропуск месяца бесплатный. Зайдите в Личный кабинет → "Управление подпиской" → "Пропустить месяц".'
        },
        {
          q: 'Как изменить тариф подписки?',
          a: 'В Личном кабинете: "Моя подписка" → "Изменить тариф". Можно менять в любое время, изменения вступят с следующего месяца.'
        },
        {
          q: 'Что будет, если не оплатить подписку?',
          a: 'Подписка автоматически продлевается. Если оплата не прошла, мы отправим напоминание. Через 7 дней доступ к ЛК временно блокируется.'
        },
        {
          q: 'Можно ли отменить подписку?',
          a: 'Да, бесплатно в любой момент. ЛК → "Управление подпиской" → "Отменить". Товары текущего месяца вы получите.'
        }
      ]
    },
    
    // ТОВАРЫ
    {
      category: 'products',
      questions: [
        {
          q: 'Безопасны ли товары для детей?',
          a: '100%! Все продукты сертифицированы, без парабенов, сульфатов и синтетики. Подходят для детей с 0+.'
        },
        {
          q: 'Есть ли срок годности?',
          a: 'Да, указан на каждом товаре. Мы отправляем только свежие партии (срок от 6 месяцев на момент доставки).'
        },
        {
          q: 'Можно ли выбрать конкретные товары?',
          a: 'В Premium подписке — да! В Basic/Popular — сюрпризная коробка с вашими предпочтениями (косметика/дом/еда).'
        },
        {
          q: 'Аллергены в составе?',
          a: 'Полный состав на сайте. Если аллергия — укажите в профиле, мы исключим такие товары из вашей коробки.'
        },
        {
          q: 'Где посмотреть предыдущие коробки?',
          a: 'ЛК → "История заказов" → клик на месяц. Там фото + полный список товаров.'
        }
      ]
    },

    // ДОСТАВКА
    {
      category: 'delivery',
      questions: [
        {
          q: 'Сколько стоит доставка?',
          a: 'Бесплатно от 1500 ₽. Иначе: СДЭК 250 ₽, Boxberry 200 ₽, Курьер 350 ₽, Самовывоз — бесплатно.'
        },
        {
          q: 'Сколько дней доставка?',
          a: 'Москва/СПб: 1 день. Другие города: 1-3 дня. Трекинг-номер приходит на email и в ЛК.'
        },
        {
          q: 'Можно ли изменить адрес?',
          a: 'До 18:00 дня доставки — да. Позвоните +7 (495) 123-45-67 или напишите в Telegram.'
        },
        {
          q: 'Что в эко-упаковке?',
          a: 'Крафт-коробка + наполнитель из кукурузы. 100% перерабатывается. Без пластика!'
        },
        {
          q: 'Работаете ли в праздники?',
          a: 'Да, кроме 1-8 января. График доставки уточняйте в ЛК или по телефону.'
        }
      ]
    },

    // ОПЛАТА
    {
      category: 'payment',
      questions: [
        {
          q: 'Какие способы оплаты?',
          a: 'Карта (Мир/Visa/MC), СБП, ЮMoney, наличными при получении. Подписка — только картой.'
        },
        {
          q: 'Безопасна ли оплата?',
          a: 'Да! Сертификат PCI DSS. Все данные шифруются. Деньги списываются только после получения.'
        },
        {
          q: 'Где посмотреть чек?',
          a: 'ЛК → "История заказов" → клик на заказ → "Скачать чек". Также приходит на email.'
        },
        {
          q: 'Скидка за предоплату?',
          a: '5% на первый заказ! В корзине выберите "Оплатить сейчас".'
        },
        {
          q: 'Возврат денег?',
          a: 'Если товар бракованный — 100% возврат в течение 14 дней. Деньги на карту 3-5 дней.'
        }
      ]
    },

    // ВОЗВРАТЫ
    {
      category: 'returns',
      questions: [
        {
          q: 'Можно ли вернуть товар?',
          a: 'Да, 14 дней. Не вскрытые упаковки. Отправьте СДЭК на наш адрес, приложите чек.'
        },
        {
          q: 'Кто оплачивает обратную доставку?',
          a: 'Если брак — мы. Если просто передумали — вы (250 ₽).'
        },
        {
          q: 'Как оформить возврат?',
          a: 'ЛК → "Возвраты" → фото товара + причина → печать этикетки → отправка.'
        }
      ]
    },

    // ПРОЧЕЕ
    {
      category: 'other',
      questions: [
        {
          q: 'Есть ли промокоды?',
          a: 'Да! На первый заказ: ECOFIRST (10%). Ищите в Instagram/TG.'
        },
        {
          q: 'Программа лояльности?',
          a: 'Баллы: 1 ₽ = 1 балл. 1000 баллов = 100 ₽ скидка. Начисляем за каждый заказ.'
        },
        {
          q: 'Подарочные подписки?',
          a: 'Да! От 3 месяцев. Укажите получателя при оформлении.'
        }
      ]
    }
  ];

  // ФИЛЬТР ПО ПОИСКУ
  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
            <span className="font-semibold text-emerald-800">FAQ</span>
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
            Помощь и поддержка
          </motion.h1>
          <motion.p 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Ответы на все вопросы об EcoBox
          </motion.p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ CATEGORIES */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-6">
          {filteredFaq.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              {/* CATEGORY HEADER */}
              <div 
                className="flex items-center justify-between p-4 bg-white rounded-t-xl cursor-pointer"
                onClick={() => toggleCategory(category.category)}
              >
                <h2 className="text-xl font-bold text-emerald-800 flex items-center">
                  <FaQuestionCircle className="mr-2" />
                  {category.category === 'subscriptions' && 'Подписки'}
                  {category.category === 'products' && 'Товары'}
                  {category.category === 'delivery' && 'Доставка'}
                  {category.category === 'payment' && 'Оплата'}
                  {category.category === 'returns' && 'Возвраты'}
                  {category.category === 'other' && 'Прочее'}
                  <span className="ml-2 text-sm text-emerald-600">({category.questions.length})</span>
                </h2>
                <FaChevronDown 
                  className={`transition-transform ${openCategories[category.category] ? 'rotate-180' : ''}`} 
                />
              </div>

              {/* QUESTIONS */}
              {openCategories[category.category] && (
                <div className="bg-white rounded-b-xl divide-y divide-emerald-100">
                  {category.questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-4">
                      <button
                        className="w-full flex justify-between items-center text-left"
                        onClick={() => toggleQuestion(`${catIndex}-${qIndex}`)}
                      >
                        <span className="font-semibold text-emerald-800">{question.q}</span>
                        {activeIndex === `${catIndex}-${qIndex}` ? 
                          <FaMinus className="text-emerald-500" /> : 
                          <FaPlus className="text-emerald-500" />
                        }
                      </button>
                      {activeIndex === `${catIndex}-${qIndex}` && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-3 text-emerald-700 pl-4"
                        >
                          {question.a}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Не нашли ответ?</h2>
          <p className="text-xl mb-8">Напишите нам — поможем за 24 часа!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacts"
              className="bg-white text-emerald-800 px-8 py-4 rounded-full font-bold hover:bg-emerald-50"
            >
              Написать в поддержку
            </Link>
            <a
              href="tel:+74951234567"
              className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-emerald-800"
            >
              <FaPhone />
              <span>+7 (495) 123-45-67</span>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
              <p className="text-emerald-700">Вопросов решено</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">24ч</div>
              <p className="text-emerald-700">Среднее время ответа</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">5000+</div>
              <p className="text-emerald-700">Помогла клиентам</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FAQ;