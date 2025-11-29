import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { notificationAPI } from '../services/api';

const NotificationContext = createContext({
  active: [],
  history: [],
  addNotification: () => {},
  dismissNotification: () => {},
  clearHistory: () => {},
  loadHistory: () => {}
});

export const NotificationProvider = ({ children }) => {
  const [active, setActive] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load notification history from backend when user is authenticated
  const loadHistory = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setHistory([]);
      return;
    }

    try {
      setLoading(true);
      const response = await notificationAPI.getAll({ limit: 200 });
      setHistory(response.data || []);
    } catch (error) {
      console.error('Failed to load notification history:', error);
      // If unauthorized, clear history
      if (error.response?.status === 401) {
        setHistory([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Load history on mount and when token changes
  useEffect(() => {
    loadHistory();
    
    // Poll for new notifications every 30 seconds when authenticated
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const interval = setInterval(loadHistory, 30000);
    return () => clearInterval(interval);
  }, [loadHistory]);

  const addNotification = useCallback(async (notif) => {
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
    
    // Add to active notifications (in-memory)
    setActive(prev => [item, ...prev.slice(0, 9)]);
    
    // Save to backend database
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await notificationAPI.create({
          title: item.title,
          body: item.body,
          medicine: item.medicine,
          scheduleId: item.scheduleId,
          scheduledTime: item.scheduledTime
        });
        // Update local history with the saved notification (has proper _id from DB)
        setHistory(prev => [response.data, ...prev].slice(0, 200));
      } catch (error) {
        console.error('Failed to save notification to database:', error);
        // Still add to local history even if save fails
        setHistory(prev => [item, ...prev].slice(0, 200));
      }
    } else {
      // If not authenticated, just add to local history
      setHistory(prev => [item, ...prev].slice(0, 200));
    }
  }, []);

  const dismissNotification = useCallback((id) => {
    setActive(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearHistory = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await notificationAPI.clearAll();
        setHistory([]);
      } catch (error) {
        console.error('Failed to clear notification history:', error);
      }
    } else {
      setHistory([]);
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ active, history, addNotification, dismissNotification, clearHistory, loadHistory, loading }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
