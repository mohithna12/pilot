# Pilot

> Your AI copilot for hackathons.

Pilot is an AI-powered project manager built for hackathons. It helps teams move from **idea → plan → build → demo → submission** within a 24–48 hour time constraint — combining task management, AI planning, progress prediction, and submission generation into a single platform.

## Features

- **Hackathon Workspace** — Create a workspace with hackathon details, team members, skills, and timelines.
- **AI Idea Generator** — Generate project ideas with feature lists, recommended tech stacks, estimated difficulty, and feasibility scores.
- **AI Project Planner** — Convert a selected idea into milestones, tasks, timelines, task assignments, and dependencies.
- **Kanban Task Board** — Drag-and-drop task management with priorities, deadlines, owners, and tags.
- **Timeline View** — Visualize milestones and tasks against the hackathon clock.
- **Progress Dashboard** — Track completion percentage, risk level, and get AI-suggested scope cuts.
- **Submission Generator** — AI-generated README, Devpost description, pitch script, slide outline, and more.
- **Realtime Collaboration** — Live task updates and team presence via WebSockets.
- **Notifications** — Deadline reminders, overdue alerts, demo prep nudges, and submission countdowns.
- **File & Media Upload** — Upload screenshots, logos, slides, and demo videos.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Next.js, TypeScript, Tailwind CSS, Zustand |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (with Row Level Security) |
| Cache & Jobs | Redis |
| AI | OpenAI API |
| Storage | AWS S3 / Supabase Storage |
| Auth | OAuth (Google, GitHub), JWT |
| Realtime | WebSockets |
| Notifications | Firebase Cloud Messaging, SendGrid |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis
- OpenAI API key
- OAuth credentials (Google and/or GitHub)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pilot.git
cd pilot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database, Redis, OpenAI, and OAuth credentials

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `OPENAI_API_KEY` | OpenAI API key |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |
| `S3_BUCKET` | AWS S3 bucket name |
| `S3_REGION` | AWS S3 region |

## Project Structure

```
pilot/
├── frontend/          # Next.js + React frontend
│   ├── app/           # App router pages
│   ├── components/    # Reusable UI components
│   ├── stores/        # Zustand state stores
│   └── lib/           # Utilities and API client
├── backend/           # Express API server
│   ├── routes/        # API route handlers
│   ├── services/      # Business logic and AI service layer
│   ├── middleware/     # Auth, validation, error handling
│   ├── db/            # Migrations and query layer
│   └── websocket/     # Realtime event server
└── docs/              # Design docs and specs
```

## User Personas

| Persona | What Pilot Helps With |
|---------|-----------------------|
| **Beginner Hacker** | Structure, idea help, task breakdown, guided workflow |
| **Experienced Hacker** | Timeline planning, team coordination, submission generation |
| **Solo Hacker** | Time management, feature prioritization, demo prep reminders |

## License

MIT
