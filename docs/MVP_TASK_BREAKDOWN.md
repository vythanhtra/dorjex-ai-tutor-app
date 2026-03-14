# 📋 DorjeX AI Tutor - Phase 1 MVP Task Breakdown

**Timeline:** 6 tuần (Weeks 1-6)  
**Goal:** Launch working MVP với core features  
**Team:** 5-6 người

---

## 🎯 Sprint Planning (2-week sprints)

### **Sprint 1 (Weeks 1-2): Foundation**
**Goal:** Setup cơ sở hạ tầng và authentication

### **Sprint 2 (Weeks 3-4): Content & Core Features**
**Goal:** Migrate content và implement lesson viewer

### **Sprint 3 (Weeks 5-6): AI Integration & Polish**
**Goal:** AI tutor, quiz system, và final polish

---

## 📅 Sprint 1: Foundation (Weeks 1-2)

### **Week 1: Project Setup**

#### **Day 1-2: Infrastructure Setup**
**Owner:** DevOps Engineer

- [ ] **Repository Setup**
  - [ ] Create GitHub repository
  - [ ] Setup branch protection rules
  - [ ] Configure GitHub Actions for CI/CD
  - [ ] Setup ESLint + Prettier

- [ ] **Development Environment**
  - [ ] Initialize Next.js 14 project
  - [ ] Setup TailwindCSS + shadcn/ui
  - [ ] Configure TypeScript
  - [ ] Setup environment variables (.env.local)

- [ ] **Database Setup**
  - [ ] Provision PostgreSQL database (Supabase/Neon)
  - [ ] Setup Prisma ORM
  - [ ] Create initial schema
  - [ ] Setup database migrations

**Deliverable:** Working dev environment với database connection

---

#### **Day 3-5: Authentication System**
**Owner:** Full-stack Developer #1

- [ ] **NextAuth.js Setup**
  - [ ] Install and configure NextAuth.js
  - [ ] Setup email/password provider
  - [ ] Setup Google OAuth provider
  - [ ] Create auth API routes

- [ ] **User Management**
  - [ ] Create User model (Prisma schema)
  - [ ] Implement signup endpoint
  - [ ] Implement login endpoint
  - [ ] Implement logout endpoint
  - [ ] Password hashing (bcrypt)

- [ ] **Auth UI Components**
  - [ ] Login page
  - [ ] Signup page
  - [ ] Forgot password page
  - [ ] Protected route wrapper

**Deliverable:** Working authentication system

---

### **Week 2: UI Foundation & Database Schema**

#### **Day 1-3: Design System**
**Owner:** UI/UX Designer + Full-stack Developer #2

- [ ] **Design System (Figma)**
  - [ ] Color palette
  - [ ] Typography scale
  - [ ] Component library (buttons, cards, inputs)
  - [ ] Layout templates

- [ ] **UI Components (shadcn/ui)**
  - [ ] Button variants
  - [ ] Card component
  - [ ] Input components
  - [ ] Navigation (header, sidebar)
  - [ ] Modal/Dialog
  - [ ] Progress bar
  - [ ] Badge/Tag

**Deliverable:** Design system + reusable components

---

#### **Day 4-5: Database Schema Implementation**
**Owner:** Full-stack Developer #1

- [ ] **Core Tables**
  ```sql
  - [ ] users table
  - [ ] modules table
  - [ ] lessons table
  - [ ] quizzes table
  - [ ] quiz_questions table
  - [ ] user_progress table
  - [ ] quiz_attempts table
  - [ ] certificates table
  - [ ] ai_conversations table
  ```

- [ ] **Seed Data Script**
  - [ ] Create seed script for modules (M1-M23)
  - [ ] Test data for development

**Deliverable:** Complete database schema với seed data

---

## 📅 Sprint 2: Content & Core Features (Weeks 3-4)

### **Week 3: Content Migration**

#### **Day 1-3: YAML → Database Migration**
**Owner:** Full-stack Developer #2 + AI/ML Engineer

