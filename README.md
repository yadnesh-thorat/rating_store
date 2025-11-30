#Store Rating Platform 

A full-stack role-based application to rate stores.
Built with React.js (Frontend), Node.js + Express.js (Backend), PostgreSQL (Database).

🚀 Tech Stack
Frontend: React.js
Backend: Node.js + Express.js
Database: PostgeSql

🔑 Features
👨‍💼 System Administrator

✔ Add new stores, normal users, and admin users
✔ Dashboard (total users, stores, ratings)
✔ View/filter users and stores
✔ View user details (if store owner → include rating)
✔ Logout

👤 Normal User

✔ Signup & login
✔ View and search stores
✔ Submit/modify ratings (1–5)
✔ Update password
✔ Logout

🏪 Store Owner

✔ Login
✔ Dashboard showing store ratings & rated users
✔ Update password
✔ Logout

Live Scrrenshot:

<img width="1919" height="705" alt="Screenshot 2025-11-30 155819" src="https://github.com/user-attachments/assets/a9dba7fb-b2c2-4259-99a2-2f534e8705bc" />

<img width="1903" height="450" alt="Screenshot 2025-11-30 155831" src="https://github.com/user-attachments/assets/8cf00259-4950-481e-8cdf-459d74294bbf" />

<img width="1897" height="869" alt="Screenshot 2025-11-30 155940" src="https://github.com/user-attachments/assets/4ac49c68-3ae3-48c2-b80c-5bfb0e986a9a" />

<img width="1900" height="867" alt="Screenshot 2025-11-30 155953" src="https://github.com/user-attachments/assets/8276d3cd-49da-4473-b902-c314f38ea97c" />

After user Login

<img width="1904" height="871" alt="Screenshot 2025-11-30 160053" src="https://github.com/user-attachments/assets/47773c69-6b2c-4e29-b236-0f7cccdffaad" />

⚙️ Installation & Setup
1️⃣ Clone repository
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

🔐 Test Users
Role	          Email	                         Password
Admin	        admin@example.com        	       Test@123
Normal User	  normaluser@example.com           Test@123
Store Owner	  owner@example.com                Test@123

#Author
Yadneshwar Thorat

