import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { scheduleAPI, intakeAPI, medicineAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useNotifications } from '../context/NotificationContext';

// Local (client-side) notification scheduler for today's medicine times.
// Uses Web Notifications API; future push support can extend via service worker.
const NotificationManager = () => {
  const { addToast } = useToast();
  const { addNotification } = useNotifications();
  const location = useLocation();
  const timeoutsRef = useRef([]);
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved === null ? true : saved === 'true';
  });
  const [showText, setShowText] = useState(false);

  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    // Only attempt scheduling inside authenticated routes (not on /login or /register)
    const token = localStorage.getItem('token');
    if (!enabled || !token) return;
    if (location.pathname === '/login' || location.pathname === '/register') return;
    requestPermission();
    loadAndSchedule();
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [enabled, location.pathname]);

  // Refresh schedule every hour for robustness
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!enabled || !token) return;
    const interval = setInterval(loadAndSchedule, 30 * 60 * 1000); // every 30 mins refresh
    return () => clearInterval(interval);
  }, [enabled, location.pathname]);

  const requestPermission = () => {
    if (!('Notification' in window)) {
      addToast('Browser does not support notifications', 'error');
      return;
    }
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(result => {
        if (result === 'granted') addToast('Notifications enabled', 'success');
        else addToast('Notifications permission denied', 'error');
      });
    }
  };

  const loadAndSchedule = async () => {
    try {
      // Clear previous timeouts
      timeoutsRef.current.forEach(t => clearTimeout(t));
      timeoutsRef.current = [];

      const [schedulesRes, todaysIntakesRes, medsRes] = await Promise.all([
        scheduleAPI.getAll(), // returns normalized single time plus underlying times[]
        intakeAPI.getTodayIntakes(),
        medicineAPI.getAll({ limit: 500 }) // fetch a large batch to cover all medicines
      ]);

      // For duplicate detection: scheduleId + scheduledTime string
      const takenMap = new Set(
        todaysIntakesRes.data.map(i => `${(i.scheduleId && i.scheduleId._id) || i.scheduleId}-${i.scheduledTime || ''}`)
      );
      const medsArray = medsRes.data.items ? medsRes.data.items : medsRes.data;
      const medicinesMap = Object.fromEntries(medsArray.map(m => [m._id, m]));
      const now = new Date();

      const todaySchedules = schedulesRes.data.filter(s => {
        if (!s.days || s.days.length === 0) return true;
        return s.days.includes(dayName) || s.days.includes(dayName.substring(0,3));
      });

      todaySchedules.forEach(s => {
        const medicine = medicinesMap[s.medicineId?._id || s.medicineId] || s.medicineId?.medicine || null;
        const timesArray = s.times && s.times.length ? s.times : (s.time ? [s.time] : []);
        timesArray.forEach(timeStr => {
          if (!timeStr) return;
          const [hh, mm] = timeStr.split(':');
          if (hh == null || mm == null) return;
            const scheduled = new Date();
            scheduled.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
            if (scheduled <= now) return; // Already passed
            const key = `${s._id}-${timeStr}`;
            if (takenMap.has(key)) return; // Already taken
            const delay = scheduled.getTime() - now.getTime();
            const timeoutId = setTimeout(() => {
              fireNotification(medicine, s, timeStr);
            }, delay);
            timeoutsRef.current.push(timeoutId);
        });
      });
    } catch (err) {
      console.error('Failed to schedule notifications', err);
      addToast('Failed scheduling notifications', 'error');
    }
  };

  const fireNotification = (medicine, schedule, timeStr) => {
    const title = 'Medicine Reminder';
    const body = medicine
      ? `Time to take ${medicine.name}${medicine.dosage ? ' (' + medicine.dosage + ')' : ''} at ${timeStr}`
      : `Time for scheduled medicine at ${timeStr}`;
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
    }
    addToast(body, 'info');
    addNotification({
      title,
      body,
      medicine,
      scheduleId: schedule._id,
      scheduledTime: timeStr
    });
  };

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem('notificationsEnabled', String(next));
    addToast(next ? 'Notifications turned on' : 'Notifications turned off', next ? 'success' : 'error');
    setShowText(true);
    setTimeout(() => setShowText(false), 2000);
  };

  // Hide toggle on public pages
  if (location.pathname === '/login' || location.pathname === '/register') return null;

  return (
    <div 
      className="notifications-toggle" 
      style={{ position: 'fixed', bottom: 18, right: 18, zIndex: 10 }}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <button
        onClick={toggle}
        className="nav-btn"
        style={{ 
          background: enabled ? '#4A90E2' : '#f0f0f5', 
          color: enabled ? '#fff' : '#333',
          transition: 'all 0.3s ease',
          minWidth: showText ? 'auto' : '44px',
          padding: showText ? '10px 18px' : '10px 12px'
        }}
        aria-pressed={enabled}
        title={enabled ? 'Notifications On - Click to turn off' : 'Notifications Off - Click to turn on'}
      >
        {enabled ? '🔔' : '🔕'}{showText && (enabled ? ' Notifications On' : ' Notifications Off')}
      </button>
    </div>
  );
};

export default NotificationManager;
