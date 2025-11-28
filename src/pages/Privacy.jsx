import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaLock,
  FaUser,
  FaFileAlt,
  FaCookie,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-black/60">
      {index.toString().padStart(2, '0')}
    </span>
    <span className="flex-1 h-px bg-black" />
    <h2 className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em]">
      {children}
    </h2>
  </div>
);

const Privacy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER / ХЛЕБНЫЕ КРОШКИ */}
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
              Политика
            </span>
          </div>
          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-18">
        {/* HERO — ЧЁРНАЯ ПОЛОСА (ОБНОВЛЁННАЯ, БОЛЕЕ ЛЁГКАЯ) */}
        <section className="mt-10 mb-14">
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black text-white border border-black overflow-hidden"
          >
            <div className="grid md:grid-cols-[2.4fr,1.6fr]">
              {/* ЛЕВАЯ ЧАСТЬ — КРАТКО И ЧИТАЕМО */}
              <div className="px-8 lg:px-10 py-8 lg:py-10 border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/55 mb-3">
                  Политика конфиденциальности
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase mb-3">
                  Обработка персональных данных
                </h1>
                <p className="text-[13px] md:text-sm text-white/75 mb-4 max-w-md">
                  Коротко: мы используем только необходимые данные, не продаём их
                  и даём вам полный контроль.
                </p>
                <p className="text-[12px] text-white/60">
                  Последнее обновление:{' '}
                  <span className="font-semibold text-white">
                    22 октября 2025
                  </span>
                </p>
              </div>

              {/* ПРАВАЯ ЧАСТЬ — ДВА АККУРАТНЫХ ФАКТА */}
              <div className="px-8 lg:px-10 py-8 lg:py-10 bg-black/90 text-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/12 pb-4">
                    <span className="uppercase tracking-[0.25em] text-white/60">
                      Запрос данных
                    </span>
                    <span className="text-base md:text-lg font-semibold">
                      Бесплатно
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.25em] text-white/60">
                      Ответ на запрос
                    </span>
                    <span className="text-base md:text-lg font-semibold">
                      до 30 дней
                    </span>
                  </div>
                </div>
                <p className="mt-6 text-[11px] text-white/55">
                  По любым вопросам: <span className="font-semibold">privacy@ecobox.ru</span>
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 1. ОБЩИЕ ПОЛОЖЕНИЯ */}
        <section className="mb-10 text-sm">
          <SectionLabel index={1}>Общие положения</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Оператор и ответственность
              </p>
            </div>
            <div className="space-y-3 text-[13px] leading-relaxed">
              <p>
                ООО «ЭкоБокс» (далее —{' '}
                <span className="font-semibold">Оператор</span>) уважает
                конфиденциальность пользователей и обрабатывает персональные
                данные в соответствии с Федеральным законом от 27.07.2006
                № 152-ФЗ «О персональных данных» и иными применимыми
                нормами законодательства о защите данных.
              </p>
              <p>
                <span className="font-semibold">Дата вступления в силу:</span>{' '}
                22 октября 2025.
              </p>
              <p>
                <span className="font-semibold">
                  Контакты по вопросам персональных данных:
                </span>{' '}
                privacy@ecobox.ru • +7 (495) 123-45-67.
              </p>
            </div>
          </div>
        </section>

        {/* 2. КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ */}
        <section className="mb-10 text-sm">
          <SectionLabel index={2}>Какие данные мы собираем</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaUser className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Категории данных
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Обязательные данные
                </p>
                <ul className="text-[13px] space-y-1">
                  <li>• ФИО</li>
                  <li>• Email</li>
                  <li>• Номер телефона</li>
                  <li>• Адрес доставки</li>
                  <li>• Данные для оплаты (частично, через платёжных партнёров)</li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/60 mb-2">
                  Дополнительные данные
                </p>
                <ul className="text-[13px] space-y-1">
                  <li>• Предпочтения по товарам и категориям</li>
                  <li>• История заказов и подписок</li>
                  <li>• Технические данные (IP-адрес, тип устройства, браузер)</li>
                  <li>• Файлы cookie и аналогичные технологии</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ЦЕЛИ ОБРАБОТКИ */}
        <section className="mb-10 text-sm">
          <SectionLabel index={3}>Цели обработки</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaFileAlt className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Для чего мы используем данные
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-[13px]">
              {[
                {
                  icon: <FaLock className="text-xs" />,
                  title: 'Оформление и доставка заказов',
                  desc: 'Обработка заказов, подписок, платежей и уведомлений о статусе.'
                },
                {
                  icon: <FaCheckCircle className="text-xs" />,
                  title: 'Улучшение сервиса',
                  desc: 'Персональные рекомендации, аналитика спроса и улучшение интерфейса.'
                },
                {
                  icon: <FaShieldAlt className="text-xs" />,
                  title: 'Безопасность',
                  desc: 'Предотвращение мошенничества и несанкционированного доступа.'
                }
              ].map((item, i) => (
                <div key={i} className="border border-black/10 px-4 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <p className="text-[11px] uppercase tracking-[0.2em]">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-black/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. COOKIE */}
        <section className="mb-10 text-sm">
          <SectionLabel index={4}>Файлы cookie</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaCookie className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Cookie и аналогичные технологии
              </p>
            </div>
            <div className="space-y-3 text-[13px]">
              <p>
                Мы используем cookie и аналогичные технологии для работы сайта,
                аналитики и персонализации. Вы можете ограничить или отключить
                использование cookie в настройках браузера — в этом случае часть
                функций сайта может быть недоступна.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="border border-black/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-1">
                    Необходимые
                  </p>
                  <p className="text-black/70 text-[13px]">
                    Обеспечивают работу корзины, авторизацию, сохранение
                    настроек и стабильное функционирование сайта.
                  </p>
                </div>
                <div className="border border-black/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-1">
                    Аналитика и статистика
                  </p>
                  <p className="text-black/70 text-[13px]">
                    Помогают понимать, как используется сайт, и улучшать
                    интерфейс. Данные обрабатываются в обезличенном виде.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ПРАВА ПОЛЬЗОВАТЕЛЯ */}
        <section className="mb-10 text-sm">
          <SectionLabel index={5}>Ваши права</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Управление персональными данными
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-[13px]">
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Доступ.</span> Вы можете
                  запросить копию хранящихся у нас персональных данных.
                </li>
                <li>
                  <span className="font-semibold">Исправление.</span> Вы вправе
                  уточнить или обновить свои данные, если они устарели или
                  неверны.
                </li>
                <li>
                  <span className="font-semibold">Удаление.</span> В ряде
                  случаев вы можете запросить удаление данных («право быть
                  забытым»), если это не противоречит законодательству.
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">Ограничение обработки.</span>{' '}
                  Вы можете временно ограничить обработку данных.
                </li>
                <li>
                  <span className="font-semibold">Переносимость.</span> Мы можем
                  подготовить данные в машиночитаемом формате по вашему запросу.
                </li>
                <li>
                  <span className="font-semibold">Жалоба.</span> Вы имеете
                  право обратиться с жалобой в уполномоченный орган по защите
                  прав субъектов персональных данных.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. БЕЗОПАСНОСТЬ */}
        <section className="mb-10 text-sm">
          <SectionLabel index={6}>Безопасность данных</SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaLock className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Как мы защищаем информацию
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-3 text-[13px]">
              {[
                'Используем шифрование (HTTPS/SSL).',
                'Ограничиваем доступ к данным внутри компании.',
                'Регулярно обновляем программное обеспечение и проводим проверки.',
                'Храним данные на серверах в соответствии с требованиями законодательства.'
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-black/10 px-3 py-3 flex items-start gap-2"
                >
                  <FaCheckCircle className="text-[11px] mt-[2px]" />
                  <span className="text-black/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. КОНТАКТЫ ПО ВОПРОСАМ ДАННЫХ */}
        <section className="mb-12 text-sm">
          <SectionLabel index={7}>
            Контакты по вопросам конфиденциальности
          </SectionLabel>
          <div className="border border-black/10 px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-sm" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-black/70">
                Как с нами связаться
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-[13px]">
              <div className="border border-black/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/60 mb-1">
                  Email
                </p>
                <p className="font-semibold">privacy@ecobox.ru</p>
              </div>
              <div className="border border-black/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/60 mb-1">
                  Телефон
                </p>
                <p className="font-semibold">+7 (495) 123-45-67</p>
              </div>
              <div className="border border-black/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/60 mb-1">
                  Почтовый адрес
                </p>
                <p className="font-semibold">
                  ул. Малая Дмитровка, 15, Москва, Россия, 127006
                </p>
              </div>
            </div>
            <p className="text-[11px] text-black/50 mt-3">
              При обращении по вопросам обработки данных, пожалуйста, указывайте
              тему «Персональные данные».
            </p>
          </div>
        </section>

        {/* НАВИГАЦИЯ */}
        <section className="pb-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-4 border border-black text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            <FaShieldAlt className="text-[12px] mr-2" />
            Вернуться на главную
          </Link>
        </section>
      </main>
    </motion.div>
  );
};

export default Privacy;
