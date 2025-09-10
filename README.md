# Frontline Listing Company

A full-stack web application for managing company listings, built with React.js for the frontend and Node.js/Express.js for the backend. This project allows users to view, add, edit, and search company details efficiently.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Libraries & Tools](#libraries--tools)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)

---

## Project Overview

This application is designed to manage company listings with features like:

- Add, edit, and view company details
- Pagination, search, and sorting of companies
- Responsive UI with modern styling
- RESTful API for backend management

---

## Features

- **CRUD Operations**: Create, Read, Update, Delete company records
- **Search & Filter**: Filter companies by name, type, city, and industry
- **Sorting & Pagination**: Sort by multiple columns and navigate through pages
- **User-friendly Interface**: Clean, responsive UI using Tailwind CSS
- **Data Validation**: Backend validation using Express.js and Mongoose

---

## Tech Stack

**Frontend:**  
- React.js  
- React Router DOM  
- Tailwind CSS  
- Axios  
- SweetAlert2  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Cors  
- Dotenv  

---

## Libraries & Tools

- **Frontend Libraries**:  
  - `react` — JavaScript library for building UI  
  - `react-router-dom` — Routing for React  
  - `axios` — HTTP client for API calls  
  - `sweetalert2` — Popup alerts  
  - `tailwindcss` — Utility-first CSS framework  

- **Backend Libraries**:  
  - `express` — Web framework for Node.js  
  - `mongoose` — MongoDB object modeling  
  - `cors` — Enable cross-origin requests  
  - `dotenv` — Manage environment variables  
  - `nodemon` — Automatically restart server during development  

---

## Project Structure
**Backend:**
backend/
├─ controllers/
├─ models/
├─ routes/
├─ config/
├─ server.js
└─ .env

**Frontend:**
frontend/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ api/
│ └─ App.js
├─ public/
└─ package.json


---

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install dependencies:
   ``` bash
   npm install

3. Create a .env file and add your environment variables:
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string

4. Start the server:
   ```bash 
   npm run server

-

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install
   
3. Start the frontend development server:
   ```bash
   npm start

---

## API Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/api/companies`     | Get all companies      |
| GET    | `/api/companies/:id` | Get a company by ID    |
| POST   | `/api/companies`     | Create a new company   |
| PUT    | `/api/companies/:id` | Update a company by ID |
| DELETE | `/api/companies/:id` | Delete a company by ID |

## Frontend Usage

Visit http://localhost:3000 in your browser

Navigate through pages, sort, search, and manage company listings

Responsive design works on desktop and mobile devices
