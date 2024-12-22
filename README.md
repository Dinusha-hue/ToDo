# Todo Application

A full-stack Todo application built with **Next.js**, **Tailwind CSS**, **Redux**, **Express.js**, and **MongoDB**. The app allows users to manage their tasks by adding, editing, marking as complete/incomplete, and deleting todos. 

---

## Features

- Add new tasks with descriptions.
- Mark tasks as completed or incomplete.
- Edit task details.
- Remove tasks from the list.
- Responsive design for mobile and desktop.
- State management using Redux.

---

## Technologies Used

### Frontend
- **Next.js**: For building the React-based user interface with server-side rendering.
- **Tailwind CSS**: For styling the application.
- **Redux**: For state management.

### Backend
- **Express.js**: For creating the REST API.
- **MongoDB**: For database storage.

---

## Installation

### Prerequisites
- Node.js installed on your system.
- MongoDB set up locally or on a cloud provider (e.g., MongoDB Atlas).

### Clone the Repository
```bash
git clone https://github.com/Dinusha-hue/ToDo.git
cd Todo
```
## Setup Backend

Navigate to the backend folder:
```bash
Copy code
cd backend
```
Install dependencies:
```bash
Copy code
npm install
```
Create a .env file with the following:
env
```
Copy code
MONGO_URI=<your_mongo_database_connection_string>
PORT=5000
```
Start the backend server:

```bash
Copy code
npm start
```
## Setup Frontend

Navigate to the frontend folder:
```bash
Copy code
cd ../frontend
```
Install dependencies:

```bash
Copy code
npm install
```
Start the development server:
```bash
Copy code
npm run dev
```
## Folder Structure
arduino
```
Todo/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── store/
│   ├── public/
│   ├── tailwind.config.js
│   └── next.config.mjs
└── README.md
```
