# ☁️ Akatsuki Report - Frontend Intelligence Portal

[![React](https://img.shields.io/badge/React-19-blue.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg?style=flat&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-red.svg?style=flat)](#)

Welcome to the **Akatsuki Report Portal**, a highly immersive, interactive, and premium React-based Single Page Application (SPA). This frontend serves as the secure headquarters interface for tracking intelligence, scraping Google News, rewriting headlines using Groq AI, and logging agent briefings (reviews/ratings) for the legendary Akatsuki organization.

---

## 📸 Demo Video

Click the pain image below to watch the video demonstration of the Akatsuki Report portal in action:

[![Akatsuki Report Demo](src/assets/images/akatsuki_members_sd/pain.png)](https://www.youtube.com/watch?v=nn4lyYixHaQ)

---

## ✨ Key Features

### 🌌 Immersive Entry & Audio Experience
- **Interactive Splash Screen:** A dark, radial-gradient portal displaying a pulsing crimson Akatsuki cloud logo. Entering initializes the background music stream (`bgm.mp3`) and proceeds to the next stage.
- **Cinematic Entry Video:** Plays an intro sequence (`heroVideoWithAudio.mp4`) with synchronized sound effects and a smooth, floating "Skip Intro" option.
- **Dynamic BGM Controller:** Changes the background audio source smoothly across routes or state switches without audio pops.

### 📜 Scroll-Driven Mission Overview
- **Interactive Storytelling Sections:** Seven sections (Home, About, Features, Workflow, Members, Tech Stack, Contact) utilizing high-fidelity layout cards that fade, scale, and alternate alignment.
- **Micro-Animations:** Red gradient borders that glow on hover, rotating logo watermarks, and smooth scrolling indicators.
- **Operative List Quick-Preview:** Inline cards listing the key specializations and dossiers of the members.

### 🔐 Secure Agent Authentication
- **Glassmorphic Authentication:** Login and Signup sheets with dark glassmorphism (radial blur, translucent overlays, and hot-toast feedback alerts).
- **Interactive Input Fields:** Custom input halos that change to crimson glow on focus.
- **Backend Verification:** JWT-token persistence inside `localStorage` ensuring secured routing.

### 🏛️ Akatsuki HQ Dashboard
- **Skeleton Screen Loaders:** Smooth custom SVG-like skeleton elements matching the list shapes to provide an elite, modern user experience during API latency.
- **Animated Overlapping Avatars:** Hovering over an operative's name slides their SD (Super-Deformed) avatar upwards and scales the card into focus.
- **Active Counter Widget:** Highlights the total number of signed-in intelligence officers on the network in real-time.

### 📂 Operative Intelligence Dossiers
- **Side Nav Operatives Sidebar:** Quick-switching sidebar allowing agents to browse other dossiers without backing out to the main menu.
- **Google News Scraper Pipeline:** Fetches scanned reports from Google News via the backend, displaying cleaned, relevant articles.
- **Interactive Star Ratings:** Log 1-to-5 star quality grades on scanned headlines.
- **Full CRUD Briefings:** Write, read, update, or delete intelligence reports on specific news articles.

### ⚠️ Catch-All 404 Page (Pain Edition)
- **Almighty Push Redirection:** Seamlessly intercepts all unmatched route patterns and serves a highly styled 404 page.
- **Themed Animations:** Displays a floating visual of Pain (loaded from `pain.png`) embedded inside an active glowing red aura.
- **Interactive Safeguard Route:** Provides a call-to-action button allowing agents to securely redirect back to the home base.

---

## 🛠️ Technology Stack

| Domain | Technology / Library | Usage |
| :--- | :--- | :--- |
| **Core Framework** | React 19 (Functional Components + Hooks) | Main UI library |
| **Build System** | Vite 8 | Ultra-fast bundling, Hot Module Replacement (HMR) |
| **Styles** | Tailwind CSS v4 & Vanilla CSS | Cinematic theme, glassmorphism, responsive utilities |
| **Router** | React Router DOM v7 | Single-page application routing |
| **Notification** | React Hot Toast | Responsive operational notifications & errors |
| **Backend Integration** | Spring Boot (Java 21) | Rest APIs, JWT extraction, MySQL mapping, Jsoup Parser |
| **AI Integration** | Groq AI (Llama 3 API) | Natural Language processing & headline rewrites |

---

## 📁 File Structure

```text
AkatsukiReportFromtend/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   ├── fonts/          # Custom typography (New Rocker)
│   │   ├── images/
│   │   │   ├── akatsuki_members/     # Full-body character images
│   │   │   ├── akatsuki_members_sd/  # SD avatar images for dashboard
│   │   │   └── others/               # Logo branding assets
│   │   ├── music/          # looping portal background track (bgm.mp3)
│   │   └── videos/         # Fullscreen entry intro (heroVideoWithAudio.mp4)
│   ├── auth/
│   │   ├── Login.jsx       # Login view with glassmorphism styles
│   │   └── Signup.jsx      # Account creation, validation logic
│   ├── dashboard/
│   │   ├── Dashboard.jsx   # HQ dashboard grid with SD avatars & skeletons
│   │   └── MemberDetail.jsx# Member news feed, rating stars, and CRUD briefings
│   ├── data/               # Static datasets, logos, and audio configs
│   ├── App.css             # Main styling overrides
│   ├── App.jsx             # React entry point, global BGM stream, routes config
│   ├── index.css           # Global custom classes, Tailwind imports, keyframes
│   ├── NotFound.jsx        # Catch-all 404 page featuring Pain
│   └── main.jsx            # DOM mounting element
├── .env                    # Environment variables (Backend target URL)
├── vite.config.js          # Vite configurations
└── package.json            # Main package scripts and version requirements
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (version 18 or above recommended)
- npm or yarn
- Active [Akatsuki Backend Service](https://github.com/PAMARTHILVSIVANAGESWARARAO/AkatsukiReportBaseBackend) running locally or remotely.

### 1. Clone the repository
```bash
git clone https://github.com/PAMARTHILVSIVANAGESWARARAO/AkatsukiReportBaseFrontend.git
cd AkatsukiReportBaseFrontend
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (or update the existing one):
```env
BACKEND_URL=localhost:8000/
```
> [!NOTE]
> The app detects whether `BACKEND_URL` is prefixed with `http` automatically. Adjust this URL to point to your active Spring Boot backend port.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to experience the portal.

### 5. Build for Production
To generate the static production build files inside the `dist` folder:
```bash
npm run build
```

---

## 🔒 Security & REST Endpoints Connected

This portal communicates securely with the backend API. Key integrated endpoints:
- `POST /api/auth/register` - Creates an operative profile.
- `POST /api/auth/login` - Authenticates and returns a secure JWT bearer token.
- `GET /api/dashboard` - Fetches the list of active Akatsuki operatives.
- `GET /api/dashboard/user-count` - Returns the online agents metric.
- `POST /api/dashboard/news` - Scrapes, rewrites, and fetches news headlines for a specific member.
- `GET /api/dashboard/reviews` - Loads logged intelligence briefings.
- `POST /api/dashboard/reviews` - Saves a new star rating and textual review.
- `PUT /api/dashboard/reviews/{id}` - Updates an existing review.
- `DELETE /api/dashboard/reviews/{id}` - Removes a review from the HQ archive.
