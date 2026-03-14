# 🚀 DorjeX AI Tutor - Implementation Plan
## Xây dựng ứng dụng web như Coursera/Khan Academy

**Ngày tạo:** 2026-01-04  
**Mục tiêu:** Chuyển đổi DorjeX AI Tutor từ Custom GPT → Full-stack Web Application  
**Timeline ước tính:** 12-16 tuần

---

## 📋 Executive Summary

### **Hiện trạng:**
- ✅ Có 23 modules nội dung chất lượng cao
- ✅ Có quiz system (YAML format)
- ✅ Có reflex routing logic
- ❌ Chỉ chạy trên ChatGPT (phụ thuộc GPT-4)
- ❌ Không có UI/UX riêng
- ❌ Không có user management
- ❌ Không có progress tracking

### **Mục tiêu:**
Xây dựng ứng dụng web **DorjeX AI Tutor Platform** với:
- 🎯 UI/UX như Coursera/Khan Academy
- 🎯 User authentication & management
- 🎯 Progress tracking & analytics
- 🎯 Interactive learning experience
- 🎯 Certificate system (blockchain-verified)
- 🎯 AI-powered tutor (tích hợp GPT-4 hoặc open-source LLM)

---

## 🎯 Vai trò & Phân công

### **Team Structure (Minimum Viable Team):**

| Vai trò | Số lượng | Trách nhiệm | Skills cần |
|---------|----------|-------------|------------|
| **Product Owner** | 1 | Vision, roadmap, prioritization | Product management, AI education |
| **Full-stack Developer** | 2-3 | Frontend + Backend development | React, Node.js, Python, PostgreSQL |
| **AI/ML Engineer** | 1 | LLM integration, reflex engine | Python, LangChain, GPT-4 API |
| **UI/UX Designer** | 1 | Design system, user flows | Figma, UI/UX principles |
| **DevOps Engineer** | 0.5 | Deployment, CI/CD | Docker, AWS/GCP, GitHub Actions |
| **QA Engineer** | 0.5 | Testing, quality assurance | Automated testing, manual QA |

**Total:** 5-6 FTE (Full-time Equivalent)

---

## 🏗️ Tech Stack

### **Frontend:**
```
Framework: Next.js 14 (React)
Styling: TailwindCSS + shadcn/ui
State Management: Zustand / React Query
Animation: Framer Motion
Charts: Recharts / Chart.js
```

### **Backend:**
```
API: FastAPI (Python) hoặc Express.js (Node.js)
Database: PostgreSQL (main) + Redis (cache)
ORM: Prisma (Node.js) hoặc SQLAlchemy (Python)
Authentication: NextAuth.js / Auth0
File Storage: AWS S3 / Cloudflare R2
```

### **AI/LLM:**
```
Primary: OpenAI GPT-4 API
Fallback: Anthropic Claude / Open-source LLMs (Llama 3)
Framework: LangChain / LlamaIndex
Vector DB: Pinecone / Weaviate (cho RAG)
```

### **Infrastructure:**
```
Hosting: Vercel (Frontend) + AWS/GCP (Backend)
CDN: Cloudflare
Monitoring: Sentry + PostHog
CI/CD: GitHub Actions
```

---

## 📐 Architecture Design

### **High-level Architecture:**

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  (Next.js + TailwindCSS + shadcn/ui)                    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY                           │
│  (FastAPI / Express.js)                                 │
└─────────────────────────────────────────────────────────┘
           ↓                ↓                ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Auth Service│  │Content Service│  │  AI Service  │
│              │  │              │  │              │
│ - Login      │  │ - Modules    │  │ - GPT-4 API  │
│ - Register   │  │ - Lessons    │  │ - Reflex     │
│ - Profile    │  │ - Quizzes    │  │ - RAG        │
└──────────────┘  └──────────────┘  └──────────────┘
           ↓                ↓                ↓
