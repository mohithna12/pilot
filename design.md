# Pilot — AI Hackathon Project Manager

> *Your AI copilot for hackathons.*

## Product Summary

Pilot is an AI-powered project manager for hackathons. It helps teams move from **idea → plan → build → demo → submission** within a 24–48 hour time constraint.

It combines task management, AI planning, progress prediction, and submission generation into a single platform tailored for hackathon workflows.

### Optimized For

- Short time-boxed projects
- Rapid idea validation
- Dynamic scope changes
- Demo-driven development
- Hackathon judging criteria
- Last-minute submission packaging

---

## Goals

- Help teams choose feasible hackathon ideas quickly
- Auto-generate project plans and timelines
- Allocate work efficiently across team members
- Track progress in real time
- Predict whether the team will finish on time
- Generate submission materials (README, pitch, Devpost)
- Reduce last-minute chaos

## Non-Goals

- Not a GitHub replacement
- Not a general-purpose corporate PM tool
- Not a long-term backlog manager
- Not a code-generation platform
- Not a team chat platform (initially)

---

## User Personas

| Persona | Needs |
|---------|-------|
| **Beginner Hacker** | Structure, idea help, task breakdown, guidance |
| **Experienced Hacker** | Timeline planning, team coordination, submission gen |
| **Solo Hacker** | Time planning, feature prioritization, demo prep reminders |

---

## Core Features

### 1. Hackathon Workspace
Create a workspace with: hackathon name, theme, sponsor APIs, start/end time, team members, and member skills.

### 2. AI Idea Generator
Generates project ideas with feature lists, recommended tech stack, estimated difficulty, time per feature, and a feasibility score.

### 3. AI Project Planner
Converts a selected idea into milestones, tasks, timeline, task owners, dependencies, and suggested scope cuts.

### 4. Task Management (Kanban)
- Columns: To Do, In Progress, Done
- Task properties: priority, deadline, owner, dependencies, tags (frontend, backend, ML, slides, demo)

### 5. Time & Progress Dashboard
- Time remaining, tasks completed/remaining, completion %, risk level (Low/Medium/High), suggested scope cuts

### 6. Submission Generator
AI generates: README, Devpost description, pitch script, slide outline, architecture description, feature list, "What we learned", "Challenges we faced"

### 7. Notifications
- Deadline approaching, task overdue, switch to slides/demo reminder, submission deadline reminder
- Timed triggers: halfway point, 6h remaining, 2h → demo prep, 1h → submission reminder

### 8. File/Media Upload
Upload screenshots, logos, slides, demo video, assets. Stored in S3/Supabase Storage.

---

## Tech Stack

### Frontend
- React + Next.js + TypeScript
- Tailwind CSS
- Zustand (state management)
- WebSockets (realtime updates)

### Backend
- Node.js with Express
- REST API + WebSocket server
- AI service layer

### Database
- PostgreSQL with Row Level Security
- Redis (caching, realtime presence, job queue)

### AI Services
- OpenAI API (idea generation, planning, text generation)
- Embeddings for semantic task grouping

### Storage
- AWS S3 or Supabase Storage

### Auth
- OAuth (Google, GitHub)
- Email magic links
- JWT session tokens

### Notifications
- Firebase Cloud Messaging
- SendGrid (email fallback)
- In-app notifications

---

## Database Schema

### users
| Column | Type |
|--------|------|
| id | uuid, pk |
| name | text |
| email | text |
| avatar_url | text |
| created_at | timestamp |

### workspaces
| Column | Type |
|--------|------|
| id | uuid, pk |
| name | text |
| hackathon_name | text |
| theme | text |
| start_time | timestamp |
| end_time | timestamp |
| owner_id | uuid, fk → users |
| created_at | timestamp |

### workspace_members
| Column | Type |
|--------|------|
| id | uuid, pk |
| workspace_id | uuid, fk → workspaces |
| user_id | uuid, fk → users |
| role | enum (owner, member) |
| skills | text[] |

