# 🎓 DorjeX AI Tutor - Web Application

Hệ thống học AI toàn diện từ cơ bản đến nâng cao, được xây dựng như một web application hiện đại.

---

## 📂 Cấu trúc Project

```
dorjex-ai-tutor-app/
├── frontend/              # Next.js 14 application
│   ├── src/
│   │   ├── app/          # App router (Next.js 14)
│   │   ├── components/   # Reusable components
│   │   ├── lib/          # Utilities & helpers
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── models/      # Database models
│   │   ├── services/    # Business logic
│   │   └── core/        # Config & utilities
│   ├── alembic/         # Database migrations
│   └── requirements.txt
│
├── content/              # Learning content (từ DorjeX v2.4)
│   ├── lesson_m*.md     # 23 lesson files
│   ├── quiz_m*.yaml     # 11 quiz files
│   ├── reflex_mapping_m*.yaml  # 23 reflex mapping files
│   └── module_content_map_UPDATED.yaml
│
├── scripts/              # Utility scripts
│   ├── migrate_content.py    # Migrate YAML → Database
│   ├── seed_database.py      # Seed initial data
│   └── generate_types.py     # Generate TypeScript types
│
└── docs/                 # Documentation
    ├── IMPLEMENTATION_PLAN.md
    ├── MVP_TASK_BREAKDOWN.md
    ├── DORJEX_AI_TUTOR_REVIEW.md
    └── API_DOCUMENTATION.md
```

---

## 🚀 Quick Start

### **Prerequisites:**
- Node.js 18+ 
- Python 3.11+
- PostgreSQL 15+
- OpenAI API key

### **Setup Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local với API keys
npm run dev
```

### **Setup Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env với database URL và API keys
uvicorn app.main:app --reload
```

### **Migrate Content:**
```bash
cd scripts
python migrate_content.py
python seed_database.py
```

---

## 📚 Content Overview

### **23 Modules:**
- **M1-M3:** AI Fundamentals (Intro, ML, DL)
- **M4-M9:** Prompt Engineering
- **M10-M12:** Technical Skills (Evaluation, Python, Product)
- **M13-M18:** Advanced AI (Multimodal, Quantum, Sustainable, etc.)
- **M19-M22:** Domain Applications (Healthcare, Finance, Education, Cybersecurity)
- **M23:** AI Agents

### **Content Files:**
- 23 lesson files (Markdown)
- 11 quiz files (YAML)
- 23 reflex mapping files (YAML)
- 1 module content map (YAML)

---

## 🏗️ Tech Stack

### **Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS + shadcn/ui
- **State:** Zustand
- **API Client:** React Query
- **Markdown:** react-markdown + remark

### **Backend:**
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL + Prisma/SQLAlchemy
- **Cache:** Redis
- **Auth:** JWT + OAuth2
- **AI:** OpenAI GPT-4 API + LangChain

### **Infrastructure:**
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway / Render
- **Database:** Supabase / Neon
- **File Storage:** AWS S3 / Cloudflare R2
- **Monitoring:** Sentry + PostHog

---

## 🎯 Features

### **Phase 1: MVP (Current)**
- [ ] User authentication (email + Google OAuth)
- [ ] Module & lesson browsing
- [ ] Lesson viewer (Markdown rendering)
- [ ] Progress tracking
- [ ] Quiz system (auto-grading)
- [ ] AI tutor chat (GPT-4)
- [ ] Certificate generation (PDF)
- [ ] Mobile responsive

### **Phase 2: Enhancement**
- [ ] Advanced AI tutor (reflex routing, tone customization)
- [ ] Progress analytics dashboard
- [ ] Gamification (points, badges, streaks)
- [ ] Blockchain-verified certificates
- [ ] Video lessons
- [ ] Discussion forums

### **Phase 3: Scale**
- [ ] Subscription model (Free/Pro/Enterprise)
- [ ] Admin dashboard
- [ ] Marketing tools
- [ ] Advanced analytics
- [ ] API for third-party integrations

---

## 📊 Database Schema

### **Core Tables:**
```sql
users, modules, lessons, quizzes, quiz_questions,
user_progress, quiz_attempts, certificates, ai_conversations
```

See `docs/IMPLEMENTATION_PLAN.md` for full schema.

---

## 🔧 Development

### **Frontend Development:**
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
```

### **Backend Development:**
```bash
cd backend
uvicorn app.main:app --reload  # Start dev server
alembic upgrade head             # Run migrations
pytest                           # Run tests
```

### **Content Migration:**
```bash
cd scripts
python migrate_content.py  # Parse YAML → Database
python seed_database.py    # Seed initial data
```

---

## 📖 Documentation

- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)** - Strategic overview, architecture, timeline
- **[MVP Task Breakdown](docs/MVP_TASK_BREAKDOWN.md)** - Detailed task list for 6-week MVP
- **[DorjeX AI Tutor Review](docs/DORJEX_AI_TUTOR_REVIEW.md)** - Analysis of original system
- **[README (Original)](docs/README_DorjeX_v2.4.markdown)** - Original DorjeX v2.4 documentation

---

## 🎯 Roadmap

### **Week 1-2: Foundation**
- Setup Next.js + FastAPI
- Database schema
- Authentication system
- UI components

### **Week 3-4: Content & Core**
- Content migration
- Module/lesson pages
- Progress tracking
- Dashboard

### **Week 5-6: AI & Polish**
- Quiz system
- AI tutor integration
- Certificate generation
- Testing & deployment

See `docs/MVP_TASK_BREAKDOWN.md` for detailed timeline.

---

## 💰 Budget Estimate

- **Development (6 weeks MVP):** $50K-$80K
- **Infrastructure (monthly):** $500-$1K
- **AI API (monthly):** $500-$2K
- **Total MVP:** $50K-$80K

---

## 🤝 Contributing

### **Team Structure:**
- Product Owner (1)
- Full-stack Developers (2-3)
- AI/ML Engineer (1)
- UI/UX Designer (1)
- DevOps Engineer (0.5)
- QA Engineer (0.5)

### **Development Workflow:**
1. Create feature branch from `main`
2. Implement feature
3. Write tests
4. Create PR
5. Code review
6. Merge to `main`
7. Deploy to staging
8. QA testing
9. Deploy to production

---

## 📝 License

TBD - Tùy thuộc vào quyết định của team

---

## 📞 Contact

- **Original Creator:** Vy Thanh Trà (DorjeX v2.4)
- **Email:** contact@vythanhtra.ai
- **Project Lead:** TBD

---

## 🙏 Acknowledgments

- **DorjeX AI Tutor v2.4** - Original content and concept by Vy Thanh Trà
- **OpenAI** - GPT-4 API
- **Vercel** - Frontend hosting
- **shadcn/ui** - UI components

---

**Built with ❤️ for AI education**

**Status:** 🚧 In Development (Phase 1: MVP)

**Last Updated:** 2026-01-04
