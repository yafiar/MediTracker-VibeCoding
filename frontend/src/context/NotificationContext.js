import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const NotificationContext = createContext({
  active: [],
  history: [],
  addNotification: () => {},
  dismissNotification: () => {},
  clearHistory: () => {}
});

export const NotificationProvider = ({ children }) => {
  const [active, setActive] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('notification_history');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('notification_history', JSON.stringify(history));
  }, [history]);

  const addNotification = useCallback((notif) => {
    const item = {
      id: notif.id || (Date.now() + Math.random()),
      title: notif.title || 'Reminder',
      body: notif.body,
      time: notif.time || new Date().toISOString(),
      medicine: notif.medicine || null,
      scheduleId: notif.scheduleId || null,
      scheduledTime: notif.scheduledTime || null,
      createdAt: new Date().toISOString()
    };
    setActive(prev => [item, ...prev.slice(0,9)]);
    setHistory(prev => [item, ...prev].slice(0,200));
  }, []);

  const dismissNotification = useCallback((id) => {
    setActive(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ active, history, addNotification, dismissNotification, clearHistory }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
