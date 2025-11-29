# ✅ Pre-Deployment Checklist

## Before You Deploy

### 1. Environment Variables
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` exists with sample values
- [ ] All required variables documented

### 2. MongoDB Atlas Setup
- [ ] Database created
- [ ] User credentials set up
- [ ] IP whitelist configured (`0.0.0.0/0` for deployment)
- [ ] Connection string tested locally

### 3. Code Review
- [ ] All API routes tested locally
- [ ] Error handling implemented
- [ ] Sensitive data not hardcoded
- [ ] CORS configured for production

### 4. Dependencies
- [ ] `package.json` has all dependencies
- [ ] No dev dependencies in production build
- [ ] Node version specified in `engines`

### 5. File Structure
- [ ] `uploads/` folder in `.gitignore`
- [ ] Static file serving configured
- [ ] User-specific folders implemented

## Quick Deploy Steps

### For Render.com (Recommended)

1. **Push to GitHub**
   ```powershell
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Sign up at https://render.com
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`

3. **Test Deployment**
   ```powershell
   # Replace with your Render URL
   curl https://your-app.onrender.com/
   ```

4. **Update Frontend**
   - Copy your backend URL
   - Update `frontend/src/services/api.js`:
     ```javascript
     const API_URL = 'https://your-app.onrender.com/api';
     ```

## Post-Deployment

- [ ] API health check passes
- [ ] MongoDB connection successful
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test file upload
- [ ] Update frontend with backend URL
- [ ] Test full user flow

## Common Issues

### MongoDB Connection Fails
- Check IP whitelist in Atlas
- Verify connection string
- Ensure database name is included

### CORS Errors
- Add frontend URL to `allowedOrigins`
- Set `FRONTEND_URL` environment variable

### File Uploads Not Working
- Check `uploads/` folder permissions
- Note: Files are ephemeral on Render/Heroku (lost on restart)
- Consider cloud storage for production

## Environment Variables Reference

```bash
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibecoding
JWT_SECRET=your-random-secret-key-min-32-chars

# Optional
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

## Platform-Specific Notes

### Render
- Free tier sleeps after 15 min inactivity
- First request after sleep: ~30 sec delay
- 750 free hours/month

### Railway
- $5 free credit/month
- No sleep time
- Faster than Render free tier

### Vercel
- Serverless (no persistent uploads)
- Best for API-only backends
- 100GB bandwidth/month

---

**Need help?** Check `DEPLOYMENT_BACKEND.md` for detailed instructions.
