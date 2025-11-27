import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim() || !form.email.includes("@")) {
      newErrors.email = "Некорректный email";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Минимум 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Проверьте корректность полей");
      return;
    }

    const ok = login(form.email.trim(), form.password);
    if (ok) {
      toast.success("Вы вошли в аккаунт");

      // если пришли с /success – вернём туда, иначе в профиль
      const redirectTo = location.state?.from || "/profile";
      const planData = location.state?.planData;
      if (planData) {
        navigate(redirectTo, { state: planData });
      } else {
        navigate(redirectTo);
      }
    } else {
      toast.error("Неверный email или пароль");
    }
  };

  const baseInputClass =
    "w-full border border-black px-3 py-2 text-sm outline-none focus:bg-black focus:text-white transition-colors";
  const errorClass = "border-red-500 bg-red-50";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white text-black flex items-center justify-center"
    >
      <div className="w-full max-w-md px-6">
        {/* Верхняя полоса */}
        <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <Link
            to="/"
            className="border border-black px-3 py-1 hover:bg-black hover:text-white transition-colors"
          >
            ← На главную
          </Link>
          <span className="text-black/60">Вход в аккаунт</span>
        </div>

        {/* Карточка входа */}
        <div className="border border-black p-8">
          <h1 className="text-sm font-bold uppercase tracking-[0.18em] mb-6">
            Вход
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5 text-[13px]">
            {/* Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${baseInputClass} ${
                  errors.email ? errorClass : ""
                }`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Пароль */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] mb-2">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`${baseInputClass} ${
                  errors.password ? errorClass : ""
                }`}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Кнопка */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full mt-4 border border-black px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              Войти
            </motion.button>
          </form>

          <div className="mt-6 text-[12px] text-black/70 flex justify-between">
            <span>Нет аккаунта?</span>
            <Link
              to="/register"
              className="uppercase tracking-[0.18em] text-[11px] border-b border-black hover:bg-black hover:text-white px-1 transition-colors"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>

        {/* Низ */}
        <div className="mt-6 text-[10px] text-black/50 uppercase tracking-[0.18em] text-center">
          Защищённый вход • данные не сохраняются
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