┌─────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                        │
│  PostgreSQL + Redis + S3                                │
└─────────────────────────────────────────────────────────┘
```

### **Database Schema (Core Tables):**

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Modules
CREATE TABLE modules (
  id VARCHAR(10) PRIMARY KEY, -- M1, M2, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(10), -- L1, L2, L3, L4
  order_index INT,
  is_published BOOLEAN DEFAULT false
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  module_id VARCHAR(10) REFERENCES modules(id),
  title VARCHAR(255) NOT NULL,
  content TEXT, -- Markdown content
  order_index INT,
  estimated_time INT -- minutes
);

-- Quizzes
CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  module_id VARCHAR(10) REFERENCES modules(id),
  passing_score INT DEFAULT 80
);

-- Quiz Questions
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id),
  question_text TEXT NOT NULL,
  options JSONB, -- [{id: 'a', text: '...'}]
  correct_answer VARCHAR(10),
  explanation TEXT
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  module_id VARCHAR(10) REFERENCES modules(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quiz_id UUID REFERENCES quizzes(id),
  score INT,
  answers JSONB,
  attempted_at TIMESTAMP DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  module_id VARCHAR(10) REFERENCES modules(id),
  issued_at TIMESTAMP DEFAULT NOW(),
  certificate_url TEXT,
  blockchain_hash TEXT -- Optional: blockchain verification
);

-- AI Conversations
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  module_id VARCHAR(10),
  messages JSONB, -- [{role: 'user', content: '...'}]
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 UI/UX Design

### **Key Pages:**

#### 1. **Landing Page**
- Hero section với value proposition
- Featured modules showcase
- Testimonials
- CTA: "Start Learning Free"

#### 2. **Dashboard (Student)**
```
┌─────────────────────────────────────────────┐
│  Welcome back, [Name]! 👋                   │
├─────────────────────────────────────────────┤
│  📊 Your Progress                           │
│  ▓▓▓▓▓▓▓▓░░░░░░░░ 45% (10/23 modules)     │
├─────────────────────────────────────────────┤
│  🔥 Continue Learning                       │
│  ┌───────────────────────────────────────┐ │
│  │ M12: Product Engineering              │ │
│  │ Lesson 3/8 • 65% complete             │ │
│  │ [Continue →]                          │ │
│  └───────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  📚 All Modules                             │
│  [M1] [M2] [M3] ... [M23]                  │
└─────────────────────────────────────────────┘
```

#### 3. **Module Page**
```
┌─────────────────────────────────────────────┐
│  M1: Introduction to AI                     │
│  Level: L1 • 4 lessons • 2 hours           │
├─────────────────────────────────────────────┤
│  📖 Lessons                                 │
│  ✅ 1. What is AI?                         │
│  ✅ 2. History of AI                       │
│  ▶️  3. AI Applications (Current)          │
│  🔒 4. Ethics in AI                        │
├─────────────────────────────────────────────┤
│  📝 Quiz (Locked until lessons complete)   │
│  🏆 Certificate (Unlock with 80%+ score)   │
└─────────────────────────────────────────────┘
```

#### 4. **Lesson Page (Interactive)**
```
┌─────────────────────────────────────────────┐
│  ← Back to M1    Lesson 3/4    Next →      │
├─────────────────────────────────────────────┤
│  # AI Applications in 2025                  │
│                                             │
│  [Markdown content with images/videos]     │
│                                             │
│  💬 Ask AI Tutor                           │
│  ┌───────────────────────────────────────┐ │
│  │ Type your question...                 │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  [Mark as Complete]                        │
└─────────────────────────────────────────────┘
```

#### 5. **Quiz Page**
```
┌─────────────────────────────────────────────┐
│  Quiz: M1 - Introduction to AI              │
│  Question 1/3                               │
├─────────────────────────────────────────────┤
│  What is the relationship between AI, ML,   │
│  and DL?                                    │
│                                             │
│  ○ A. AI ⊃ ML ⊃ DL                         │
│  ○ B. ML ⊃ AI ⊃ DL                         │
│  ○ C. DL ⊃ AI ⊃ ML                         │
│  ○ D. They are unrelated                   │
│                                             │
│  [Submit Answer]                            │
└─────────────────────────────────────────────┘
```

#### 6. **Certificate Page**
```
┌─────────────────────────────────────────────┐
│         🎓 Certificate of Completion        │
│                                             │
│  This certifies that                        │
│  [Student Name]                             │
│  has successfully completed                 │
│  M1: Introduction to AI                     │
│                                             │
│  Score: 90%                                 │
│  Date: Jan 4, 2026                         │
│                                             │
│  [Download PDF] [Share on LinkedIn]        │
│  Verified on blockchain: 0x1234...          │
└─────────────────────────────────────────────┘
```

---

## 🔧 Core Features

### **Phase 1: MVP (Weeks 1-6)**

#### ✅ **Must-Have Features:**

1. **User Authentication**
   - Email/password signup
   - Google OAuth
   - Password reset

2. **Module & Lesson Display**
   - 23 modules với metadata
   - Lesson content (Markdown rendering)
   - Progress tracking (% complete)

3. **Quiz System**
   - Multiple choice questions
   - Auto-grading
   - Score display với explanation

4. **Basic AI Tutor**
   - Chat interface
   - GPT-4 integration
   - Context-aware responses (module-specific)

5. **Certificate Generation**
   - PDF generation (simple template)
   - Download functionality

6. **Responsive Design**
   - Mobile-friendly
   - Tablet support

#### ❌ **Nice-to-Have (Defer to Phase 2):**
- Video lessons
- Coding playground
- Peer discussion
- Gamification
- Advanced analytics

---

### **Phase 2: Enhancement (Weeks 7-12)**

#### ✅ **Additional Features:**

1. **Advanced AI Tutor**
   - Reflex routing logic
   - Tone customization (GenZ, mentor, professor)
   - RAG với lesson content
   - Conversation history

2. **Progress Analytics**
   - Dashboard với charts
   - Time spent tracking
   - Weak areas identification

3. **Gamification**
   - Points system
   - Badges/achievements
   - Leaderboard (optional)
   - Streak tracking

4. **Enhanced Certificate**
   - Blockchain verification (Polygon/Ethereum)
   - LinkedIn integration
   - QR code verification

5. **Content Enhancement**
   - Video lessons (embedded YouTube)
   - Interactive diagrams
   - Code examples với syntax highlighting

6. **Community Features**
   - Discussion forums (per module)
   - Q&A section
   - Peer review (optional)

---

### **Phase 3: Scale & Monetization (Weeks 13-16)**

#### ✅ **Business Features:**

1. **Subscription Model**
   - Free tier (M1-M5)
   - Pro tier ($9.99/month) - Full access
   - Enterprise tier (custom pricing)

2. **Admin Dashboard**
   - User management
   - Content management
   - Analytics dashboard
   - A/B testing tools

3. **Marketing**
   - SEO optimization
   - Blog integration
   - Email campaigns
   - Referral program

4. **Advanced Analytics**
   - Cohort analysis
   - Retention metrics
   - Conversion funnel
   - Revenue tracking

---

## 📅 Implementation Timeline

### **Week 1-2: Setup & Foundation**
- [ ] Setup development environment
- [ ] Initialize Next.js project
- [ ] Setup database (PostgreSQL)
- [ ] Design database schema
- [ ] Setup authentication (NextAuth.js)
- [ ] Create basic UI components (shadcn/ui)

### **Week 3-4: Content Migration**
- [ ] Parse YAML files → Database
- [ ] Convert Markdown lessons → Database
- [ ] Migrate quiz questions
- [ ] Setup S3 for assets
- [ ] Create seed data script

### **Week 5-6: Core Features**
- [ ] Module listing page
- [ ] Lesson viewer (Markdown rendering)
- [ ] Quiz functionality
- [ ] Progress tracking
- [ ] Basic AI chat integration

### **Week 7-8: AI Tutor Enhancement**
- [ ] Implement reflex routing
- [ ] RAG setup với Pinecone
- [ ] Tone customization
- [ ] Conversation history

### **Week 9-10: Certificate & Analytics**
- [ ] PDF certificate generation
- [ ] Blockchain verification (optional)
- [ ] Progress dashboard
- [ ] Analytics charts

### **Week 11-12: Polish & Testing**
- [ ] UI/UX refinement
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing

### **Week 13-14: Deployment**
- [ ] Setup production environment
- [ ] CI/CD pipeline
- [ ] Domain setup
- [ ] SSL certificates
- [ ] Monitoring tools

### **Week 15-16: Launch & Marketing**
- [ ] Beta testing
- [ ] Bug fixes
- [ ] Marketing materials
- [ ] Soft launch
- [ ] Collect feedback

---

## 💰 Budget Estimate

### **Development Costs (16 weeks):**

| Item | Cost | Notes |
|------|------|-------|
| **Team Salaries** | $80,000 - $120,000 | 5-6 FTE × 4 months |
| **Infrastructure** | $500 - $1,000/month | AWS/GCP, Vercel, DBs |
| **AI API (GPT-4)** | $500 - $2,000/month | Depends on usage |
| **Tools & Services** | $500/month | Figma, monitoring, etc. |
| **Domain & SSL** | $100/year | One-time |
| **Blockchain (optional)** | $1,000 - $5,000 | Smart contract dev |

**Total MVP (Phase 1):** $50,000 - $80,000  
**Total Full Build (Phase 1-3):** $100,000 - $150,000

### **Ongoing Costs (Monthly):**
- Infrastructure: $500 - $1,000
- AI API: $500 - $2,000 (scales with users)
- Maintenance: $2,000 - $5,000 (part-time dev)

**Total Monthly:** $3,000 - $8,000

---

## 🎯 Success Metrics (KPIs)

### **Phase 1 (MVP):**
- ✅ 100 beta users
- ✅ 50% completion rate (M1)
- ✅ 80% quiz pass rate
- ✅ <2s page load time

### **Phase 2 (Enhancement):**
- ✅ 1,000 active users
- ✅ 30% completion rate (full program)
- ✅ 4.5+ star rating
- ✅ 20% monthly retention

### **Phase 3 (Scale):**
- ✅ 10,000 active users
- ✅ 5% conversion to paid
- ✅ $10,000 MRR (Monthly Recurring Revenue)
- ✅ 50% YoY growth

---

## 🚧 Risks & Mitigation

### **Technical Risks:**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| GPT-4 API costs too high | High | Medium | Use caching, rate limiting, fallback to cheaper models |
| Database scalability | Medium | Low | Use PostgreSQL with proper indexing, Redis cache |
| AI response quality | High | Medium | Fine-tune prompts, use RAG, human review |

### **Business Risks:**

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low user adoption | High | Medium | Strong marketing, free tier, referral program |
| Competition (Coursera, etc.) | High | High | Focus on AI-powered personalization |
| Content becomes outdated | Medium | High | Regular updates, community contributions |

---

## 📝 Next Steps

### **Immediate Actions (Week 1):**

1. **Assemble Team**
   - [ ] Hire/assign developers
   - [ ] Onboard team members
   - [ ] Setup communication channels (Slack, etc.)

2. **Setup Infrastructure**
   - [ ] Create GitHub repository
   - [ ] Setup project management (Jira/Linear)
   - [ ] Initialize Next.js project
   - [ ] Setup development database

3. **Design Phase**
   - [ ] Create wireframes (Figma)
   - [ ] Design system (colors, typography, components)
   - [ ] User flow diagrams

4. **Content Audit**
   - [ ] Review all 23 modules
   - [ ] Identify gaps or outdated content
   - [ ] Plan content updates

---

## 🎓 Conclusion

Xây dựng **DorjeX AI Tutor Platform** là một dự án **khả thi** với:

### ✅ **Strengths:**
- Nội dung chất lượng cao đã có sẵn (23 modules)
- Reflex logic đã được thiết kế
- Market fit rõ ràng (AI education booming)

### ⚠️ **Challenges:**
- Cần team 5-6 người
- Budget $100K-$150K
- Timeline 16 tuần
- Cạnh tranh với Coursera, Udemy

### 💡 **Recommendation:**

**Start with MVP (Phase 1)** để:
1. Validate market fit
2. Gather user feedback
3. Minimize initial investment

Sau đó scale dựa trên traction thực tế.

---

**Ready to build? Let's start with Phase 1! 🚀**
