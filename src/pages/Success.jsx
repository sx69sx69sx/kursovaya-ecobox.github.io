// Success.jsx — обновлённая версия с PDF-чеком и QR-кодом
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
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
      plan: "Популярная",
      price: 1611,
      items: 5,
      name: "Иванов Иван",
      phone: "+7 (999) 123-45-67",
      city: "Москва",
      address: "ул. Ленина, д. 5",
    };

  const [countdown, setCountdown] = useState(7);

  // ✔ Только одно уведомление
  useEffect(() => {
    toast.success("Ваша подписка успешно оформлена");
  }, []);

  // ✔ Проверка авторизации + сохранение подписки
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
  }, [user, state, navigate, createSubscription, planData]);

  // Таймер до первой доставки
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

const generateReceipt = async () => {
  const doc = new jsPDF({
    unit: "mm",
    format: [58, 230], // узкий чек
  });

  // Моноширинный шрифт, только латиница
  doc.setFont("courier", "normal");
  doc.setFontSize(8);

  let y = 6;
  const left = 4;

  const print = (text = "", align = "left") => {
    // гарантируем только ASCII-символы
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

  // Дата / время (оставляем цифры и точки — это ASCII)
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

  // Строка для QR (формат ФНС, упрощённый)
  const qrString = `t=${yyyy}${mm}${dd}T${hh}${mi}${ss}&s=${total}&fn=9990000000000&i=123456&fp=987654321&n=1`;

  // Генерация QR
  const qr = await QRCode.toDataURL(qrString, {
    margin: 0,
    width: 200,
    color: { dark: "#000000", light: "#FFFFFF" },
  });

  // ---------- ШАПКА ----------
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

  // ---------- ТОВАР / УСЛУГА ----------
  print("1. PODPISKA ECOBOX");
  print(`1 x ${total} = ${total}`, "right");
  line();

  // ---------- ИТОГ ----------
  print(`ITOG: ${total} RUB`, "right");
  print(`OPLATA KARTOY: ${total}`, "right");
  print("NDS: BEZ NDS");
  line();

  // ---------- КРАТКО О ДОСТАВКЕ (БЕЗ КИРИЛЛИЦЫ) ----------
  print("DOSTAVKA: PO PODPISKE");
  print("ADRES: SM. LICHNYI KABINET");
  line();

  // ---------- QR-КОД ----------
  const qrSize = 30; // мм
  const qrX = (58 - qrSize) / 2;
  const qrY = y;

  doc.addImage(qr, "PNG", qrX, qrY, qrSize, qrSize);
  y = qrY + qrSize + 4;

  print("SPASIBO ZA POKUPKU!", "center");

  doc.save(`EcoBox_Check_${dateStr.replace(/\./g, "-")}.pdf`);
};


  // ================================
  // UI
  // ================================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-neutral-50"
    >
      {/* HEADER */}
      <div className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link
            to="/"
            className="flex items-center text-neutral-600 hover:text-black"
          >
            <FaArrowLeft className="mr-2" /> На главную
          </Link>
        </div>
      </div>

      {/* TITLE */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <div className="mx-auto w-20 h-20 flex items-center justify-center border border-black">
          <FaCheckCircle className="text-4xl text-green-600" />
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-neutral-900">
          Подписка оформлена
        </h1>

        <p className="mt-2 text-neutral-600">
          Добро пожаловать в тариф <strong>{planData.plan}</strong>.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-10">
        {/* LEFT 2/3 */}
        <div className="md:col-span-2 space-y-8">
          {/* ДЕТАЛИ ПОДПИСКИ */}
          <div className="border border-black p-8 bg-white">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FaCrown className="text-yellow-500" /> Детали подписки
            </h2>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-neutral-500">Тариф</p>
                <p className="font-semibold">{planData.plan}</p>
              </div>

              <div>
                <p className="text-neutral-500">Стоимость</p>
                <p className="font-semibold">{planData.price} ₽ / месяц</p>
              </div>

              <div>
                <p className="text-neutral-500">Товаров в коробке</p>
                <p className="font-semibold">{planData.items}</p>
              </div>

              <div>
                <p className="text-neutral-500">Адрес доставки</p>
                <p className="font-semibold">{planData.address}</p>
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="font-semibold text-neutral-700 text-center">
                Первая доставка через{" "}
                <span className="text-green-700">
                  {countdown > 0 ? countdown : 0}
                </span>{" "}
                дней
              </p>
            </div>
          </div>

          {/* ЧТО ВХОДИТ */}
          <div className="border border-black p-8 bg-white">
            <h2 className="text-xl font-bold mb-6">Что входит</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaBox /> {planData.items} экологичных товаров
              </div>

              <div className="flex items-center gap-3">
                <FaTruck /> Бесплатная доставка по России
              </div>

              <div className="flex items-center gap-3">
                <FaGift /> Ежемесячные бонусы и сюрпризы
              </div>

              <div className="flex items-center gap-3">
                <FaShieldAlt /> 14 дней на обращение по качеству
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarAlt /> Автоматическое продление подписки
              </div>
            </div>
          </div>

          {/* ОТЗЫВЫ / СОЦДОКАЗАТЕЛЬСТВО */}
          <div className="border border-black p-8 bg-white">
            <h2 className="text-xl font-bold mb-6">Мнение клиентов</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {[
                {
                  author: "Анна, Москва",
                  text: "Коробка всегда аккуратная и без лишнего пластика.",
                },
                {
                  author: "Дмитрий, СПБ",
                  text: "Не думаю о покупках бытовой химии — всё приходит само.",
                },
                {
                  author: "Елена, Казань",
                  text: "Минимализм, экология и подписка — идеальное сочетание.",
                },
              ].map((r, i) => (
                <div key={i} className="border border-black/20 p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, j) => (
                      <FaStar key={j} className="text-[10px]" />
                    ))}
                  </div>
                  <p className="mb-2 text-neutral-700">"{r.text}"</p>
                  <p className="text-xs text-neutral-500">{r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 1/3 */}
        <div className="space-y-6">
          {/* PRICE BLOCK */}
          <div className="border border-black p-8 bg-white text-center">
            <div className="text-4xl font-black">{planData.price}</div>
            <p className="text-neutral-500">₽ / месяц</p>
          </div>

          {/* BUTTONS */}
          <div className="space-y-3">
            <Link
              to="/profile"
              className="block w-full border border-black text-center py-3 font-bold text-sm tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
            >
              <FaUser className="inline mr-2" />
              ЛИЧНЫЙ КАБИНЕТ
            </Link>

            <button
              onClick={generateReceipt}
              className="block w-full border border-black text-center py-3 font-bold text-sm tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
            >
              <FaDownload className="inline mr-2" />
              СКАЧАТЬ ЧЕК (PDF)
            </button>

            <Link
              to="/subscription/manage"
              className="block w-full border border-black text-center py-3 font-bold text-sm tracking-[0.15em] hover:bg-black hover:text-white transition-colors"
            >
              <FaFileInvoice className="inline mr-2" />
              УПРАВЛЕНИЕ ПОДПИСКОЙ
            </Link>
          </div>

          {/* ECO MESSAGE */}
          <div className="border border-black bg-neutral-50 p-4 text-center text-sm">
            <FaLeaf className="text-green-700 mx-auto mb-2" />
            <p className="text-neutral-700">
              Каждый месяц ваша подписка помогает сократить одноразовый пластик.
            </p>
          </div>

          {/* STATS */}
          <div className="border border-black bg-white p-6 text-center text-sm">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <FaUsers className="mx-auto mb-1" />
                <p className="text-xs text-neutral-500">клиентов</p>
                <p className="font-semibold">10 000+</p>
              </div>
              <div>
                <FaStar className="mx-auto mb-1" />
                <p className="text-xs text-neutral-500">рейтинг</p>
                <p className="font-semibold">4.9</p>
              </div>
              <div>
                <FaBox className="mx-auto mb-1" />
                <p className="text-xs text-neutral-500">коробок в месяц</p>
                <p className="font-semibold">5000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Success;
