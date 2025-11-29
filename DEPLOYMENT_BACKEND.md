# 🚀 Backend Deployment Guide

## Prerequisites
- MongoDB Atlas account with database set up
- Node.js 18+ installed
- Git repository

## Deployment Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

#### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Network Access** → Add IP: `0.0.0.0/0` (allow from anywhere)
3. Copy your connection string

#### Step 2: Deploy to Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `meditracker-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Environment Variables** (click "Advanced"):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (3-5 minutes)
8. Copy your service URL: `https://meditracker-backend.onrender.com`

---

### Option 2: Deploy to Railway

#### Step 1: Deploy
1. Go to [Railway.app](https://railway.app)
2. Click **"Start a New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway auto-detects Node.js

#### Step 2: Configure
1. Click on your service
2. Go to **"Variables"** tab
3. Add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   ```

4. Go to **"Settings"** tab
5. Set **Root Directory**: `/backend`
6. Set **Start Command**: `npm start`

7. Copy your deployment URL

---

### Option 3: Deploy to Vercel

#### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 2: Deploy
```powershell
cd backend
vercel
```

Follow prompts:
- Link to existing project? **N**
- What's your project's name? **meditracker-backend**
- In which directory is your code located? **.**

#### Step 3: Set Environment Variables
```powershell
vercel env add MONGODB_URI
vercel env add JWT_SECRET
```

Enter values when prompted.

#### Step 4: Deploy to Production
```powershell
vercel --prod
```

---

### Option 4: Deploy to Heroku

#### Step 1: Install Heroku CLI
Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### Step 2: Login and Create App
```powershell
heroku login
cd backend
heroku create meditracker-backend
```

#### Step 3: Set Environment Variables
```powershell
heroku config:set MONGODB_URI="your_connection_string"
heroku config:set JWT_SECRET="your_secret_key"
```

#### Step 4: Deploy
```powershell
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a meditracker-backend
git push heroku main
```

---

## Post-Deployment Checklist

### 1. Test API Endpoint
```powershell
curl https://your-backend-url.com/
```

Expected response:
```json
{
  "message": "MediTracker API is running!",
  "status": "success",
  "timestamp": "..."
}
```

### 2. Test Authentication
```powershell
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### 3. Update Frontend API URL
In `frontend/src/services/api.js`:
```javascript
const API_URL = 'https://your-backend-url.com/api';
```

### 4. MongoDB Atlas - Add Deployment IP
If using a specific hosting platform, add its IP ranges to MongoDB Atlas whitelist.

---

## Important Notes

### File Uploads
- **Render/Railway/Heroku**: Uploaded files are **ephemeral** (deleted on restart)
- **Solution**: Use cloud storage (AWS S3, Cloudinary, etc.) for production
- For now, uploads work but will be lost on dyno/container restart

### CORS Configuration
Ensure your backend allows requests from your frontend domain.

In `server.js`, update CORS:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Environment Variables Required
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Auto-assigned by platform (optional)

---

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Ensure database name is in connection string

### Server Won't Start
- Check logs: `heroku logs --tail` or platform-specific logs
- Verify all dependencies in `package.json`
- Ensure Node.js version compatibility

### Upload Folder Missing
- Platform creates folders automatically
- Check permissions in deployment settings

---

## Recommended Deployment Order

1. ✅ Deploy Backend first (Render/Railway)
2. ✅ Test all API endpoints
3. ✅ Deploy Frontend (Vercel/Netlify)
4. ✅ Update Frontend API URL
5. ✅ Test full application flow

---

## Free Tier Limits

### Render
- 750 hours/month free
- Sleeps after 15 min inactivity
- Cold start: ~30 seconds

### Railway
- $5 free credit/month
- No sleep time
- Faster cold starts

### Vercel
- Serverless functions
- 100GB bandwidth/month
- Good for API

Choose based on your needs! **Render** is recommended for beginners.
