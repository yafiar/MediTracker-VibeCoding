<div align="center">

# 💊 MediTracker - Medicine Tracking Application

A web application for tracking your medicine intake with schedules and reminders.

https://meditrackers.vercel.app/login

</div>

## 🎯 Problem Statement

Managing daily medication can be challenging, especially for individuals taking multiple medicines with different schedules. Common problems include:

- **Forgetting medication times** - People often miss their scheduled doses due to busy routines
- **Disorganized medicine information** - Important details like dosage, frequency, and instructions get lost
- **No centralized tracking** - Difficult to maintain a comprehensive record of all medicines and intake history
- **Lack of reminders** - No automated system to prompt users when it's time to take their medicine
- **Poor adherence monitoring** - Hard to track whether medication schedules are being followed consistently

**MediTracker** solves these problems by providing a centralized, user-friendly platform where users can:
- Store all medicine information with images and details
- Set customized schedules for each medicine
- Receive notifications for upcoming doses
- Track intake history and adherence
- Access their medication data from anywhere with cloud storage

This ensures better medication management, improved health outcomes, and peace of mind for users managing their daily medicine intake.

## ✨ Features

### 🔐 Authentication
- User registration with password hashing (bcrypt)
- Secure login with JWT authentication
- Token-based authorization
- Session management with localStorage

### 💊 Medicine Management (CRUD)
- Add new medicines with details (name, dosage, description, frequency)
- Upload medicine images
- Edit medicine information
- Delete medicines
- View all medicines in a beautiful card layout

### ⏰ Schedule Management
- Set multiple schedules per medicine
- Choose specific days of the week
- Set time for each intake
- Visual schedule display

### 📊 Intake Tracking
- Mark medicine as taken
- View today's intake history
- Track adherence to schedule
- Add notes to each intake

## 🛠️ Tech Stack
### Frontend
- **React.js** - UI Framework
- **React Router** - Navigation
- **Axios** - HTTP Client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload

## 📁 Project Structure

```
VibeCoding/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Medicine.js
│   │   ├── Schedule.js
│   │   └── Intake.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── medicines.js
│   │   ├── schedules.js
│   │   └── intakes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── MedicineForm.js
    │   │   ├── ScheduleManagement.js
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── MedicineForm.css
    │   │   └── ScheduleManagement.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 📱 Pages Overview

### 1. Login & Register
- Beautiful gradient background
- Form validation
- Responsive design
- Error handling

### 2. Dashboard
- View all medicines
- Quick actions (Edit, Delete, Schedule)
- Today's intake tracker
- Tab navigation

### 3. Add/Edit Medicine
- Upload medicine image
- Form with validation
- Image preview
- Responsive layout

### 4. Schedule Management
- Set multiple schedules
- Choose days of the week
- Mark as taken
- Delete schedules

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- Error handling

## 🌟 Key Features Implemented

✅ User Authentication (Register/Login)  
✅ JWT Token Management  
✅ Password Hashing with bcrypt  
✅ CRUD Operations for Medicines  
✅ Image Upload for Medicines  
✅ Schedule Management  
✅ Intake Tracking  
✅ Responsive Design  
✅ Modern UI/UX  
✅ Protected Routes  
✅ Error Handling  

## 🎯 Usage Flow

1. **Register** - Create a new account
2. **Login** - Access your dashboard
3. **Add Medicine** - Add medicine with image and details
4. **Set Schedule** - Create intake schedules
5. **Track Intake** - Mark when you take your medicine
6. **Monitor** - View your medicine list and intake history

## 📸 Screenshots

### Login Page

<img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/3489d9dd-f510-467d-8647-e2038e1376ab" />

### Main Dashboard

<img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/f16c46b5-4331-4f92-90cf-088eb265429c" />

### Today's Intake

<img width="1919" height="949" alt="image" src="https://github.com/user-attachments/assets/8d942d88-fab0-46bc-bbb2-64f12fce728d" />

### Today's Medicine

<img width="1919" height="950" alt="image" src="https://github.com/user-attachments/assets/4419f3b9-e1c4-47ae-95d4-69e159e22244" />

### Add Medicine

<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/2586ed5b-0e00-4d97-8059-0eb094e554d6" />

## 👨‍💻 Author

Created by Ahmad Yafi - 066 for PemWeb Class

---