- [ ] **Parser Scripts**
  - [ ] Parse lesson_m*.md files
  - [ ] Parse quiz_m*.yaml files
  - [ ] Parse reflex_mapping_m*.yaml files
  - [ ] Extract metadata from files

- [ ] **Data Migration**
  - [ ] Migrate 23 modules
  - [ ] Migrate 23 lessons
  - [ ] Migrate 11 quizzes
  - [ ] Migrate quiz questions
  - [ ] Upload assets to S3

- [ ] **Data Validation**
  - [ ] Verify all content migrated
  - [ ] Check data integrity
  - [ ] Test queries

**Deliverable:** All content in database

---

#### **Day 4-5: Module & Lesson Pages**
**Owner:** Full-stack Developer #1

- [ ] **Module Listing Page**
  - [ ] Fetch modules from database
  - [ ] Display module cards
  - [ ] Show progress indicator
  - [ ] Filter by level (L1-L4)

- [ ] **Module Detail Page**
  - [ ] Display module info
  - [ ] List lessons
  - [ ] Show quiz status
  - [ ] Lock/unlock logic

**Deliverable:** Working module pages

---

### **Week 4: Lesson Viewer & Progress Tracking**

#### **Day 1-3: Lesson Viewer**
**Owner:** Full-stack Developer #2

- [ ] **Lesson Page**
  - [ ] Fetch lesson content
  - [ ] Render Markdown (react-markdown)
  - [ ] Syntax highlighting (prism.js)
  - [ ] Navigation (prev/next)
  - [ ] "Mark as Complete" button

- [ ] **Progress Tracking**
  - [ ] API endpoint: POST /api/progress
  - [ ] Update user_progress table
  - [ ] Calculate module completion %
  - [ ] Update UI in real-time

**Deliverable:** Working lesson viewer với progress tracking

---

#### **Day 4-5: Dashboard**
**Owner:** Full-stack Developer #1

- [ ] **Student Dashboard**
  - [ ] Welcome section
  - [ ] Overall progress (%)
  - [ ] "Continue Learning" card
  - [ ] Module grid
  - [ ] Recent activity

- [ ] **API Endpoints**
  - [ ] GET /api/dashboard/stats
  - [ ] GET /api/dashboard/recent

**Deliverable:** Working dashboard

---

## 📅 Sprint 3: AI Integration & Polish (Weeks 5-6)

### **Week 5: Quiz System & AI Tutor**

#### **Day 1-2: Quiz System**
**Owner:** Full-stack Developer #2

- [ ] **Quiz Page**
  - [ ] Fetch quiz questions
  - [ ] Display questions one-by-one
  - [ ] Multiple choice UI
  - [ ] Submit answer
  - [ ] Show explanation

- [ ] **Quiz Grading**
  - [ ] API endpoint: POST /api/quiz/submit
  - [ ] Calculate score
  - [ ] Save to quiz_attempts
  - [ ] Unlock certificate if ≥80%

**Deliverable:** Working quiz system

---

#### **Day 3-5: AI Tutor Integration**
**Owner:** AI/ML Engineer + Full-stack Developer #1

- [ ] **GPT-4 Integration**
  - [ ] Setup OpenAI API client
  - [ ] Create chat API endpoint
  - [ ] Implement streaming responses
  - [ ] Add rate limiting

- [ ] **Context-Aware Responses**
  - [ ] Pass current module/lesson context
  - [ ] Use system prompts from reflex_mapping
  - [ ] Implement conversation history

- [ ] **Chat UI**
  - [ ] Chat interface component
  - [ ] Message bubbles (user/AI)
  - [ ] Typing indicator
  - [ ] Error handling

**Deliverable:** Working AI tutor chat

---

### **Week 6: Certificate & Final Polish**

#### **Day 1-2: Certificate Generation**
**Owner:** Full-stack Developer #2

- [ ] **PDF Generation**
  - [ ] Setup PDF library (jsPDF / Puppeteer)
  - [ ] Create certificate template
  - [ ] Generate PDF on quiz pass
  - [ ] Save to S3
  - [ ] Store URL in database

- [ ] **Certificate Page**
  - [ ] Display certificate
  - [ ] Download button
  - [ ] Share on LinkedIn (optional)

