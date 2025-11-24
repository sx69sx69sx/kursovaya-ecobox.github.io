import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/profile');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-emerald-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">Вход</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl"
            required
          />
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">Войти</button>
        </form>
        <p className="text-center mt-4">Нет аккаунта? <Link to="/register" className="text-emerald-600">Зарегистрироваться</Link></p>
      </div>
    </motion.div>
  );
};

export default Login;