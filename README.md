# SecureVault 🔐

A secure password manager built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Tailwind CSS**.

SecureVault allows users to create an account, log in securely, and store website credentials inside an encrypted vault.

---

## Screenshots

| Home | Register | Dashboard |
|------|----------|-----------|
| Landing page with CTA | Password strength validation | Vault with search & details |

---

## Features

- 🔐 **User Registration & Login** with JWT Authentication
- 🔑 **Password Hashing** with bcrypt
- 🛡️ **Encrypted Vault Storage** using AES-256-GCM
- ⚡ **Password Generator** with customizable options
- 🔒 **Protected Routes** with auth middleware
- 📱 **Fully Responsive UI** with Tailwind CSS
- 🔍 **Vault Search** by title or domain
- 📋 **Copy to Clipboard** for usernames and passwords
- ➕ **Add & Delete Credentials**
- ✅ **Password Strength Validation** (min 12 chars, uppercase, lowercase, number, symbol)
- 🛡️ **Security Headers** with Helmet
- 🚦 **Rate Limiting** on API routes

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| React Router 7 | Client-side routing |
| Tailwind CSS 3 | Utility-first styling |
| Axios | HTTP requests |
| Lucide React | Icons |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| crypto (AES-256-GCM) | Vault encryption |
| Helmet | Security headers |
| Express Rate Limit | API protection |

---

## Project Structure

```
securevault/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login/Register logic
│   │   └── vaultController.js     # CRUD vault operations
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Vault.js              # Vault item schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   └── vaultRoutes.js         # /api/vault/*
│   ├── utils/
│   │   ├── cryptoUtils.js         # AES encrypt/decrypt
│   │   └── generateToken.js       # JWT token generator
│   ├── server.js                  # Entry point
│   ├── package.json
│   └── .env                       # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthLayout.jsx          # Login/Register wrapper
│   │   │   ├── PasswordGenerator.jsx   # Password generator tool
│   │   │   └── AddVaultItemModal.jsx   # Add credential modal
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── Login.jsx               # Login form
│   │   │   ├── Register.jsx            # Registration form
│   │   │   └── Dashboard.jsx           # Main vault workspace
│   │   ├── utils/
│   │   │   └── api.js                  # Axios instance
│   │   ├── App.jsx                     # Router setup
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Tailwind imports
│   ├── public/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/LalitPawar2004/secureVault.git
git clone 
cd securevault
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Vault

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/vault` | Get all vault items | Yes |
| POST | `/api/vault` | Create vault item | Yes |
| DELETE | `/api/vault/:id` | Delete vault item | Yes |

---

## Security

- **Passwords** hashed with bcrypt (10 salt rounds)
- **Vault data** encrypted with AES-256-GCM before storage
- **JWT tokens** for authenticated sessions
- **Helmet** sets secure HTTP headers
- **Rate limiting** prevents brute force attacks
- **Input validation** on both client and server
- **Protected routes** on frontend and backend

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| vaultDark | `#0f172a` | Background |
| vaultCard | `#1e293b` | Cards, modals |
| vaultBorder | `#334155` | Borders, dividers |
| Blue | `#2563eb` | Accents, buttons |

---

## License

MIT © 2026

---

## Author

Built with ❤️ using the MERN stack.
