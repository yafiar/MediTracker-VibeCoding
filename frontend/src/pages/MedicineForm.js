import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { medicineAPI } from '../services/api';
import './MedicineForm.css';

const MedicineForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    description: '',
    frequency: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchMedicine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const response = await medicineAPI.getById(id);
      const medicine = response.data;
      setFormData({
        name: medicine.name,
        dosage: medicine.dosage,
        description: medicine.description || '',
        frequency: medicine.frequency || '',
      });
      if (medicine.image) {
        const path = medicine.image.startsWith('/') ? medicine.image : '/' + medicine.image;
        setImagePreview(`http://localhost:5000${path}`);
      }
    } catch (error) {
      console.error('Error fetching medicine:', error);
      setError('Failed to load medicine data');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('dosage', formData.dosage);
    data.append('description', formData.description);
    data.append('frequency', formData.frequency);
    if (image) {
      data.append('image', image);
    }

    try {
      if (isEditMode) {
        await medicineAPI.update(id, data);
      } else {
        await medicineAPI.create(data);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-form-container">
      <div className="form-card">
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <h1>{isEditMode ? 'Edit Medicine' : 'Add New Medicine'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="medicine-form">
          <div className="image-upload-section">
            <label className="image-upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <div className="image-upload-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <p>Click to upload medicine image</p>
                    <span>PNG, JPG up to 5MB</span>
                  </div>
                )}
              </div>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="name">Medicine Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Paracetamol"
              required
              autoComplete="off"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dosage">Dosage *</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="e.g., 500mg"
              required
              autoComplete="off"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Frequency (times per day)</label>
            <input
              type="number"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              placeholder="e.g., 3"
              min="1"
              aria-describedby="frequencyHelp"
            />
            <small id="frequencyHelp" className="assist-text">Number of times you take this medicine per day.</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter medicine description, usage instructions, or notes..."
              rows="4"
              aria-multiline="true"
            />
          </div>

          {error && <div className="error-message" role="alert" aria-live="assertive">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineForm;
