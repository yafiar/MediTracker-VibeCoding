import React from 'react';
import Navbar from '../components/Navbar';
import { useNotifications } from '../context/NotificationContext';
import './NotificationHistory.css';

const NotificationHistory = () => {
  const { history, clearHistory } = useNotifications();
  return (
    <div className="notif-history-page">
      <Navbar onLogout={() => { 
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href='/login'; 
      }} />
      <div className="notif-history-container">
        <div className="notif-history-header">
          <h1>Notification History</h1>
          {history.length > 0 && (
            <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
          )}
        </div>
        {history.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔕</div>
            <h3>No notifications yet</h3>
            <p>Reminders you receive will appear here.</p>
          </div>
        ) : (
          <div className="notif-history-list">
            {history.map(n => (
              <div key={n.id} className="history-item">
                <div className="history-main">
                  <h4>{n.title}</h4>
                  <p>{n.body}</p>
                  {n.medicine && (
                    <div className="history-medicine">{n.medicine.name}{n.medicine.dosage ? ` (${n.medicine.dosage})` : ''}</div>
                  )}
                </div>
                <div className="history-meta">
                  {n.scheduledTime && <span className="scheduled">Scheduled: {n.scheduledTime}</span>}
                  <span className="timestamp">{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
