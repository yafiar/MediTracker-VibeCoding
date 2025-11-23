# 📋 MediTracker - Component Documentation

## 🎯 Overview
Dokumentasi lengkap untuk setiap komponen dan halaman dalam aplikasi MediTracker.

---

## 📄 Pages

### 1. Login.js
**Path:** `/login`

**Fitur:**
- Form login dengan email dan password
- Validasi input
- Error handling
- Redirect ke dashboard setelah login sukses
- Link ke halaman register

**State:**
```javascript
{
  email: string,
  password: string,
  error: string,
  loading: boolean
}
```

**API Calls:**
- `POST /api/auth/login` - Login user

---

### 2. Register.js
**Path:** `/register`

**Fitur:**
- Form registrasi dengan nama, email, password, dan konfirmasi password
- Validasi password (min 6 karakter)
- Validasi password match
- Error handling
- Redirect ke login setelah registrasi sukses
- Link ke halaman login

**State:**
```javascript
{
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  error: string,
  loading: boolean
}
```

**API Calls:**
- `POST /api/auth/register` - Register user

---

### 3. Dashboard.js
**Path:** `/dashboard`

**Fitur:**
- Menampilkan semua obat dalam grid card layout
- Tab navigation (My Medicines / Today's Intake)
- Quick actions untuk setiap medicine:
  - Edit medicine
  - Set schedule
  - Delete medicine
- View today's intake records
- Logout button
- Empty state handling

**State:**
```javascript
{
  medicines: Array,
  todayIntakes: Array,
  loading: boolean,
  activeTab: 'medicines' | 'today'
}
```

**API Calls:**
- `GET /api/medicines` - Get all medicines
- `GET /api/intakes/today` - Get today's intakes
- `DELETE /api/medicines/:id` - Delete medicine

**Protected:** ✅ Requires authentication

---

### 4. MedicineForm.js
**Path:** 
- `/medicines/add` - Add new medicine
- `/medicines/edit/:id` - Edit existing medicine

**Fitur:**
- Form untuk add/edit medicine
- Image upload dengan preview
- Drag & drop / click to upload
- Auto-detect edit mode dari URL params
- Pre-fill form saat edit
- Cancel button (kembali ke dashboard)

**State:**
```javascript
{
  formData: {
    name: string,
    dosage: string,
    description: string,
    frequency: number
  },
  image: File,
  imagePreview: string,
  loading: boolean,
  error: string
}
```

**API Calls:**
- `POST /api/medicines` - Create medicine (multipart/form-data)
- `PUT /api/medicines/:id` - Update medicine (multipart/form-data)
- `GET /api/medicines/:id` - Get medicine detail (edit mode)

**Protected:** ✅ Requires authentication

---

### 5. ScheduleManagement.js
**Path:** `/medicines/:medicineId/schedule`

**Fitur:**
- Menampilkan medicine info (nama, dosage)
- List semua schedule untuk medicine tertentu
- Add new schedule form:
  - Time picker
  - Days of week selector (Mon-Sun)
- Mark as taken button untuk setiap schedule
- Delete schedule
- Empty state saat belum ada schedule

**State:**
```javascript
{
  medicine: Object,
  schedules: Array,
  showAddForm: boolean,
  newSchedule: {
    time: string,
    days: Array<string>
  },
  loading: boolean
}
```

**API Calls:**
- `GET /api/medicines/:id` - Get medicine detail
- `GET /api/schedules/medicine/:medicineId` - Get schedules by medicine
- `POST /api/schedules` - Create schedule
- `DELETE /api/schedules/:id` - Delete schedule
- `POST /api/intakes` - Mark as taken

**Protected:** ✅ Requires authentication

---

## 🧩 Components

### PrivateRoute.js
**Purpose:** Melindungi route yang memerlukan authentication

**Functionality:**
- Cek token di localStorage
- Redirect ke /login jika tidak ada token
- Render children component jika ada token

**Usage:**
```jsx
<Route path="/dashboard" element={
  <PrivateRoute>
    <Dashboard />
  </PrivateRoute>
} />
```

---

## 🔧 Services

### api.js
**Purpose:** Centralized API configuration dan functions

**Features:**
- Axios instance dengan base URL
- Request interceptor (auto-attach JWT token)
- Response interceptor (handle 401 errors)
- Organized API functions by resource

**API Functions:**

**Auth:**
```javascript
authAPI.register(data)
authAPI.login(data)
```

**Medicine:**
```javascript
medicineAPI.getAll()
medicineAPI.getById(id)
medicineAPI.create(formData)
medicineAPI.update(id, formData)
medicineAPI.delete(id)
```

**Schedule:**
```javascript
scheduleAPI.getAll()
scheduleAPI.getByMedicine(medicineId)
scheduleAPI.create(data)
scheduleAPI.update(id, data)
scheduleAPI.delete(id)
```

**Intake:**
```javascript
intakeAPI.getAll()
intakeAPI.getTodayIntakes()
intakeAPI.markAsTaken(data)
intakeAPI.delete(id)
```

---

## 🎨 Styling

### Auth.css
**Used by:** Login.js, Register.js

**Features:**
- Gradient background
- Centered card layout
- Animated logo (bounce effect)
- Form styling dengan focus states
- Error message styling
- Responsive design

**Key Classes:**
- `.auth-container` - Full screen container
- `.auth-card` - Main card
- `.auth-header` - Logo dan title
- `.auth-form` - Form wrapper
- `.form-group` - Input wrapper
- `.error-message` - Error display

---

### Dashboard.css
**Used by:** Dashboard.js

**Features:**
- Navbar dengan sticky positioning
- Grid layout untuk medicine cards
- Tab navigation
- Card hover effects
- Icon buttons
- Empty state design

**Key Classes:**
- `.dashboard` - Main wrapper
- `.navbar` - Top navigation
- `.medicines-grid` - Grid layout
- `.medicine-card` - Card component
- `.medicine-actions` - Action buttons
- `.intake-list` - Intake records list

---

### MedicineForm.css
**Used by:** MedicineForm.js

**Features:**
- Form card layout
- Image upload area dengan drag & drop
- Form input styling
- Button group
- Responsive layout

**Key Classes:**
- `.medicine-form-container` - Page wrapper
- `.form-card` - Form card
- `.image-upload-section` - Upload area
- `.form-group` - Input group
- `.form-actions` - Button group

---

### ScheduleManagement.css
**Used by:** ScheduleManagement.js

**Features:**
- Schedule card layout
- Days selector styling
- Time picker styling
- Schedule item cards
- Action buttons

**Key Classes:**
- `.schedule-container` - Page wrapper
- `.schedule-card` - Main card
- `.days-selector` - Day buttons
- `.schedule-item` - Schedule card
- `.day-badge` - Day indicator

---

## 🔄 Data Flow

### Authentication Flow
```
1. User input credentials → Login/Register page
2. Submit form → authAPI.login/register
3. Receive JWT token
4. Store token in localStorage
5. Redirect to Dashboard
6. Token auto-attached to all requests via interceptor
```

### Medicine Management Flow
```
1. Dashboard → View all medicines
2. Click "Add Medicine" → MedicineForm
3. Fill form + upload image → medicineAPI.create
4. Back to Dashboard → Refresh list
```

### Schedule Management Flow
```
1. Dashboard → Click schedule icon on medicine card
2. ScheduleManagement page → View existing schedules
3. Add new schedule → scheduleAPI.create
4. Mark as taken → intakeAPI.markAsTaken
5. View intake history in Dashboard
```

---

## 🔐 Authentication System

### Token Storage
- Token disimpan di `localStorage` dengan key `'token'`
- Token otomatis ditambahkan ke setiap request via interceptor

### Protected Routes
Semua route kecuali `/login` dan `/register` protected dengan `<PrivateRoute>`

### Auto Logout
Jika receive 401 response:
1. Clear token dari localStorage
2. Redirect ke `/login`

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
  /* Compact layout */
}

