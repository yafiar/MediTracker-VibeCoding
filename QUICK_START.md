# 🚀 Quick Start Guide - MediTracker

## Cara Menjalankan Aplikasi

### Option 1: Manual (Recommended for Development)

#### 1. Start MongoDB
Pastikan MongoDB sudah running:
```bash
# Windows
mongod

# Atau jika menggunakan MongoDB Compass, buka aplikasinya
```

#### 2. Start Backend
Buka terminal baru dan jalankan:
```bash
cd backend
npm start
```

Backend akan berjalan di `http://localhost:5000`

#### 3. Start Frontend
Buka terminal baru lagi dan jalankan:
```bash
cd frontend
npm start
```

Frontend akan berjalan di `http://localhost:3000` dan otomatis membuka browser.

---

### Option 2: Using PowerShell Script

Jalankan script berikut di PowerShell:

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
```

---

## 📝 First Time Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

Buat file `.env` di folder `backend`:
```env
MONGODB_URI=mongodb://localhost:27017/meditracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### 3. Verify Installation

Pastikan semua dependencies terinstall dengan benar:
- Backend: `cd backend && npm list`
- Frontend: `cd frontend && npm list`

---

## 🎯 Testing the Application

### 1. Register Account
- Buka `http://localhost:3000`
- Klik "Register here"
- Isi form dengan data Anda
- Klik "Register"

### 2. Login
- Masukkan email dan password yang sudah didaftarkan
- Klik "Login"

### 3. Add Medicine
- Di Dashboard, klik "+ Add New Medicine"
- Upload gambar obat (opsional)
- Isi nama, dosage, frequency, dan description
- Klik "Add Medicine"

### 4. Set Schedule
- Di medicine card, klik icon jam (🕐)
- Klik "+ Add New Schedule"
- Pilih waktu
- Pilih hari (Mon-Sun)
- Klik "Add Schedule"

### 5. Mark as Taken
- Di halaman schedule, klik "✓ Taken" untuk menandai obat sudah diminum
- Cek tab "Today's Intake" di Dashboard untuk melihat riwayat

---

## 🔧 Troubleshooting

### Port Already in Use
Jika port 3000 atau 5000 sudah digunakan:

**Frontend:**
```bash
# Windows
set PORT=3001 && npm start
```

**Backend:**
Edit `.env` dan ubah PORT menjadi angka lain.

### MongoDB Connection Error
1. Pastikan MongoDB service running
2. Cek connection string di `.env`
3. Test koneksi: `mongosh` di terminal

### Cannot GET /api/...
- Pastikan backend sudah running
- Cek console untuk error messages
- Verify proxy setting di `frontend/package.json`

### CORS Error
Sudah dikonfigurasi di backend, tapi jika masih error:
- Restart backend server
- Clear browser cache
- Check browser console

---

## 📂 Default Folders Created

Saat upload gambar, folder `uploads/` akan otomatis dibuat di backend.

---

## 🌐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Medicines
- GET `/api/medicines` - Get all medicines
- GET `/api/medicines/:id` - Get medicine by ID
- POST `/api/medicines` - Create medicine (with image upload)
- PUT `/api/medicines/:id` - Update medicine
- DELETE `/api/medicines/:id` - Delete medicine

### Schedules
- GET `/api/schedules` - Get all schedules
- GET `/api/schedules/medicine/:medicineId` - Get schedules by medicine
- POST `/api/schedules` - Create schedule
- PUT `/api/schedules/:id` - Update schedule
- DELETE `/api/schedules/:id` - Delete schedule

### Intakes
- GET `/api/intakes` - Get all intakes
- GET `/api/intakes/today` - Get today's intakes
- POST `/api/intakes` - Mark as taken
- DELETE `/api/intakes/:id` - Delete intake record

---

## ✅ Checklist Fitur Wajib

- ✅ **Authentication**: Register & Login dengan JWT + bcrypt
- ✅ **CRUD Data Utama**: Medicine management (Create, Read, Update, Delete)
- ✅ **Upload File**: Upload gambar obat dengan Multer
- ✅ **Frontend React**: 
  - ✅ Login/Register page
  - ✅ Dashboard/List Data
  - ✅ Form Add/Edit Medicine
  - ✅ Schedule Management
- ✅ **React Router**: Navigation antar halaman
- ✅ **Axios**: API calls ke backend
- ✅ **Responsif**: Mobile & Desktop friendly
- ✅ **MongoDB**: Data tersimpan di database

---

## 🎨 Design Features

- Modern gradient design (Purple theme)
- Smooth animations
- Card-based layout
- Responsive grid system
- Interactive hover effects
- Emoji icons for visual appeal

---

## 📱 Recommended Screen Sizes

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

All pages are fully responsive!

---

## 💡 Tips

1. **Development**: Gunakan Chrome DevTools untuk debugging
2. **Testing**: Coba di berbagai browser (Chrome, Firefox, Edge)
3. **Mobile**: Test responsiveness dengan device toolbar
4. **Database**: Gunakan MongoDB Compass untuk view data
5. **API Testing**: Gunakan Postman untuk test endpoints

---

## 🎓 Learning Resources

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://www.mongodb.com/docs
- JWT: https://jwt.io

---

**Happy Coding! 🚀**
