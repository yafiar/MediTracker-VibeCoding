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
  const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('userId'));
  const [history, setHistory] = useState(() => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return [];
      const raw = localStorage.getItem(`notification_history_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  // Watch for userId changes (e.g., different user logs in)
  useEffect(() => {
    const checkUserId = () => {
      const userId = localStorage.getItem('userId');
      if (userId !== currentUserId) {
        setCurrentUserId(userId);
        // Load new user's history
        try {
          if (!userId) {
            setHistory([]);
            setActive([]);
          } else {
            const raw = localStorage.getItem(`notification_history_${userId}`);
            setHistory(raw ? JSON.parse(raw) : []);
            setActive([]);
          }
        } catch {
          setHistory([]);
          setActive([]);
        }
      }
    };

    // Check periodically for userId changes
    const interval = setInterval(checkUserId, 1000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      localStorage.setItem(`notification_history_${userId}`, JSON.stringify(history));
    }
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
