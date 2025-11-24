import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (email, password, name) => {
    const existing = localStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    if (users.some(u => u.email === email)) {
      toast.error('❌ Email уже зарегистрирован!');
      return false;
    }

    // ✅ ПУСТАЯ ПОДПИСКА ДЛЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
    const newUser = { 
      email, 
      password, 
      name,
      subscription: null  // ✅ ПОДПИСКА ОТСУТСТВУЕТ!
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    toast.success('🎉 Регистрация успешна! Выберите подписку!');
    return true;
  };

  const login = (email, password) => {
    const existing = localStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      toast.success('✅ Вход выполнен!');
      return true;
    } else {
      toast.error('❌ Неверный email или пароль!');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('👋 Вы вышли!');
  };

  // ✅ СОЗДАТЬ ПОДПИСКУ ПОСЛЕ ОПЛАТЫ
  const createSubscription = (subscriptionData) => {
    if (!user) {
      toast.error('❌ Сначала войдите!');
      return false;
    }

    const newSubscription = {
      plan: subscriptionData.plan,
      price: subscriptionData.price,
      items: subscriptionData.items,
      startDate: new Date().toLocaleDateString('ru-RU'),
      nextPayment: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('ru-RU'),
      status: 'active'
    };

    const existing = localStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];
    
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex].subscription = newSubscription;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify({ ...user, subscription: newSubscription }));
      setUser({ ...user, subscription: newSubscription });
      toast.success('🎉 Подписка успешно оформлена!');
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, createSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);