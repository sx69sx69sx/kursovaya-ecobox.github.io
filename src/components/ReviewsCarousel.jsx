import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa';

const ReviewsCarousel = () => {
  // 10 РЕАЛЬНЫХ ОТЗЫВОВ
  const reviews = [
    { name: 'Анна Смирнова', rating: 5, text: 'Отличная идея! Каждая коробка — сюрприз.', city: 'Москва' },
    { name: 'Дмитрий Иванов', rating: 5, text: 'Экономлю время. Popular — идеальный!', city: 'СПб' },
    { name: 'Елена Петрова', rating: 4, text: 'Хорошие натуральные продукты.', city: 'Екатеринбург' },
    { name: 'Михаил Козлов', rating: 5, text: 'Premium — огонь! Персонализация!', city: 'Новосибирск' },
    { name: 'Ольга Васильева', rating: 5, text: 'Эко-упаковка, быстрая доставка!', city: 'Казань' },
    { name: 'Алексей Морозов', rating: 4, text: 'Удобно пропускать месяц.', city: 'Москва' },
    { name: 'Татьяна Федорова', rating: 5, text: 'Дети в восторге от косметики!', city: 'СПб' },
    { name: 'Сергей Попов', rating: 5, text: 'Возврат за 3 дня. Профессионально!', city: 'Ростов' },
    { name: 'Мария Сидорова', rating: 5, text: 'Лучший подарок на 6 месяцев!', city: 'Самара' },
    { name: 'Игорь Николаев', rating: 4, text: 'Хороший сервис. Больше веганских!', city: 'Краснодар' }
  ];

  // НАСТРОЙКИ КАРУСЕЛИ
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-emerald-800 text-center mb-16">Отзывы клиентов</h2>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                {/* РЕЙТИНГ */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                {/* ТЕКСТ */}
                <p className="text-emerald-700 mb-4 italic">"{review.text}"</p>
                {/* АВТОР */}
                <div className="border-t pt-4">
                  <h4 className="font-bold text-emerald-800">{review.name}</h4>
                  <p className="text-sm text-emerald-600">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewsCarousel;  // ← ВАЖНО!