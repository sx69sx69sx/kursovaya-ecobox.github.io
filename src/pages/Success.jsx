// Success.jsx — страница оформления подписки без анимаций и лишних уведомлений
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaCrown,
  FaTruck,
  FaBox,
  FaStar,
  FaGift,
  FaUsers,
  FaShieldAlt,
  FaCalendarAlt,
  FaDownload,
  FaFileInvoice,
  FaUser,
  FaLeaf,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, createSubscription } = useAuth();

  const state = location.state;

  const planData =
    state || {
      price: 1611,
      items: 5,
      name: "Иванов Иван",
      phone: "+7 (999) 123-45-67",
      city: "Москва",
      address: "ул. Ленина, д. 5",
    };

  // Проверка авторизации + сохранение подписки (без уведомлений)
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          from: "/success",
          planData,
        },
      });
      return;
    }

    if (user && state && !user.subscription) {
      createSubscription({
        plan: planData.plan,
        price: planData.price,
        items: planData.items,
      });
    }
  }, [user, state, navigate, createSubscription]); // planData тут логически привязан к state

  const generateReceipt = async () => {
    const doc = new jsPDF({
      unit: "mm",
      format: [58, 230],
    });

    doc.setFont("courier", "normal");
    doc.setFontSize(8);

    let y = 6;
    const left = 4;

    const print = (text = "", align = "left") => {
      text = String(text).replace(/[^\x20-\x7E]/g, "");

      if (align === "center") {
        const tw = doc.getTextWidth(text);
        doc.text(text, (58 - tw) / 2, y);
      } else if (align === "right") {
        const tw = doc.getTextWidth(text);
        doc.text(text, 58 - 4 - tw, y);
      } else {
        doc.text(text, left, y);
      }
      y += 4;
    };

    const line = () => print("--------------------------------");

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    const dateStr = `${dd}.${mm}.${yyyy}`;
    const timeStr = `${hh}:${mi}:${ss}`;
    const total = Number(planData.price || 0).toFixed(2);

    const qrString = `t=${yyyy}${mm}${dd}T${hh}${mi}${ss}&s=${total}&fn=9990000000000&i=123456&fp=987654321&n=1`;

    const qr = await QRCode.toDataURL(qrString, {
      margin: 0,
      width: 200,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    print('OOO "ECOBOX"', "center");
    print("INN 7700000000", "center");
    print("KKT 0000000001", "center");
    line();

    print("KASSOVYI CHEK", "center");
    print("PRIHOD", "center");
    line();

    print(`DATA:  ${dateStr}`);
    print(`VREMYA: ${timeStr}`);
    line();

    print("1. PODPISKA ECOBOX");
    print(`1 x ${total} = ${total}`, "right");
    line();

    print(`ITOG: ${total} RUB`, "right");
    print(`OPLATA KARTOY: ${total}`, "right");
    print("NDS: BEZ NDS");
    line();

    print("DOSTAVKA: PO PODPISKE");
    print("ADRES: SM. LICHNYI KABINET");
    line();

    const qrSize = 30;
    const qrX = (58 - qrSize) / 2;
    const qrY = y;

    doc.addImage(qr, "PNG", qrX, qrY, qrSize, qrSize);
    y = qrY + qrSize + 4;

    print("SPASIBO ZA POKUPKU!", "center");

    doc.save(`EcoBox_Check_${dateStr.replace(/\./g, "-")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER / ХЛЕБНЫЕ КРОШКИ */}
      <header className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px]">
            <Link
              to="/"
              className="uppercase tracking-[0.25em] text-black/60 hover:text-black transition-colors flex items-center"
            >
              <span className="mr-2 text-[10px]">←</span>
              Главная
            </Link>
            <span className="text-black/30">/</span>
            <span className="uppercase tracking-[0.25em] text-black">
              Подписка оформлена
            </span>
          </div>
          <div className="hidden md:block text-[11px] uppercase tracking-[0.3em] text-black/50">
            Экологичные товары по подписке
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO / ОСНОВНОЙ БЛОК */}
        <section className="border border-black bg-black text-white mb-12">
          <div className="grid md:grid-cols-[2fr,1.2fr]">
            {/* Левая часть */}
            <div className="px-8 py-8 md:py-10 border-b md:border-b-0">


              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase mb-3">
                Спасибо! Подписка оформлена
              </h1>
              <p className="text-sm md:text-[15px] text-white/75 max-w-xl mb-4">
                Мы соберём вашу коробку и отправим её на ваш адрес.
              </p>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
                Стоимость: {planData.price} ₽ / месяц • {planData.items} товаров
              </p>
            </div>

            {/* Правая часть — краткая сводка */}
            <div className="px-8 py-8 md:py-10 bg-black/95 text-[13px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Цена</span>
                  <span className="font-semibold">{planData.price} ₽ / мес</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Товаров в коробке</span>
                  <span className="font-semibold">{planData.items}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60 mb-1">Адрес доставки</span>
                  <span className="font-medium">
                    {planData.address || "Адрес будет указан в личном кабинете"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ОСНОВНОЙ КОНТЕНТ */}
        <section className="grid md:grid-cols-3 gap-10 mb-16">
          {/* ЛЕВАЯ ЧАСТЬ (2/3) */}
          <div className="md:col-span-2 space-y-10">
            {/* Детали подписки */}
            <div className="border border-black/12 bg-white px-7 py-7">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-black/70 mb-5">
                Детали подписки
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1">
                    Тариф
                  </p>
                  <p className="font-semibold text-black/90">{planData.plan}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1">
                    Стоимость
                  </p>
                  <p className="font-semibold text-black/90">
                    {planData.price} ₽ / месяц
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1">
                    Товаров в коробке
                  </p>
                  <p className="font-semibold text-black/90">{planData.items}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1">
                    Доставка
                  </p>
                  <p className="font-semibold text-black/90">
                    В течение 5 дней
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-black/10 pt-4 text-[12px] text-black/60">
                Подписка продлевается автоматически раз в месяц. 
              </div>
            </div>

            {/* Что входит */}
            <div className="border border-black/12 bg-white px-7 py-7">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-black/70 mb-5">
                Что входит в коробку
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <FaBox className="text-[13px]" />
                  <span>{planData.items} отобранных эко-товаров каждый месяц</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaTruck className="text-[13px]" />
                  <span>Бесплатная доставка по России</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaGift className="text-[13px]" />
                  <span>Бонусы и небольшие сюрпризы в отдельных поставках</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-[13px]" />
                  <span>14 дней на обращение по вопросам качества</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[13px]" />
                  <span>Автоматическое продление с напоминанием перед списанием</span>
                </div>
              </div>
            </div>

            {/* Мнение клиентов */}
            <div className="border border-black/12 bg-white px-7 py-7">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-black/70 mb-5">
                Отзывы клиентов
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-[13px]">
                {[
                  {
                    author: "Анна, Москва",
                    text: "Коробка всегда аккуратная и без лишнего пластика.",
                  },
                  {
                    author: "Дмитрий, СПБ",
                    text: "Не думаю о бытовой химии — всё приходит само.",
                  },
                  {
                    author: "Елена, Казань",
                    text: "Минимализм, экология и подписка — идеальное сочетание.",
                  },
                ].map((r, i) => (
                  <div key={i} className="border border-black/15 px-4 py-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, j) => (
                        <FaStar key={j} className="text-[10px]" />
                      ))}
                    </div>
                    <p className="mb-2 text-black/75">“{r.text}”</p>
                    <p className="text-[11px] text-black/50">{r.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div className="space-y-6">
            {/* Цена / тариф */}
            <div className="border border-black/12 bg-white px-6 py-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-2">
                Текущий тариф
              </p>
              <div className="text-3xl font-extrabold mb-1">
                {planData.price} ₽
              </div>
              <p className="text-[11px] text-black/60 uppercase tracking-[0.25em]">
                в месяц
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <Link
                to="/profile"
                className="block w-full border border-black text-center py-3 text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
              >
                <FaUser className="inline mr-2 text-[12px]" />
                Личный кабинет
              </Link>

              <button
                onClick={generateReceipt}
                className="block w-full border border-black text-center py-3 text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
              >
                <FaDownload className="inline mr-2 text-[12px]" />
                Скачать чек (PDF)
              </button>


            </div>

            {/* Эко-сообщение */}
            <div className="border border-black/12 bg-black text-white px-5 py-5 text-center text-[13px]">
              <FaLeaf className="mx-auto mb-2 text-[16px]" />
              <p className="text-white/80">
                Каждый месяц ваша подписка помогает сократить количество 
                одноразового пластика и поддерживает ответственных производителей.
              </p>
            </div>

          </div>
        </section>

        {/* НИЖНИЙ CTA */}
        <section className="border-t border-black/10 pt-8 pb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-black/60 mb-3">
            Хотите посмотреть другие товары?
          </p>
          <p className="text-sm text-black/70 mb-5">
            Загляните в каталог — вы можете добавить разовые покупки к вашей подписке.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-10 py-4 border border-black text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          >
            Перейти в каталог
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Success;
