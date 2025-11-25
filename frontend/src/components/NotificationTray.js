import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import './NotificationTray.css';

const NotificationTray = () => {
  const { active, dismissNotification } = useNotifications();
  if (!active.length) return null;
  return (
    <div className="notif-tray" aria-live="polite">
      {active.map(n => (
        <div key={n.id} className="notif-card" role="alert">
          <button className="notif-close" aria-label="Dismiss notification" onClick={() => dismissNotification(n.id)}>×</button>
          <div className="notif-header">
            <span className="notif-icon">🔔</span>
            <h4>{n.title}</h4>
          </div>
          <p className="notif-body">{n.body}</p>
          {n.medicine && (
            <div className="notif-meta">
              <span className="med-name">{n.medicine.name}</span>
              {n.medicine.dosage && <span className="med-dosage">{n.medicine.dosage}</span>}
            </div>
          )}
          {n.scheduledTime && (
            <div className="notif-time">Scheduled: {n.scheduledTime}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationTray;