### ideas
| Column | Type |
|--------|------|
| id | uuid, pk |
| workspace_id | uuid, fk → workspaces |
| title | text |
| description | text |
| tech_stack | text |
| feasibility_score | float |
| created_at | timestamp |

### milestones
| Column | Type |
|--------|------|
| id | uuid, pk |
| workspace_id | uuid, fk → workspaces |
| title | text |
| deadline | timestamp |
| order_index | int |

### tasks
| Column | Type |
|--------|------|
| id | uuid, pk |
| workspace_id | uuid, fk → workspaces |
| milestone_id | uuid, fk → milestones |
| title | text |
| description | text |
| status | enum (todo, in_progress, done) |
| priority | int |
| assigned_to | uuid, fk → users |
| estimated_hours | float |
| due_time | timestamp |
| created_at | timestamp |

### files
| Column | Type |
|--------|------|
| id | uuid, pk |
| workspace_id | uuid, fk → workspaces |
| uploaded_by | uuid, fk → users |
| file_url | text |
| file_type | text |
| created_at | timestamp |

### notifications
| Column | Type |
|--------|------|
| id | uuid, pk |
| user_id | uuid, fk → users |
| workspace_id | uuid, fk → workspaces |
| message | text |
| type | text |
| read | boolean |
| created_at | timestamp |

### Row Level Security
All tables enforce RLS: users can only access data from workspaces they belong to via `workspace_members`.

---

## System Architecture

```
Client (Next.js/React)
  │
  │ HTTPS / WSS
  ▼
API Gateway (Express)
  │
  ├── Auth Service
  ├── Project Service
  ├── Task Service
  ├── AI Service
  ├── File Service
  ├── Notification Service
  └── Realtime Service (WebSockets)

Database (PostgreSQL)
Cache (Redis)
Storage (S3)
AI APIs (OpenAI)
```

---

## Authentication Flow

### OAuth
1. User clicks "Sign in with Google/GitHub"
2. Redirect to OAuth provider → returns token
3. Backend verifies, creates user if new, issues JWT
4. Frontend stores JWT for API requests

### Workspace Invite
1. Owner generates invite link (workspace_id + token)
2. New user signs up via link
3. Added to workspace_members

---

## Screens

| Screen | Key Elements |
|--------|-------------|
| **Landing** | Product description, Start a Hackathon, Join Workspace, Sign in |
| **Dashboard** | List of workspaces, create/join workspace |
| **Workspace Overview** | Time remaining, completion %, risk level, milestones, activity |
| **Idea Generator** | Theme/APIs/skills inputs, generate button, idea cards |
| **Task Board** | Kanban (To Do / In Progress / Done), drag-and-drop cards |
| **Timeline** | Milestones on timeline, tasks mapped to time, current + deadline markers |
| **Submission Generator** | Generate README/Devpost/Pitch/Slides buttons, editable output |
| **Files & Assets** | Upload, view, tag assets |
| **Team** | Members, skills, assignments, workload distribution |
| **Notifications** | Alerts, reminders, risk warnings |

---

## MVP Scope

1. Authentication (OAuth + JWT)
2. Workspace creation
3. AI Idea Generator
4. AI Task Generator
5. Kanban Board
6. Timeline View
7. Submission Text Generator
8. Notifications
9. File Upload
10. Realtime Task Updates

---

## Realtime Events (WebSocket)

- task:created, task:updated, task:completed
- user:joined, user:presence
- milestone:updated
- notification:new
- file:uploaded

---

## Risk Prediction (Future)

```
completion_rate = tasks_completed / time_elapsed
predicted_total = completion_rate * total_time
```

Inputs: tasks completed/remaining, time remaining, team size, avg task completion time
Outputs: probability of finishing, recommended scope cuts

---

## Future Features

- GitHub integration
- Devpost API integration
- AI code scaffolding
- AI architecture diagram generator
- AI judge feedback simulator
- Hackathon leaderboard
- Public project showcase
- Team matching
