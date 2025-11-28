import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  FaCrown,
  FaCreditCard,
  FaEdit,
  FaDownload,
  FaBell,
  FaArrowLeft,
  FaCheckCircle,
  FaPhone,
  FaFileInvoice,
  FaUser,
  FaPlusCircle,
} from "react-icons/fa";
import jsPDF from "jspdf";
import QRCode from "qrcode";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, createSubscription } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  // простая форма профиля (локально)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const subscription = user.subscription || null;

  // создать подписку из state, если пришли после оплаты
  useEffect(() => {
    const { state: orderData } = location;
    if (orderData && !subscription) {
      const success = createSubscription({
        plan: orderData.plan || "Популярная",
        price: orderData.price || 1611,
        items: orderData.items || 5,
      });
      if (success) {
        toast.success("Подписка сохранена в профиле");
      }
    }
  }, [location, subscription, createSubscription]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    setEditMode(false);
    // здесь можно вызвать API обновления профиля
    toast.success("Профиль обновлён");
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ------- ГЕНЕРАЦИЯ PDF-ЧЕКА (ASCII, с QR) -------
  const generateReceipt = async () => {
    if (!subscription) {
      toast.error("Сначала оформите подписку");
      return;
    }

    const doc = new jsPDF({
      unit: "mm",
      format: [58, 230], // узкая чековая лента
    });

    doc.setFont("courier", "normal");
    doc.setFontSize(8);

    let y = 6;
    const left = 4;

    const print = (text = "", align = "left") => {
      text = String(text).replace(/[^\x20-\x7E]/g, ""); // только ASCII
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

    // дата/время
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    const dateStr = `${dd}.${mm}.${yyyy}`;
    const timeStr = `${hh}:${mi}:${ss}`;

    const total = Number(subscription.price || 0).toFixed(2);

    // строка для QR (упрощённый формат ФНС)
    const qrString = `t=${yyyy}${mm}${dd}T${hh}${mi}${ss}&s=${total}&fn=9990000000000&i=123456&fp=987654321&n=1`;

    const qr = await QRCode.toDataURL(qrString, {
      margin: 0,
      width: 200,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    // Шапка
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

    // Товар / услуга
    print("1. PODPISKA ECOBOX");
    print(`PLAN: ${subscription.plan}`, "left");
    print(`1 x ${total} = ${total}`, "right");
    line();

    // Итог
    print(`ITOG: ${total} RUB`, "right");
    print(`OPLATA KARTOY: ${total}`, "right");
    print("NDS: BEZ NDS");
    line();

    print("DOSTAVKA PO PODPISKE");
    print("ADRES: SM. LICHNYI KABINET");
    line();

    // QR
    const qrSize = 30;
    const qrX = (58 - qrSize) / 2;
    const qrY = y;

    doc.addImage(qr, "PNG", qrX, qrY, qrSize, qrSize);
    y = qrY + qrSize + 4;

    print("SPASIBO ZA POKUPKU!", "center");

    doc.save(`EcoBox_Check_${dateStr.replace(/\./g, "-")}.pdf`);
    toast.success("Чек сформирован");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black"
    >
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-xs tracking-[0.18em] uppercase hover:opacity-60"
          >
            <FaArrowLeft className="mr-2 text-[10px]" />
            На главную
          </Link>

          <div className="text-right text-[11px] leading-tight">
            <div className="uppercase tracking-[0.18em]">
              Личный кабинет
            </div>
            <div className="text-black/60">
              {subscription ? (
                <span className="inline-flex items-center">
                  <FaCrown className="mr-1 text-[10px]" />
                  {subscription.plan} · активная подписка
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <FaPlusCircle className="mr-1 text-[10px]" />
                  подписка не оформлена
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* TOP STRIP WITH NAV */}
      <div className="border-b border-black/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.18em]">
          {[
            { id: "profile", label: "Профиль" },
            { id: "subscription", label: "Подписка" },
            { id: "documents", label: "Документы" },
            { id: "notifications", label: "Уведомления" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1 border ${
                activeSection === item.id
                  ? "border-black bg-black text-white"
                  : "border-transparent hover:border-black/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[260px,1fr] gap-10">
        {/* LEFT COLUMN */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          {/* карточка пользователя */}
          <div className="border border-black p-5 text-[12px]">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 border border-black flex items-center justify-center mr-4">
                <FaUser className="text-lg" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold uppercase text-[11px]">
                  {user.name}
                </div>
                <div className="text-black/60 text-[11px] break-all">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[11px] mt-1">
              <span className="text-black/60">Подписка</span>
              <span className="font-semibold uppercase">
                {subscription ? "активна" : "нет"}
              </span>
            </div>
        
          </div>

          {/* небольшая статистика */}
          {subscription && (
            <div className="border border-black p-5 text-[11px] space-y-2">
              <div className="flex justify-between">
                <span className="text-black/60">Тариф</span>
                <span className="font-semibold uppercase">
                  {subscription.plan}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Ежемесячно</span>
                <span className="font-semibold">
                  {subscription.price} ₽ · {subscription.items} товар(ов)
                </span>
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <section className="space-y-10">
          {/* PROFILE */}
          <section id="profile" className="border border-black p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em]">
                Профиль
              </h2>
              
            </div>

            <form
              onSubmit={handleEditProfile}
              className="space-y-5 text-[13px] max-w-xl"
            >
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] mb-2">
                  ВАШЕ ИМЯ
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  disabled={!editMode}
                  onChange={(e) =>
                    setProfileForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={`w-full border border-black px-3 py-2 text-sm outline-none ${
                    editMode ? "bg-white" : "bg-neutral-100"
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  disabled
                  className="w-full border border-black px-3 py-2 text-sm bg-neutral-100 outline-none"
                />
              </div>

              {editMode && (
                <button
                  type="submit"
                  className="mt-4 border border-black px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
                >
                  Сохранить изменения
                </button>
              )}
            </form>
          </section>

          {/* SUBSCRIPTION */}
          <section id="subscription" className="border border-black p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-6 flex items-center">
              <FaCrown className="mr-2 text-[12px]" />
              Подписка
            </h2>

            {subscription ? (
              <div className="space-y-6 text-[13px]">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Тариф
                    </div>
                    <div className="mt-1 font-semibold uppercase">
                      {subscription.plan}
                    </div>
                  </div>
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Стоимость
                    </div>
                    <div className="mt-1 font-semibold">
                      {subscription.price} ₽ / месяц
                    </div>
                  </div>
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Товаров в коробке
                    </div>
                    <div className="mt-1 font-semibold">
                      {subscription.items}
                    </div>
                  </div>
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Статус
                    </div>
                    <div className="mt-1 font-semibold flex items-center">
                      <FaCheckCircle className="mr-1 text-[11px]" />
                      Активна
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-[12px]">
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Начало подписки
                    </div>
                    <div className="mt-1">
                      {subscription.startDate || "—"}
                    </div>
                  </div>
                  <div className="border border-black p-4">
                    <div className="text-[11px] uppercase text-black/60">
                      Следующий платёж
                    </div>
                    <div className="mt-1">
                      {subscription.nextPayment || "—"}
                    </div>
                  </div>
                </div>

               
              </div>
            ) : (
              <div className="text-[13px]">
                <p className="mb-4 text-black/70">
                  У вас нет активной подписки. Оформите её, чтобы получать
                  коробки каждый месяц.
                </p>
                <Link
                  to="/subscription/popular"
                  className="border border-black px-6 py-3 inline-flex items-center text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
                >
                  <FaPlusCircle className="mr-2 text-[10px]" />
                  Оформить подписку
                </Link>
              </div>
            )}
          </section>

          {/* DOCUMENTS & SUPPORT */}
          <section id="documents" className="border border-black p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-6">
              Документы и поддержка
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-[12px]">
              <button
                type="button"
                onClick={generateReceipt}
                className="border border-black px-4 py-3 flex items-center justify-center tracking-[0.18em] uppercase hover:bg-black hover:text-white transition-colors"
              >
                <FaDownload className="mr-2 text-[10px]" />
                Скачать чек PDF
              </button>

              <Link
                to="/contacts"
                className="border border-black px-4 py-3 flex items-center justify-center tracking-[0.18em] uppercase hover:bg-black hover:text-white transition-colors"
              >
                <FaPhone className="mr-2 text-[10px]" />
                Связаться с поддержкой
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-black/60">
              Детали доставок, адреса и история заказов доступны в разделе
              «Подписка» и будут дополняться по мере развития сервиса.
            </p>
          </section>

          {/* NOTIFICATIONS */}
          <section id="notifications" className="border border-black p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-6 flex items-center">
              <FaBell className="mr-2 text-[11px]" />
              Уведомления
            </h2>
            <p className="text-[13px] text-black/70">
              Сейчас у вас нет новых уведомлений. Мы сообщим о следующем
              списании, сборке коробки и отправке заказа.
            </p>
          </section>
        </section>
      </main>
    </motion.div>
  );
};

export default Profile;
