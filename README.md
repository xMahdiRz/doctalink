
# 🩺 Appointment Booking Platform

A full-stack web platform allowing patients to browse doctors, book one-on-one appointments, and for doctors/admins to manage them — built with Supabase, Tailwind CSS, and shadcn components.

## 🚀 Features

- 🔐 User authentication (patients, doctors, admin)
- 👨‍⚕️ Doctor discovery with profile filtering
- 📅 Appointment booking and management
- 📊 Admin dashboard for managing users and appointments
- 📱 Fully responsive UI with Tailwind CSS and shadcn/ui



## 🧰 Tech Stack

| Layer        | Stack/Tool                        |
|--------------|-----------------------------------|
| Frontend     | React / Next.js, Tailwind CSS, shadcn/ui |
| Authentication | Supabase Auth (via Auth.js) |
| Backend (DB) | Supabase (PostgreSQL + RLS)       |
| Realtime     | Supabase subscriptions            |
| Deployment   | Vercel (Frontend), Supabase (Backend) |


## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- Supabase project + keys

### 1. Clone the Repository

```bash
git clone https://github.com/xmahdirz/doctalink.git
cd doctalink
```

### 2. Install Dependencies

```bash
npm install --force
```

### 3. Setup Environment Variables

Create a `.env.local` file and add:

```bash
# Soon
```

### 4. Run the Dev Server

```bash
npm run dev
```

---

## 📌 To-Do

- [ ] Build authentication system
- [ ] Implement doctor search and filtering
- [ ] Create booking flow
- [ ] Admin dashboard for appointments/users