<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/6832fb14-66d2-4cb8-b324-6fdfd42ebf6f" />
 Store Rating Platform

A full-stack, role-based web application for rating stores.  
Built using **React.js (Frontend), Node.js + Express.js (Backend), and PostgreSQL (Database).**

---

## 🚀 Tech Stack
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  

---

## 🔑 Features

### 👨‍💼 System Administrator
- Add new stores, normal users, and admin users  
- Dashboard showing total users, stores, and ratings  
- View and filter users and stores  
- View user details (if store owner → include rating)  
- Logout  

### 👤 Normal User
- Signup & Login  
- View and search stores  
- Submit and modify ratings (1–5)  
- Update password  
- Logout  

### 🏪 Store Owner
- Login  
- Dashboard displaying store ratings and rated users  
- Update password  
- Logout  

---

## 📸 Live Screenshots

<img width="1919" height="705" alt="Screenshot 2025-11-30 155819" src="https://github.com/user-attachments/assets/d08cecb0-563d-464d-9510-829bcd5610fc" />
<img width="1903" height="450" alt="Screenshot 2025-11-30 155831" src="https://github.com/user-attachments/assets/4f419486-5e2d-47f1-b66e-1a970ab95f07" />
<img width="1897" height="869" alt="Screenshot 2025-11-30 155940" src="https://github.com/user-attachments/assets/a417f84a-a9ce-41f2-b7cd-3731ea4690a8" />
<img width="1900" height="867" alt="Screenshot 2025-11-30 155953" src="https://github.com/user-attachments/assets/dd628634-5035-4d5f-95bf-27c8ef587451" />
<img width="1904" height="871" alt="Screenshot 2025-11-30 160053" src="https://github.com/user-attachments/assets/13f0a28b-d7ea-4599-b35a-b715d9edcd94" />

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/store-rating-app.git
cd store-rating-app

2️⃣ Backend Setup
cd backend
npm install


Create .env file:
DATABASE_URL=postgresql://username:password@host:port/dbname?sslmode=require
PORT=5000
JWT_SECRET=your_secret_key


Start backend:

npm start

| Role        | Email                                                   | Password |
| ----------- | ------------------------------------------------------- | -------- |
| Admin       | [admin@example.com]                                     | Test@123 |
| Normal User | [normaluser@example.com]                                | Test@123 |
| Store Owner | [owner@example.com]                                     | Test@123 |

👨‍💻 Author

Yadneshwar Thorat