**Deliverable:** Working certificate system

---

#### **Day 3-5: Testing & Polish**
**Owner:** QA Engineer + All Developers

- [ ] **Testing**
  - [ ] Unit tests (Jest)
  - [ ] Integration tests (Playwright)
  - [ ] Manual QA testing
  - [ ] Cross-browser testing
  - [ ] Mobile testing

- [ ] **Performance Optimization**
  - [ ] Image optimization
  - [ ] Code splitting
  - [ ] Lazy loading
  - [ ] Caching strategy

- [ ] **Bug Fixes**
  - [ ] Fix critical bugs
  - [ ] UI/UX improvements
  - [ ] Accessibility fixes

- [ ] **Documentation**
  - [ ] README.md
  - [ ] API documentation
  - [ ] Deployment guide

**Deliverable:** Production-ready MVP

---

## 🎯 Definition of Done (DoD)

### **For Each Feature:**
- [ ] Code reviewed by at least 1 other developer
- [ ] Unit tests written (if applicable)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile (iOS/Android)
- [ ] No console errors
- [ ] Meets accessibility standards (WCAG 2.1 AA)
- [ ] Documentation updated

### **For Sprint:**
- [ ] All tasks completed
- [ ] Demo to stakeholders
- [ ] Feedback collected
- [ ] Sprint retrospective done

---

## 📊 Daily Standup Format

**Time:** 9:00 AM daily  
**Duration:** 15 minutes

**Each team member answers:**
1. What did I do yesterday?
2. What will I do today?
3. Any blockers?

---

## 🚀 Deployment Checklist

### **Pre-deployment:**
- [ ] All tests passing
- [ ] Code reviewed and merged
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup strategy in place

### **Deployment:**
- [ ] Deploy to staging
- [ ] Smoke test on staging
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Monitor for errors (Sentry)

### **Post-deployment:**
- [ ] Announce to beta users
- [ ] Monitor performance (PostHog)
- [ ] Collect feedback
- [ ] Plan next sprint

---

## 📝 Tools & Services

### **Development:**
- **IDE:** VS Code
- **Version Control:** GitHub
- **Project Management:** Linear / Jira
- **Communication:** Slack
- **Design:** Figma

### **Infrastructure:**
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway / Render
- **Database:** Supabase / Neon (PostgreSQL)
- **File Storage:** AWS S3 / Cloudflare R2
- **AI API:** OpenAI GPT-4

### **Monitoring:**
- **Error Tracking:** Sentry
- **Analytics:** PostHog / Mixpanel
- **Uptime:** UptimeRobot

---

## 💡 Tips for Success

### **1. Start Simple**
- Don't over-engineer
- Ship MVP fast, iterate later
- Focus on core user flow

### **2. Communication**
- Daily standups
- Weekly sprint reviews
- Clear documentation

### **3. User Feedback**
- Beta test with 10-20 users
- Collect feedback early
- Iterate based on data

### **4. Technical Debt**
- Document shortcuts taken
- Plan refactoring sprints
- Don't accumulate too much debt

---

## 🎯 Success Criteria for MVP

### **Must Have:**
- [ ] User can signup/login
- [ ] User can view all 23 modules
- [ ] User can complete lessons
- [ ] User can take quizzes
- [ ] User can chat with AI tutor
- [ ] User can earn certificates
- [ ] Mobile responsive
- [ ] <2s page load time

### **Nice to Have (defer if needed):**
- [ ] Google OAuth
- [ ] Progress analytics
- [ ] Email notifications
- [ ] Dark mode

---

## 📞 Team Contacts

| Role | Name | Email | Slack |
|------|------|-------|-------|
| Product Owner | TBD | | |
| Full-stack Dev #1 | TBD | | |
| Full-stack Dev #2 | TBD | | |
| AI/ML Engineer | TBD | | |
| UI/UX Designer | TBD | | |
| DevOps Engineer | TBD | | |

---

**Let's build something amazing! 🚀**

**Next Step:** Assemble team and start Week 1, Day 1 tasks.
