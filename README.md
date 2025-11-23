<<<<<<< HEAD
# 💊 MediTracker - Medicine Tracking Application

Modern and beautiful web application for tracking your medicine intake with schedules and reminders.

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

### 🎨 Modern UI/UX
- Responsive design (mobile & desktop)
- Smooth animations and transitions
- Gradient backgrounds
- Card-based layouts
- Interactive buttons and forms

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

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/meditracker
JWT_SECRET=your-secret-key-here
PORT=5000
```

4. Start the backend server:
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

Frontend will run on `http://localhost:3000`

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

## 🎨 Design Features

- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Animations**: Smooth fade-in, slide-down, and bounce effects
- **Icons**: Emoji-based icons for modern look
- **Cards**: Elevated cards with hover effects
- **Buttons**: Gradient buttons with hover states
- **Forms**: Modern input fields with focus states

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- Error handling

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "axios": "^1.3.4"
}
```

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

The application features:
- Gradient login/register pages with animated logo
- Dashboard with medicine cards and intake tabs
- Beautiful form layouts with image upload
- Interactive schedule management with day selection
- Responsive design for all screen sizes

## 🤝 Contributing

This is a student project for learning MERN stack development.

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created with ❤️ for PemWeb Class - Semester 3

---

**Note**: Make sure MongoDB is running before starting the application!
=======
# MediTracker-VibeCoding
>>>>>>> f5876f3eddbf19525f519f00856b0c7c6851d4e2
