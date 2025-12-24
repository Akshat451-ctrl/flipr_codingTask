# Real Estate Full-Stack Application

A modern full-stack real estate web application built for a coding task. It includes a responsive landing page to showcase projects and client testimonials, along with a fully functional admin panel to manage content, contact inquiries, and newsletter subscriptions.

## Live Demo

**Deployed Application**: [https://flipr-coding-task-p1fl4vd0g-akshat-ghtaiyas-projects.vercel.app/](https://flipr-coding-task-p1fl4vd0g-akshat-ghtaiyas-projects.vercel.app/)

- **Frontend**: Hosted on Vercel
- **Backend API**: Hosted on Render → `https://flipr-codingtask-1.onrender.com`

The frontend and backend are fully connected. All features (dynamic project/client loading, form submissions, admin image uploads) work end-to-end.

## Features

### Landing Page
- Hero section with welcoming banner
- **Our Projects** – Grid displaying projects fetched from backend (image, name, description)
- **Happy Clients** – Testimonial cards with client photo, quote, name, and designation
- **Contact Form** – Submit name, email, mobile, city (data saved in database)
- **Newsletter** – Email subscription (saved in database)

### Admin Panel (`/admin`)
- Add and manage projects (with image upload)
- Add and manage clients (with image upload)
- View all contact form submissions
- View all newsletter subscribers
- **Bonus**: Image resizing during upload for optimized storage

## Tech Stack (MERN)

- **Frontend**: React.js (Vite), React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas free tier)
- **File Handling**: Multer for uploads, Sharp for image resizing (bonus feature)
- **Deployment**:
  - Frontend → Vercel
  - Backend → Render.com

## Project Structure
real-estate-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── ...
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Landing/     (HeroSection, OurProjects, HappyClients, ContactForm, Newsletter)
│   │   │   └── Admin/       (Dashboard, Projects, Clients, Contacts, Subscribers)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md


## API Endpoints (Backend)

Base URL: `https://flipr-codingtask-1.onrender.com`

- `GET /api/projects` → Fetch all projects
- `GET /api/clients` → Fetch all clients
- `POST /api/contacts` → Save contact form
- `POST /api/subscribers` → Save newsletter email
- Admin routes for adding projects/clients (with image upload)

## Local Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Akshat451-ctrl/flipr_codingTask.git
   cd real-estate-app

2 . cd backend
npm install
# Create .env file with MONGO_URI=mongodb+srv://akshatghatiya96_db_user:akshat123@cluster0.9r76ceq.mongodb.net/flipr_task?appName=Cluster0
npm start

 3 .cd ../frontend
npm install
npm run dev


Open http://localhost:5173 (or the Vite port shown).

Deployment Notes

Frontend deployed on Vercel with Root Directory set to Frontend
Environment variable VITE_API_URL set to the Render backend URL
Backend uses MongoDB Atlas free tier for persistent storage

Acknowledgments
Built as part of a Flipr coding task.
Uses free tiers of MongoDB Atlas, Vercel, and Render.
Thank you for visiting the project!
