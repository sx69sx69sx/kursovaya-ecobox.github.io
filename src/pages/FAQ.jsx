import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaQuestionCircle,
  FaChevronDown,
  FaSearch,
  FaPlus,
  FaMinus,
  FaPhone
} from 'react-icons/fa';

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

  // ДАННЫЕ FAQ
  const faqData = [
    {
      category: 'subscriptions',
      questions: [
        {
          q: 'Что такое подписка EcoBox?',
          a: 'Подписка — это ежемесячная доставка экологичных товаров. Выбираете тариф и получаете коробку с 5–12 товарами на дом.'
        },
        {
          q: 'Можно ли пропустить месяц?',
          a: 'Да. Личный кабинет → «Управление подпиской» → «Пропустить месяц». Оплата за этот месяц не списывается.'
        },
        {
          q: 'Как изменить тариф подписки?',
          a: 'Личный кабинет → «Моя подписка» → «Изменить тариф». Изменения вступают в силу со следующего месяца.'
        },
        {
          q: 'Что будет, если не оплатить подписку?',
          a: 'Мы напомним о платеже. Если оплата не проходит в течение 7 дней, подписка приостанавливается до оплаты.'
        },
        {
          q: 'Можно ли отменить подписку?',
          a: 'Да, в любой момент. Личный кабинет → «Управление подпиской» → «Отменить подписку». Текущий оплаченный месяц доставим в обычном порядке.'
        }
      ]
    },
    {
      category: 'products',
      questions: [
        {
          q: 'Безопасны ли товары для детей?',
          a: 'Все товары проходят сертификацию и не содержат парабенов, SLS и агрессивной химии. Для детей с особенностями здоровья уточняйте состав у врача.'
        },
        {
          q: 'Есть ли срок годности?',
          a: 'Да. Срок годности указан на упаковке. Мы отправляем только свежие партии с достаточным запасом по сроку.'
        },
        {
          q: 'Можно ли выбрать конкретные товары?',
          a: 'В части тарифов — да. В базовых коробках мы подбираем товары под ваши предпочтения (косметика / дом / гигиена).'
        },
        {
          q: 'Как узнать состав товара?',
          a: 'Полный состав указан на странице товара и на упаковке. Мы стараемся использовать максимально понятные ингредиенты.'
        },
        {
          q: 'Где посмотреть предыдущие коробки?',
          a: 'Личный кабинет → «История заказов» → выбранный месяц. Там отображается состав коробки и список товаров.'
        }
      ]
    },
    {
      category: 'delivery',
      questions: [
        {
          q: 'Сколько стоит доставка?',
          a: 'При заказе от 1500 ₽ — бесплатно. Ниже этой суммы стоимость зависит от выбранной службы доставки и региона.'
        },
        {
          q: 'Сколько времени занимает доставка?',
          a: 'В среднем 1–3 дня по России. Для отдалённых регионов срок может быть больше — актуальный срок отображается при оформлении заказа.'
        },
        {
          q: 'Можно ли изменить адрес доставки?',
          a: 'Да, до передачи заказа в службу доставки. Напишите нам или обновите адрес в личном кабинете в разделе «Доставка».'
        },
        {
          q: 'Что такое эко-упаковка?',
          a: 'Мы используем крафтовые коробки, бумажный скотч и перерабатываемый наполнитель — без пузырчатой плёнки и лишнего пластика.'
        },
        {
          q: 'Работаете ли вы в праздники?',
          a: 'В большинстве праздников мы работаем по сокращённому графику. Актуальный режим всегда указан на странице доставки и в соцсетях.'
        }
      ]
    },
    {
      category: 'payment',
      questions: [
        {
          q: 'Какие способы оплаты доступны?',
          a: 'Банковские карты, СБП и другие распространённые способы. Подписка оформляется только по карте для автоматического продления.'
        },
        {
          q: 'Безопасна ли онлайн-оплата?',
          a: 'Мы используем защищённые платёжные шлюзы. Данные карты не хранятся у нас и передаются в зашифрованном виде.'
        },
        {
          q: 'Где можно скачать чек?',
          a: 'Личный кабинет → «История заказов» → нужный заказ → «Скачать чек». Дубликат чека приходит на email.'
        },
        {
          q: 'Есть ли скидка за предоплату?',
          a: 'Иногда мы проводим акции с дополнительной скидкой при оплате сразу нескольких месяцев подписки. Следите за новостями.'
        },
        {
          q: 'Как вернуть деньги при отмене?',
          a: 'При согласованном возврате мы оформляем возврат на ту же карту, с которой была оплата. Срок зачисления зависит от банка (обычно до 5 рабочих дней).'
        }
      ]
    },
    {
      category: 'returns',
      questions: [
        {
          q: 'Можно ли вернуть товар?',
          a: 'В течение 14 дней вы можете оформить возврат ненадлежащего товара. Для этого напишите нам и приложите фото проблемы.'
        },
        {
          q: 'Кто оплачивает обратную доставку?',
          a: 'Если подтверждён производственный брак — обратную доставку оплачиваем мы. В остальных случаях — покупатель.'
        },
        {
          q: 'Как оформить возврат подписки?',
          a: 'Отмена подписки действует на будущие поставки. Уже сформированную и отправленную коробку можно вернуть как обычный заказ по правилам магазина.'
        }
      ]
    },
    {
      category: 'other',
      questions: [
        {
          q: 'Есть ли промокоды для новых клиентов?',
          a: 'Иногда мы публикуем промокоды в рассылке и соцсетях. Подпишитесь на наш Telegram и email, чтобы не пропускать акции.'
        },
        {
          q: 'Есть программа лояльности?',
          a: 'Да, за каждый заказ начисляются бонусы, которыми можно оплатить часть следующей покупки.'
        },
        {
          q: 'Можно ли оформить подписку в подарок?',
          a: 'Да. При оформлении укажите получателя и адрес доставки — мы отправим коробки напрямую ему, а чеки останутся у вас.'
        }
      ]
    }
  ];

  // Фильтрация по поиску
  const filteredFaq = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter((category) => category.questions.length > 0);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleQuestion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const getCategoryTitle = (key) => {
    switch (key) {
      case 'subscriptions':
        return 'Подписки';
      case 'products':
        return 'Товары';
      case 'delivery':
        return 'Доставка';
      case 'payment':
        return 'Оплата';
      case 'returns':
        return 'Возвраты';
      case 'other':
        return 'Прочее';
      default:
        return key;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER / КРОШКИ */}
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
              FAQ
            </span>
          </div>

          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="border-b border-black/10 pb-10 mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/50 mb-3">
            Помощь и поддержка
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-3">
            Ответы на частые вопросы
          </h1>
          <p className="text-sm md:text-base text-black/60 max-w-2xl mx-auto">
            Здесь собраны основные вопросы о подписке, доставке, оплате и
            товарах. Введите ключевое слово в поиск или раскройте нужную
            категорию.
          </p>
        </section>

        {/* ПОИСК */}
        <section className="mb-10">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-black/20 pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-black"
            />
          </div>
        </section>

        {/* КАТЕГОРИИ + ВОПРОСЫ */}
        <section className="mb-16">
          {filteredFaq.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: catIndex * 0.03 }}
              className="mb-6 border border-black/10"
            >
              {/* Заголовок категории */}
              <button
                type="button"
                onClick={() => toggleCategory(category.category)}
                className="w-full px-4 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle className="text-sm" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em]">
                      {getCategoryTitle(category.category)}
                    </p>
                    <p className="text-[11px] text-black/50">
                      {category.questions.length} вопрос(ов)
                    </p>
                  </div>
                </div>
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    openCategories[category.category] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Список вопросов */}
              {openCategories[category.category] && (
                <div className="border-t border-black/5">
                  {category.questions.map((question, qIndex) => {
                    const indexKey = `${catIndex}-${qIndex}`;
                    const isActive = activeIndex === indexKey;
                    return (
                      <div key={indexKey} className="border-t border-black/5">
                        <button
                          type="button"
                          onClick={() => toggleQuestion(indexKey)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left text-sm"
                        >
                          <span className="pr-4">{question.q}</span>
                          {isActive ? (
                            <FaMinus className="text-[10px]" />
                          ) : (
                            <FaPlus className="text-[10px]" />
                          )}
                        </button>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="px-4 pb-4 text-[13px] text-black/75"
                          >
                            {question.a}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}

          {filteredFaq.length === 0 && (
            <p className="text-sm text-black/60">
              По вашему запросу ничего не найдено. Попробуйте изменить формулировку.
            </p>
          )}
        </section>

        {/* CTA + КОНТАКТЫ */}
        <section className="border border-black/10 px-6 py-8 mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-3">
            Не нашли ответ
          </p>
          <p className="text-sm text-black/75 mb-6 max-w-md mx-auto">
            Напишите нам — команда поддержки поможет с подпиской, оплатой,
            доставкой и подбором товаров.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
            >
              Связаться через форму
            </Link>
            <a
              href="tel:+74951234567"
              className="inline-flex items-center justify-center px-8 py-3 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
            >
              <FaPhone className="text-[11px] mr-2" />
              +7 (495) 123-45-67
            </a>
          </div>
        </section>

        {/* НЕБОЛЬШАЯ СТАТИСТИКА */}
        <section className="mb-4">
          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="border border-black/10 px-4 py-4">
              <p className="text-xl font-semibold mb-1">98%</p>
              <p className="text-black/70 text-[13px]">
                запросов решаем с первого обращения
              </p>
            </div>
            <div className="border border-black/10 px-4 py-4">
              <p className="text-xl font-semibold mb-1">24 ч</p>
              <p className="text-black/70 text-[13px]">
                среднее время полного ответа
              </p>
            </div>
            <div className="border border-black/10 px-4 py-4">
              <p className="text-xl font-semibold mb-1">5000+</p>
              <p className="text-black/70 text-[13px]">
                клиентов уже пользуются поддержкой
              </p>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default FAQ;
