import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { medicineAPI, intakeAPI } from '../services/api';
import Navbar from '../components/Navbar';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [todayIntakes, setTodayIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('medicines');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [medicinesRes, intakesRes] = await Promise.all([
        medicineAPI.getAll(),
        intakeAPI.getTodayIntakes(),
      ]);
      setMedicines(medicinesRes.data);
      setTodayIntakes(intakesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteRequest = (id) => {
    setDeleteTarget(id);
  };

  const performDelete = async () => {
    if (!deleteTarget) return;
    try {
      await medicineAPI.delete(deleteTarget);
      addToast('Medicine deleted', 'success');
      fetchData();
    } catch (error) {
      console.error('Error deleting medicine:', error);
      addToast('Failed to delete medicine', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  const filteredMedicines = medicines.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dashboard">
      <Navbar onLogout={handleLogout} />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Your Medicine Dashboard</h1>
            <p className="sub-note">Manage, schedule, and track your doses</p>
          </div>
          <div className="header-actions">
            <input
              type="text"
              className="search-input"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => navigate('/medicines/add')}
            >
              + Add New Medicine
            </button>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'medicines' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicines')}
          >
            My Medicines ({filteredMedicines.length}/{medicines.length})
          </button>
          <button
            className={`tab ${activeTab === 'today' ? 'active' : ''}`}
            onClick={() => setActiveTab('today')}
          >
            Today's Intake ({todayIntakes.length})
          </button>
        </div>

        {activeTab === 'medicines' && (
          <div className="medicines-grid">
            {loading && (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="medicine-card skeleton">
                  <div className="medicine-image" />
                  <div className="medicine-info">
                    <div className="line w80" />
                    <div className="line w60" />
                    <div className="line w90" />
                  </div>
                  <div className="medicine-actions">
                    <div className="btn-icon" />
                    <div className="btn-icon" />
                    <div className="btn-icon" />
                  </div>
                </div>
              ))
            )}
            {!loading && filteredMedicines.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No medicines yet</h3>
                <p>Start by adding your first medicine</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/medicines/add')}
                >
                  Add Medicine
                </button>
              </div>
            ) : (
              !loading && filteredMedicines.map((medicine) => (
                <div key={medicine._id} className="medicine-card">
                  <div className="medicine-image">
                    {medicine.image ? (
                      <img
                        src={`http://localhost:5000${medicine.image.startsWith('/') ? medicine.image : '/' + medicine.image}`}
                        alt={medicine.name}
                      />
                    ) : (
                      <div className="placeholder-image">💊</div>
                    )}
                  </div>
                  <div className="medicine-info">
                    <h3>{medicine.name}</h3>
                    <p className="medicine-dosage">{medicine.dosage}</p>
                    <p className="medicine-description">{medicine.description}</p>
                    {medicine.frequency && (
                      <span className="frequency-badge">
                        {medicine.frequency}x per day
                      </span>
                    )}
                  </div>
                  <div className="medicine-actions">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => navigate(`/medicines/edit/${medicine._id}`)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-schedule"
                      onClick={() => navigate(`/medicines/${medicine._id}/schedule`)}
                      title="Set Schedule"
                    >
                      🕐
                    </button>
                     <button
                       className="btn-icon btn-delete"
                       onClick={() => handleDeleteRequest(medicine._id)}
                       title="Delete"
                     >
                       🗑️
                     </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'today' && (
          <div className="intake-list">
            {todayIntakes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <h3>No intakes recorded today</h3>
                <p>Start tracking when you take your medicines</p>
              </div>
            ) : (
              todayIntakes.map((intake) => (
                <div key={intake._id} className="intake-item">
                  <div className="intake-icon">✅</div>
                  <div className="intake-info">
                    <h4>{intake.medicineId?.name || intake.medicine?.name || 'Unknown Medicine'}</h4>
                    <p>
                      Taken at:{' '}
                      {new Date(intake.takenAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {intake.notes && (
                      <p className="intake-notes">Notes: {intake.notes}</p>
                    )}
                  </div>
                  <div className="intake-time">
                    {new Date(intake.takenAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Medicine"
        message="Are you sure you want to delete this medicine? This action cannot be undone."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={performDelete}
        confirmLabel="Delete"
      />
    </div>
  );
};

export default Dashboard;
