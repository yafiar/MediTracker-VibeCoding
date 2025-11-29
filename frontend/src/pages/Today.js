import React, { useEffect, useState, useMemo } from 'react';
import { scheduleAPI, intakeAPI, medicineAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Today.css';

const Today = () => {
  const [schedules, setSchedules] = useState([]);
  const [todayIntakes, setTodayIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allSchedulesRes, todayRes, medsRes] = await Promise.all([
        scheduleAPI.getAll(),
        intakeAPI.getTodayIntakes(),
        medicineAPI.getAll({ limit: 500 })
      ]);
      const medsArray = medsRes.data.items ? medsRes.data.items : medsRes.data;
      const medicinesMap = Object.fromEntries(medsArray.map(m => [m._id, m]));

      // Filter schedules due today (days empty => daily, or includes today)
      const dueToday = allSchedulesRes.data.filter(s => {
        if (!s.days || s.days.length === 0) return true; // daily
        return s.days.includes(dayName) || s.days.includes(dayName.substring(0,3));
      });

      const mapped = dueToday.map(s => ({
        ...s,
        medicine: medicinesMap[s.medicineId?._id || s.medicineId] || s.medicineId?.medicine || null
      }));
      setSchedules(mapped);
      setTodayIntakes(todayRes.data);
    } catch (err) {
      setError('Failed to load today\'s schedules');
    } finally {
      setLoading(false);
    }
  };

  const isTaken = (schedule) => {
    return todayIntakes.some(i => i.scheduleId === schedule._id || i.scheduleId?._id === schedule._id);
  };

  const handleMarkTaken = async (schedule) => {
    try {
      await intakeAPI.markAsTaken({
        medicineId: schedule.medicine?._id || schedule.medicineId,
        scheduleId: schedule._id,
        scheduledTime: schedule.time,
        time: schedule.time
      });
      fetchData();
    } catch (err) {
      alert('Failed to mark as taken');
    }
  };

  const sortedSchedules = useMemo(() => {
    return [...schedules].sort((a,b) => {
      const ta = a.time ? a.time : '23:59';
      const tb = b.time ? b.time : '23:59';
      return ta.localeCompare(tb);
    });
  }, [schedules]);

  if (loading) return <div className="today-container"><div className="spinner"></div><p>Loading...</p></div>;

  return (
    <div className="today-page">
      <Navbar onLogout={() => { 
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href='/login'; 
      }} />
      <div className="today-container">
        <div className="today-header">
          <h1>Today's Medicines</h1>
          <p>{dayName}</p>
        </div>
      {error && <div className="error-message">{error}</div>}
      {schedules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🕐</div>
          <h3>No medicines scheduled for today</h3>
        </div>
      ) : (
        <div className="today-list">
          {sortedSchedules.map(s => {
            const taken = isTaken(s);
            return (
              <div key={s._id} className={`today-item ${taken ? 'taken' : ''}`}> 
                <div className="today-info">
                  <h3>{s.medicine?.name || 'Unknown Medicine'}</h3>
                  <p className="dosage">{s.medicine?.dosage}</p>
                  <p className="time">Scheduled: {s.time ? new Date(`2000-01-01T${s.time}`).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) : 'N/A'}</p>
                  {s.days && s.days.length > 0 && (
                    <div className="days">{s.days.map(d => <span key={d} className="day-badge">{d.substring(0,3)}</span>)}</div>
                  )}
                </div>
                <div className="today-actions">
                  {taken ? (
                    <span className="taken-badge">Taken ✓</span>
                  ) : (
                    <button className="btn-small btn-success" onClick={() => handleMarkTaken(s)}>Mark Taken</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default Today;
