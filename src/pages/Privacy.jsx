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

const Privacy = () => {
  return (
    <div className="min-h-screen bg-emerald-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* ЗАГОЛОВОК */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-4">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-emerald-600 max-w-3xl mx-auto">
            Последнее обновление: <strong>22 октября 2025</strong>
          </p>
        </div>

        {/* ВВЕДЕНИЕ */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FaShieldAlt className="text-3xl text-emerald-500 mt-1" />
            <h2 className="text-3xl font-bold text-emerald-800">1. Общие положения</h2>
          </div>
          <div className="space-y-4 text-emerald-700 leading-relaxed">
            <p>
              ООО "ЭкоБокс" (далее — <strong>Оператор</strong>) уважает конфиденциальность пользователей 
              и обязуется защищать их персональные данные в соответствии с Федеральным законом 
              от 27.07.2006 № 152-ФЗ "О персональных данных" и GDPR (EU) 2016/679.
            </p>
            <p><strong>Дата вступления в силу:</strong> 22 октября 2025</p>
            <p><strong>Контакты:</strong> privacy@ecobox.ru | +7 (495) 123-45-67</p>
          </div>
        </section>

        {/* 2. ПЕРСОНАЛЬНЫЕ ДАННЫЕ */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FaUser className="text-3xl text-emerald-500 mt-1" />
            <h2 className="text-3xl font-bold text-emerald-800">2. Какие данные мы собираем</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-emerald-700 mb-3">Обязательные данные:</h3>
              <ul className="space-y-2 text-emerald-600">
                <li>• ФИО</li>
                <li>• Email</li>
                <li>• Номер телефона</li>
                <li>• Адрес доставки</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-700 mb-3">Дополнительные данные:</h3>
              <ul className="space-y-2 text-emerald-600">
                <li>• Предпочтения товаров</li>
                <li>• История заказов</li>
                <li>• IP-адрес</li>
                <li>• Cookies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ЦЕЛИ СОБИРАНИЯ */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FaFileAlt className="text-3xl text-emerald-500 mt-1" />
            <h2 className="text-3xl font-bold text-emerald-800">3. Цели обработки данных</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaLock className="text-2xl" />, title: 'Оформление заказов', desc: 'Доставка коробок' },
              { icon: <FaCheckCircle className="text-2xl" />, title: 'Улучшение сервиса', desc: 'Персонализация' },
              { icon: <FaShieldAlt className="text-2xl" />, title: 'Безопасность', desc: 'Защита от мошенников' }
            ].map((item, i) => (
              <div key={i} className="text-center p-4 border rounded-xl">
                <div className="text-emerald-500 mb-2">{item.icon}</div>
                <h3 className="font-semibold text-emerald-700 mb-1">{item.title}</h3>
                <p className="text-sm text-emerald-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COOKIES */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FaCookie className="text-3xl text-emerald-500 mt-1" />
            <h2 className="text-3xl font-bold text-emerald-800">4. Cookies</h2>
          </div>
          <div className="space-y-4">
            <p className="text-emerald-700">
              Мы используем cookies для улучшения работы сайта. Вы можете управлять настройками в браузере.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold">Необходимые</h4>
                <p className="text-sm">Сохранение корзины, авторизация</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-semibold">Аналитика</h4>
                <p className="text-sm">Google Analytics (анонимно)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ПРАВА ПОЛЬЗОВАТЕЛЯ */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <FaExclamationTriangle className="text-3xl text-emerald-500 mt-1" />
            <h2 className="text-3xl font-bold text-emerald-800">5. Ваши права</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-emerald-700">
              <li><strong>Доступ:</strong> Запросить копию данных</li>
              <li><strong>Исправление:</strong> Уточнить некорректные данные</li>
              <li><strong>Удаление:</strong> "Право быть забытым"</li>
            </ul>
            <ul className="space-y-3 text-emerald-700">
              <li><strong>Ограничение:</strong> Остановить обработку</li>
              <li><strong>Переносимость:</strong> Получить данные в формате</li>
              <li><strong>Жалоба:</strong> В Роскомнадзор</li>
            </ul>
          </div>
        </section>

        {/* 6. БЕЗОПАСНОСТЬ */}
        <section className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">6. Безопасность данных</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              'SSL шифрование',
              '2FA аутентификация', 
              'Регулярные аудиты',
              'Хранение в РФ'
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-lg">
                <FaCheckCircle className="text-emerald-500" />
                <span className="text-emerald-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. КОНТАКТЫ */}
        <section className="bg-emerald-800 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-emerald-200 mb-2">Email</p>
              <p className="font-bold">privacy@ecobox.ru</p>
            </div>
            <div>
              <p className="text-emerald-200 mb-2">Телефон</p>
              <p className="font-bold">+7 (495) 123-45-67</p>
            </div>
            <div>
              <p className="text-emerald-200 mb-2">Адрес</p>
              <p className="font-bold">Москва, ул. Эко, 1</p>
            </div>
          </div>
        </section>

        {/* НАВИГАЦИЯ */}
        <div className="mt-12 text-center">
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700"
          >
            <FaShieldAlt />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;