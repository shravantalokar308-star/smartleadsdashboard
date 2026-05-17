# Smart Leads Dashboard

A full-stack lead management dashboard with authentication, lead tracking, and filtering capabilities.

## Features

- **User Authentication**: Secure JWT-based login and registration
- **Lead Management**: Create, read, update, and delete leads
- **Advanced Filtering**: Filter leads by status, source, and date range
- **Pagination**: Efficient pagination for large datasets
- **Responsive UI**: Modern React frontend with Tailwind CSS
- **Redux State Management**: Predictable state management with Redux Toolkit
- **TypeScript**: Full type safety across both frontend and backend

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Zod Validation
- Docker

### Frontend
- React 18
- Vite
- TypeScript
- Redux Toolkit
- Tailwind CSS
- React Router DOM

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- Docker (optional, for containerized setup)

## Project Structure

```
smartleadsdashboard/
├── backend/           # Express + TypeScript API
├── frontend/          # React + Vite frontend
├── docker-compose.yml # Docker setup for local dev
└── README.md
```

## Local Setup

### Option 1: Manual Setup

**Backend:**
```bash
cd backend
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Update VITE_API_URL if needed
npm install
npm run dev
```

Access the app at `http://localhost:5173`

### Option 2: Docker Setup

```bash
docker-compose up --build
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- MongoDB: localhost:27017

## Environment Variables

### Backend (.env)
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/smart_leads
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Leads
- `GET /api/leads` - Get all leads (with pagination & filters)
- `POST /api/leads` - Create new lead (protected)
- `PUT /api/leads/:id` - Update lead (protected)
- `DELETE /api/leads/:id` - Delete lead (protected)

## Deployment

### Frontend - Vercel
1. Push code to GitHub
2. Import repository on Vercel
3. Select `frontend` folder as root
4. Set Framework Preset to `Vite`
5. Add environment variable: `VITE_API_URL=<your-backend-url>`

### Backend - Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Select `backend` folder as root
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `npm start`
6. Add environment variables:
   - `MONGO_URI` - MongoDB connection string
   - `JWT_SECRET` - Secure random string
   - `PORT` - 10000 (Render default)

## License

MIT