/* Tablet */
@media (max-width: 768px) {
  /* Adjusted layout */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full layout */
}
```

---

## ✨ Animations

### FadeIn
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### FadeInUp
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Bounce (Logo)
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Spin (Loading)
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 🎯 User Experience Features

### Loading States
- Spinner animation saat fetch data
- Disabled buttons saat submit
- Loading text pada buttons

### Error Handling
- Display error messages dalam red box
- Auto-clear error saat re-submit
- Informative error messages

### Empty States
- Friendly empty state dengan icon
- Call-to-action button
- Helpful message

### Success Feedback
- Alert saat mark as taken
- Auto-refresh data setelah action
- Navigate back setelah create/update

---

## 🔧 Best Practices

### Code Organization
- Separate components by feature
- Centralized API calls
- Reusable CSS classes

### State Management
- Local state dengan useState
- Side effects dengan useEffect
- Cleanup functions where needed

### Form Handling
- Controlled components
- Validation before submit
- Clear form after submit

### Image Handling
- Preview before upload
- FileReader API
- Multipart form data

---

## 📝 Notes

- Semua waktu ditampilkan dalam format lokal user
- Images di-serve dari backend `/uploads` folder
- Token validation dilakukan di backend
- File size limit: 5MB (configured in backend)

---

**Last Updated:** November 23, 2025
