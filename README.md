# Full-Stack System Ticket
## Tech Stack

**Frontend (React):**

- **React dengan TypeScript:** Menyediakan keamanan tipe dan meningkatkan pemeliharaan kode.
- **React Router:** Memungkinkan navigasi sisi-klien antar halaman.
- **React Context API:** Digunakan untuk mengelola state pada tingkat aplikasi, seperti status autentikasi.
- **React Hook Form:** Mempermudah penanganan dan validasi formulir.
- **Tailwind CSS:** Framework CSS berbasis utilitas untuk pengembangan UI yang cepat.
- **Lucide React:** Menyediakan kumpulan ikon yang dapat disesuaikan.
- **Axios:** Untuk melakukan permintaan HTTP ke API backend.

**Backend (Node.js):**
- **Node.js dengan Express.js:** Menjadi dasar dari server API RESTful.
- **TypeORM:** Sebuah Object-Relational Mapper (ORM) untuk berinteraksi dengan database PostgreSQL.
- **PostgreSQL:** Database relasional untuk menyimpan data aplikasi.
- **JWT (JSON Web Tokens):** Mengimplementasikan autentikasi dan otorisasi yang aman.
- **TypeScript:** Menyediakan keamanan tipe dan meningkatkan kualitas kode di sisi server.

## Struktur Proyek

Proyek ini dibagi menjadi direktori frontend dan backend:

```plaintext
.
├── README.md                  # Dokumentasi proyek
├── package.json               # Konfigurasi dependensi utama
├── tsconfig.json              # Konfigurasi TypeScript global
├── vite.config.ts             # Konfigurasi Vite untuk frontend
├── tailwind.config.js         # Konfigurasi Tailwind CSS

├── backend/                   # Direktori untuk kode backend
│   ├── package.json           # Konfigurasi dependensi backend
│   └── server/                # Kode server utama
│       ├── config/            # Konfigurasi server
│       │   └── database.ts    # Koneksi database
│       ├── controllers/       # Logika kontroler API
│       ├── middleware/        # Middleware untuk autentikasi
│       ├── routes/            # Rute API
│       └── index.ts           # Titik masuk server

└── src/                       # Direktori frontend
    ├── App.tsx                # Komponen aplikasi utama
    ├── main.tsx               # Titik masuk aplikasi frontend
    ├── components/            # Komponen frontend utama
    │   ├── auth/              # Komponen autentikasi (Login, dsb.)
    │   ├── dashboard/         # Komponen dasbor
    │   └── tickets/           # Komponen terkait tiket
             # File lainnya (konfigurasi, skrip build, dll.)
```

## Memulai
### Prasyarat

- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- Database PostgreSQL (pastikan sedang berjalan)

### Konfigurasi Lingkungan

1. **Buat file `.env`:** Buat file `.env` di direktori `backend` (jika belum ada).
    - **Backend `.env` (backend/.env):** Berisi kredensial database dan JWT secret.

        ```env
        DB_HOST=localhost
        DB_PORT=5432
        DB_USER=postgres
        DB_PASSWORD=password_postgres_anda
        DB_NAME=ticketing_system
        JWT_SECRET=jwt_secret_anda
        PORT=3000
        ```

        **Penting:** Ganti placeholder dengan nilai Anda. Gunakan kata sandi dan secret yang kuat serta dihasilkan secara acak.

### Instalasi

1. Untuk `frontend` langsung jalankan`npm install`
2. Masuk ke direktori `backend` dan jalankan: `npm install`

### Menjalankan Aplikasi
Untuk frontend langsung 
```bash
concurrently "npm run dev"
```

Untuk backned perlu masuk ke direktori backend kemudian 
```bash
concurrently "npm start"
```

## Endpoint API

**Autentikasi:**

- **POST /api/auth/login:** Login pengguna. Memerlukan email dan password pada body permintaan. Mengembalikan JWT jika autentikasi berhasil.
- **POST /api/auth/register:** Pendaftaran pengguna (kemungkinan memerlukan autentikasi admin).

**Tiket:**

- **GET /api/tickets:** Mendapatkan semua tiket. Memerlukan autentikasi; respons bervariasi berdasarkan peran pengguna.
- **GET /api/tickets/:id:** Mendapatkan tiket tertentu. Memerlukan autentikasi.
- **POST /api/tickets:** Membuat tiket baru. Memerlukan autentikasi.
- **PUT /api/tickets/:id:** Memperbarui tiket. Memerlukan autentikasi.
- **DELETE /api/tickets/:id:** Menghapus tiket. Memerlukan autentikasi dan hak akses admin.
- **POST /api/tickets/:id/response:** Menambahkan respons admin pada tiket. Memerlukan autentikasi dan hak akses admin.

**Catatan:** Pastikan untuk membuat pengguna admin awal secara manual di database PostgreSQL menggunakan query SQL sebelum menggunakan aplikasi. Aplikasi ini kemungkinan memberlakukan kontrol akses berbasis peran.