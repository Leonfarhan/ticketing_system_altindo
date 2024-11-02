# Full-Stack Ticketing System

Sistem tiket full-stack yang memungkinkan pengguna untuk mengajukan tiket dukungan dan administrator untuk mengelola serta meresponnya. Dibangun dengan arsitektur modern yang terbagi antara frontend (React TypeScript) dan backend (Node.js Express.js dengan TypeORM).

## Tech Stack

### Frontend
- **Utama**
   - React 18+ dengan TypeScript
   - React Router v6+
   - React Context API
   - Tailwind CSS
- **Library**
   - Lucide React (Ikon)
   - Axios (Klien HTTP)
   - Zod (Validasi Data)
   - Date-fns (Manipulasi Tanggal)

### Backend
- **Utama**
   - Node.js 18+ dengan Express.js
   - TypeORM
   - PostgreSQL
   - TypeScript
- **Keamanan & Utilitas**
   - bcrypt (Enkripsi Password)
   - jsonwebtoken (Autentikasi JWT)
   - Helmet (Header Keamanan)
   - cors (Penanganan CORS)
   - dotenv (Variabel Lingkungan)
   - body-parser (Parsing Request)
   - class-transformer & class-validator (Validasi Data)
   - reflect-metadata (Dependensi TypeORM)

## Struktur Proyek

```
.
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── server/
│       ├── config/
│       │   └── database.ts
│       ├── controllers/
│       │   ├── ticketController.ts
│       │   └── userController.ts
│       ├── middleware/
│       │   └── auth.ts
│       ├── routes/
│       │   ├── ticketRoutes.ts
│       │   └── userRoutes.ts
│       └── index.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── AdminRoute.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   ├── tickets/
│   │   │   ├── TicketList.tsx
│   │   │   ├── TicketItem.tsx
│   │   │   ├── TicketModal.tsx
│   │   │   └── TicketResponseModal.tsx
│   │   └── ui/
│   │       └── Toaster.tsx
│   ├── index.css
│   └── vite-env.d.ts 
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Prasyarat
- Node.js v18+ (disarankan versi LTS)
- npm/yarn/pnpm
- PostgreSQL

## Instalasi & Pengaturan
1. **Clone repositori**
   ```bash
   git clone https://github.com/Leonfarhan/ticketing_system_altindo.git
   ```

2. **Pengaturan Environment**
   Buat file `.env` di folder `./backend/`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<password_postgres_anda>
   DB_NAME=ticketing_system
   JWT_SECRET=<secret_jwt_anda>
   PORT=3000
   ```

3. **Instalasi Dependensi**
   ```bash
   # Instalasi dependensi backend
   cd backend
   npm install

   # Instalasi dependensi frontend
   cd ..
   npm install
   ```

## Menjalankan Aplikasi

- **Pengembangan Backend**
  ```bash
  cd backend
  npm run dev  # Mode pengembangan dengan hot reload
  # atau
  npm start    # Build produksi
  ```

- **Pengembangan Frontend**
  ```bash
  npm run dev
  ```

## Endpoint API

Semua rute diawali dengan `/api`

### Autentikasi
- `POST /api/users/register` - Mendaftarkan pengguna baru (memerlukan autentikasi admin)
- `POST /api/users/login` - Login pengguna (mengembalikan JWT)

### Tiket
- `GET /api/tickets` - Mendapatkan semua tiket (memerlukan autentikasi)
   - Admin: dapat melihat semua tiket
   - Klien: hanya dapat melihat tiket miliknya
- `GET /api/tickets/:id` - Mendapatkan detail tiket tertentu (memerlukan autentikasi)
- `POST /api/tickets` - Membuat tiket baru (memerlukan autentikasi)
- `PUT /api/tickets/:id` - Memperbarui tiket (memerlukan autentikasi)
- `POST /api/tickets/:id/response` - Menambahkan respons admin (memerlukan autentikasi admin)
- `DELETE /api/tickets/:id` - Menghapus tiket (memerlukan autentikasi admin)

## Catatan Penting
Buat user admin awal secara manual di database PostgreSQL sebelum menjalankan aplikasi.