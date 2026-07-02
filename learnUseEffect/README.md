# Learn useEffect

Proyek ini berfokus pada pemahaman dasar `useEffect` di React menggunakan Vite.

## Apa yang ada di proyek ini

- `src/components/EffectExperiment/EffectExperiment.jsx`
  - Eksperimen dengan variasi `useEffect` dan dependency array.
- `src/components/StopWatch/Stopwatch.jsx`
  - Contoh timer dengan `useEffect` dan cleanup `clearInterval`.
- `src/components/DocumentTitleSync/DocumenetTitleSync.jsx`
  - Sinkronisasi judul tab browser (`document.title`) saat state berubah.
- `useEffect-fundamentals.md`
  - Catatan teori dasar `useEffect` dan pola penggunaannya.

## Tujuan proyek

Belajar `useEffect` untuk:

- Menjalankan side effect di React secara aman
- Mengontrol kapan effect dipanggil dengan dependency array
- Menangani cleanup untuk event listener, timer, atau update DOM langsung
- Mencegah infinite loop dan memory leak

## Cara menjalankan

1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka `http://localhost:5173` di browser.

## Contoh useEffect di proyek

### 1. `EffectExperiment.jsx`

- `useEffect(() => {...})` — effect dijalankan setiap render.
- `useEffect(() => {...}, [])` — effect dijalankan sekali saat komponen mount.
- `useEffect(() => {...}, [count])` — effect dijalankan ketika `count` berubah.
- `useEffect(() => {...}, [text])` — effect dijalankan ketika `text` berubah.

### 2. `Stopwatch.jsx`

- Menggunakan `setInterval` di dalam `useEffect`.
- Cleanup dengan `clearInterval(timer)` di return function.
- Hanya membuat interval saat `isRunning` true.

### 3. `DocumenetTitleSync.jsx`

- Memperbarui `document.title` setiap kali `count` berubah.
- Mengembalikan title ke nilai awal saat komponen unmount.

## Praktik terbaik `useEffect`

- Masukkan semua variabel yang digunakan dalam effect ke dependency array.
- Gunakan cleanup function untuk menghentikan subscription, timer, atau listener.
- Jangan panggil `setState` secara langsung di body komponen jika itu adalah side effect.
- Periksa warning ESLint `react-hooks/exhaustive-deps` untuk memastikan dependency lengkap.

## Struktur komponen yang penting

- `src/App.jsx`
  - Toggle komponen `DocumentTitleSync` untuk melihat unmount/mount.
- `src/main.jsx`
  - Entry point aplikasi React.

## Referensi materi

- `useEffect-fundamentals.md` — bahan belajar tambahan tentang `useEffect`.

---

## Catatan singkat

Proyek ini bukan template produksi. Ini khusus untuk eksplorasi `useEffect` dan pemahaman perilaku side effect di React.
