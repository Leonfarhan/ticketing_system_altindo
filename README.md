# Full-Stack Ticket System

Sistem tiket ini adalah aplikasi full-stack yang memungkinkan pengguna untuk mengajukan tiket dukungan dan administrator untuk mengelola serta meresponnya. Aplikasi ini menggunakan arsitektur modern yang terbagi antara frontend (React dengan TypeScript) dan backend (Node.js dengan Express.js dan TypeORM).

## Tech Stack

### Frontend (React dengan TypeScript)

- **React 18+ dengan TypeScript:** Menyediakan pengetikan statis dan meningkatkan pemeliharaan kode.
- **React Router v6+:** Memungkinkan navigasi klien yang mudah dan efisien antara halaman.
- **React Context API:** Digunakan untuk manajemen state aplikasi, seperti status autentikasi pengguna.
- **Tailwind CSS:** Framework CSS berbasis utilitas yang mempercepat pengembangan UI.
- **Lucide React:** Library ikon yang memberikan ikon yang konsisten dan modern.
- **Axios:** Library untuk membuat permintaan HTTP ke server backend.
- **Zod:** Library untuk validasi data yang kuat dan tertipe.
- **Date-fns:** Library untuk pemformatan dan manipulasi tanggal.

### Backend (Node.js dengan Express.js dan TypeORM)

- **Node.js 16+ dengan Express.js:** Kerangka kerja web Node.js untuk membangun API RESTful.
- **TypeORM:** Object-Relational Mapper (ORM) untuk berinteraksi dengan database PostgreSQL.
- **PostgreSQL:** Sistem manajemen basis data relasional yang handal dan skalabel.
- **bcrypt.js:** Library untuk hashing kata sandi secara aman.
- **jsonwebtoken:** Library untuk pembuatan dan verifikasi JSON Web Tokens (JWT) untuk autentikasi.
- **TypeScript:** Menyediakan pengetikan statis dan meningkatkan kualitas kode di sisi server.
- **cors:** Middleware untuk menangani request cross-origin.
- **dotenv:** Library untuk memuat variabel lingkungan dari file `.env`.

## Struktur Proyek

Proyek ini diorganisir menjadi dua bagian utama: frontend(src) dan backend(backend).

```
.
├── README.md              # Dokumentasi proyek
├── package.json           # Dependensi frontend
├── package-lock.json      # Lockfile frontend
├── tsconfig.json          # Konfigurasi TypeScript utama
├── vite.config.ts         # Konfigurasi Vite untuk frontend
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── backend/               # Direktori untuk kode backend
│   ├── package.json       # Dependensi backend
│   ├── package-lock.json   # Lockfile backend
│   ├── tsconfig.json      # Konfigurasi TypeScript backend
│   └── server/            # Kode server utama
│       ├── config/        # Konfigurasi server
│       │   └── database.ts # Koneksi database
│       ├── controllers/   # Logika kontroler API
│       ├── middleware/     # Middleware untuk autentikasi
│       ├── routes/        # Rute API
│       └── index.ts       # Titik masuk server
└── src/                   # Direktori frontend
    ├── App.tsx           # Komponen aplikasi utama
    ├── main.tsx          # Titik masuk aplikasi frontend
    ├── components/        # Komponen frontend utama
    │   ├── auth/         # Komponen autentikasi (Login, dsb.)
    │   ├── dashboard/     # Komponen dasbor
    │   └── tickets/      # Komponen terkait tiket
    └── ...               # File-file lainnya
```

## Persiapan

Pastikan Anda telah menginstal:

- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- PostgreSQL (dan pastikan server berjalan)

## Instalasi dan Pengaturan

1. **Clone Repositori:** Clone repositori proyek ke komputer lokal Anda.
2. **Buat file `.env`:** Buat file `.env` di direktori `./backend/` dengan kredensial database dan JWT secret:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password_postgres_anda
   DB_NAME=ticketing_system
   JWT_SECRET=jwt_secret_anda 
   PORT=3000
   ```

3. **Instal Dependensi:**
   - Masuk ke direktori backend: `npm install`
   - Masuk ke direktori root: `npm install`

## Menjalankan Aplikasi
- **Backend:** Jalankan server backend dari direktori `./backend/`: `npm start`
- **Frontend:** Jalankan development server frontend dari direktori root: `npm run dev`

## Endpoint API

### Autentikasi

- **POST** `/api/users/register`: Mendaftar pengguna baru (memerlukan autentikasi admin).
- **POST** `/api/users/login`: Login pengguna. Membutuhkan email dan password dalam body request. Mengembalikan JWT jika berhasil.

### Tiket

- **GET** `/api/tickets`: Mendapatkan semua tiket (autentikasi diperlukan). Respons bervariasi berdasarkan peran pengguna (admin melihat semua, client hanya melihat tiketnya sendiri).
- **GET** `/api/tickets/:id`: Mendapatkan tiket spesifik (autentikasi diperlukan).
- **POST** `/api/tickets`: Membuat tiket baru (autentikasi diperlukan).
- **PUT** `/api/tickets/:id`: Memperbarui tiket (autentikasi diperlukan, admin dapat memperbarui semua, client hanya tiketnya sendiri).
- **POST** `/api/tickets/:id/response`: Menambahkan respons admin ke tiket (autentikasi dan peran admin diperlukan).
- **DELETE** `/api/tickets/:id`: Menghapus tiket (autentikasi dan peran admin diperlukan).

**Catatan:** Pastikan untuk membuat pengguna admin awal secara manual di database PostgreSQL sebelum menjalankan aplikasi.
