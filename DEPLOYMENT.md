# Deployment Guide — DorjeX AI Tutor

## Architecture

```
[Users] → [Vercel] (Next.js frontend)
             ↓ API calls
         [Railway] (FastAPI backend)
             ↓
         [Railway PostgreSQL] + [Railway Redis]
```

---

## Prerequisites

- GitHub account
- Railway account (free tier: railway.app)
- Vercel account (free tier: vercel.com)

---

## Step 1: Setup Railway (Backend + Database)

### 1.1 Create Railway Project
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init
```

### 1.2 Add PostgreSQL & Redis
In Railway dashboard:
1. New Service → Database → PostgreSQL
2. New Service → Database → Redis

### 1.3 Deploy Backend
```bash
cd backend

# Link to Railway project
railway link

# Set environment variables
railway variables set OPENAI_API_KEY=sk-...
railway variables set JWT_SECRET=$(openssl rand -hex 32)
# DATABASE_URL and REDIS_URL are auto-set by Railway

# Deploy
railway up
```

After deploy, copy your Railway backend URL (e.g., `https://dorjex-backend.up.railway.app`)

---

## Step 2: Setup Vercel (Frontend)

### 2.1 Install & Login
```bash
npm install -g vercel
vercel login
```

### 2.2 Configure Environment Variables
In Vercel dashboard → Project Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL = https://your-backend.up.railway.app
```

### 2.3 Update vercel.json
Edit `vercel.json` and replace `your-app.up.railway.app` with your actual Railway URL.

### 2.4 Deploy Frontend
```bash
cd frontend
npm install
vercel --prod
```

---

## Step 3: Setup GitHub Actions (Auto Deploy)

Add these secrets to GitHub repository (Settings → Secrets):
```
RAILWAY_TOKEN       # from Railway dashboard → Account → Tokens
VERCEL_TOKEN        # from Vercel dashboard → Settings → Tokens
VERCEL_ORG_ID       # from vercel.json after first deploy
VERCEL_PROJECT_ID   # from vercel.json after first deploy
```

After this, every push to `main` will auto-deploy.

---

## Step 4: Run Production Readiness Gate

The `production-readiness-gate` workflow runs automatically on every push.
Check the GitHub Actions tab to see the readiness report.

To run manually:
```
GitHub → Actions → Production Readiness Gate → Run workflow
```

---

## Local Development

```bash
# Copy env files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Edit .env files with your credentials

# Start all services
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

## Checklist Before Production

- [ ] All env variables set in Railway & Vercel
- [ ] Database migrations run (`alembic upgrade head`)
- [ ] Content migrated (`python scripts/migrate_content.py`)
- [ ] Health check passing: `GET /health`
- [ ] CORS configured with production frontend URL
- [ ] Production Readiness Gate: all checks PASS
