import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewsCarousel = () => {
  const reviews = [
    { name: 'Анна Смирнова', rating: 5, text: 'Каждая коробка — сюрприз.', city: 'Москва' },
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

  const ArrowButton = ({ className, style, onClick, direction }) => (
    <button
      type="button"
      onClick={onClick}
      className={`
        hidden md:flex items-center justify-center
        w-10 h-10 rounded-full border border-white
        bg-black/60 text-white
        hover:bg-white hover:text-black
        transition-all duration-300
        absolute top-1/2 -translate-y-1/2 z-10
        ${direction === 'prev' ? '-left-4 md:-left-10' : '-right-4 md:-right-10'}
      `}
    >
      {direction === 'prev' ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease-out",
    pauseOnHover: false,
    arrows: true,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
    appendDots: dots => (
      <div style={{ marginTop: "40px" }}>
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-[10px] h-[6px] bg-white/40 hover:bg-white transition duration-300 mt-10"></div>
    ),
  };

  return (
    <section className="py-24 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="px-4 group">
              <div
                className="
                  border border-white/20 p-8 h-full
                  transition-all duration-500 
                  bg-black
                  group-hover:bg-white group-hover:text-black
                "
              >
                <div className="flex gap-[2px] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating
                          ? "text-white group-hover:text-black transition"
                          : "text-white/25 group-hover:text-black/25 transition"
                      }
                    />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed mb-6 italic">
                  “{review.text}”
                </p>

                <div className="border-top border-white/20 pt-4 border-t">
                  <h4 className="font-medium text-[16px]">{review.name}</h4>
                  <p className="text-sm opacity-70">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
