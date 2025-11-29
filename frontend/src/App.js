import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MedicineForm from './pages/MedicineForm';
import ScheduleManagement from './pages/ScheduleManagement';
import Today from './pages/Today';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { ToastProvider } from './context/ToastContext';
import { NotificationProvider } from './context/NotificationContext';
import NotificationManager from './components/NotificationManager';
import NotificationTray from './components/NotificationTray';
import './components/Toast.css';
import NotificationHistory from './pages/NotificationHistory';

function App() {
  return (
    <NotificationProvider>
    <ToastProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicines/add"
          element={
            <PrivateRoute>
              <MedicineForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicines/edit/:id"
          element={
            <PrivateRoute>
              <MedicineForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicines/:medicineId/schedule"
          element={
            <PrivateRoute>
              <ScheduleManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/today"
          element={
            <PrivateRoute>
              <Today />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationHistory />
            </PrivateRoute>
          }
        />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <NotificationManager />
        <NotificationTray />
      </Router>
    </ToastProvider>
    </NotificationProvider>
  );
}

export default App;

