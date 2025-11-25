import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { medicineAPI, scheduleAPI } from '../services/api';
import './ScheduleManagement.css';

const ScheduleManagement = () => {
  const navigate = useNavigate();
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    time: '',
    days: [],
  });
  const [loading, setLoading] = useState(true);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicineId]);

  const fetchData = async () => {
    try {
      const [medicineRes, schedulesRes] = await Promise.all([
        medicineAPI.getById(medicineId),
        scheduleAPI.getByMedicine(medicineId),
      ]);
      setMedicine(medicineRes.data);
      setSchedules(schedulesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (day) => {
    setNewSchedule((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      await scheduleAPI.create({
        medicine: medicineId,
        time: newSchedule.time,
        days: newSchedule.days,
      });
      setNewSchedule({ time: '', days: [] });
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await scheduleAPI.delete(scheduleId);
        fetchData();
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  // Removed mark-as-taken functionality per request.

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        <div className="schedule-header">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          {medicine && (
            <div className="medicine-header">
              <h1>Schedule for {medicine.name}</h1>
              <p className="medicine-dosage">{medicine.dosage}</p>
            </div>
          )}
        </div>

        <div className="schedule-content">
          <div className="schedule-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : '+ Add New Schedule'}
            </button>
          </div>

          {showAddForm && (
            <div className="add-schedule-form">
              <form onSubmit={handleAddSchedule}>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, time: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Days of the week</label>
                  <div className="days-selector">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`day-btn ${
                          newSchedule.days.includes(day) ? 'active' : ''
                        }`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Schedule
                </button>
              </form>
            </div>
          )}

          <div className="schedules-list">
            {schedules.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🕐</div>
                <h3>No schedules yet</h3>
                <p>Add your first schedule to start tracking</p>
              </div>
            ) : (
              schedules.map((schedule) => (
                <div key={schedule._id} className="schedule-item">
                  <div className="schedule-time">
                    <div className="time-icon">⏰</div>
                    <div className="time-info">
                      <h3>
                        {new Date(`2000-01-01T${schedule.time}`).toLocaleTimeString(
                          'en-US',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </h3>
                      <div className="schedule-days">
                        {schedule.days && schedule.days.length > 0 ? (
                          schedule.days.map((day) => (
                            <span key={day} className="day-badge">
                              {day.substring(0, 3)}
                            </span>
                          ))
                        ) : (
                          <span className="day-badge">Daily</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="schedule-actions-btns">
                    <button
                      className="btn-small btn-danger"
                      onClick={() => handleDeleteSchedule(schedule._id)}
                      title="Delete schedule"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
