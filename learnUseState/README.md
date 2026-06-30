# learnUseState

Proyek ini merupakan sarana saya untuk belajar `useState` di React menggunakan Vite. Di dalamnya saya mengimplementasikan tiga proyek sederhana untuk memahami cara kerja state dan event handler di React.

## Apa yang saya pelajari

- Menggunakan hook `useState` untuk menyimpan dan memperbarui data.
- Menangani event klik dan event input.
- Mengelola state berbentuk angka, array, dan objek.
- Menampilkan ulang UI berdasarkan perubahan state.

## implementasi proyek

1. **Counter** (`src/components/Counter/Counter.jsx`)
   - Mempelajari state angka.
   - Mengubah nilai dengan tombol `Increment` dan `Decrement`.

2. **Todo List** (`src/components/TodoList/TodoList.jsx`)
   - Mempelajari state array.
   - Menambahkan tugas baru dan menampilkan daftar tugas.

3. **Register Form** (`src/components/RegisterForm/RegisterForm.jsx`)
   - Mempelajari state untuk form input.
   - Mengelola nilai `name`, `email`, dan `password`.

## Struktur proyek

- `src/main.jsx` - entry point aplikasi.
- `src/components/Counter/Counter.jsx` - komponen counter.
- `src/components/TodoList/TodoList.jsx` - komponen todo list.
- `src/components/RegisterForm/RegisterForm.jsx` - komponen register form.
- `public/` - aset publik.

## Cara menjalankan

1. Buka terminal di folder `learnUseState`.
2. Install dependensi:

```bash
npm install
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka browser ke alamat yang ditampilkan, biasanya `http://localhost:5173`.

