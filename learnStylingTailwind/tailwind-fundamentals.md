# Fundamental Tailwind CSS

## Apa itu Tailwind CSS?

Tailwind CSS adalah **utility-first CSS framework** — artinya kamu styling langsung di HTML/JSX menggunakan class-class kecil yang sudah disediakan, tanpa perlu nulis CSS manual.

```jsx
// ❌ CSS biasa — perlu buat file CSS terpisah
<button className="btn-primary">Klik</button>

// .btn-primary {
//   background-color: blue;
//   color: white;
//   padding: 8px 16px;
//   border-radius: 4px;
// }

// ✅ Tailwind — langsung di JSX, tidak perlu file CSS
<button className="bg-blue-500 text-white px-4 py-2 rounded">Klik</button>
```

---

## Cara Install di Project Vite + React

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Lalu tambahkan di `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Lalu di `index.css` (hapus semua isi sebelumnya):
```css
@import "tailwindcss";
```

Selesai — tidak perlu config tambahan.

---

## Cara Berpikir di Tailwind

Setiap class Tailwind itu satu property CSS. Kamu "merakit" tampilan dari class-class kecil:

```
bg-blue-500   →  background-color: #3b82f6
text-white    →  color: white
px-4          →  padding-left: 1rem; padding-right: 1rem
py-2          →  padding-top: 0.5rem; padding-bottom: 0.5rem
rounded       →  border-radius: 0.25rem
font-bold     →  font-weight: 700
text-lg       →  font-size: 1.125rem
```

---

## Kategori Class yang Paling Sering Dipakai

### Spacing — Padding dan Margin

```
p-4      → padding semua sisi (1rem)
px-4     → padding kiri & kanan
py-2     → padding atas & bawah
pt-4     → padding atas saja
m-4      → margin semua sisi
mx-auto  → margin kiri & kanan auto (untuk center)
mt-4     → margin atas
gap-4    → jarak antar elemen (untuk flex/grid)
```

Angka di Tailwind: `1 = 0.25rem`, `2 = 0.5rem`, `4 = 1rem`, `8 = 2rem`

### Warna

```
bg-blue-500     → background biru
bg-gray-100     → background abu-abu terang
text-white      → teks putih
text-gray-700   → teks abu-abu gelap
border-gray-300 → border abu-abu
```

Skala warna: `100` (paling terang) → `900` (paling gelap)

### Typography

```
text-sm      → font kecil
text-base    → font normal
text-lg      → font agak besar
text-xl      → font besar
text-2xl     → lebih besar lagi
font-normal  → font weight normal
font-medium  → agak tebal
font-semibold → semi tebal
font-bold    → tebal
```

### Border dan Shadow

```
border          → border 1px solid
border-2        → border 2px
rounded         → border-radius kecil
rounded-lg      → border-radius sedang
rounded-full    → bulat sempurna (untuk avatar)
shadow          → shadow kecil
shadow-md       → shadow sedang
shadow-lg       → shadow besar
```

### Display dan Flexbox

```
flex            → display: flex
flex-col        → flex-direction: column
items-center    → align-items: center
justify-center  → justify-content: center
justify-between → justify-content: space-between
flex-1          → flex: 1 (isi sisa ruang)
hidden          → display: none
block           → display: block
```

### Width dan Height

```
w-full    → width: 100%
w-1/2     → width: 50%
w-64      → width: 16rem
max-w-md  → max-width: 28rem
max-w-lg  → max-width: 32rem
h-full    → height: 100%
h-screen  → height: 100vh
min-h-screen → min-height: 100vh
```

---

## Responsive Design — Ini yang Bikin Tailwind Powerful

Tailwind pakai prefix breakpoint untuk responsive:

```
sm:   → 640px ke atas
md:   → 768px ke atas
lg:   → 1024px ke atas
xl:   → 1280px ke atas
```

Cara pakainya — **mobile first**: tulis style untuk mobile dulu, lalu override untuk layar lebih besar:

```jsx
<div className="flex flex-col md:flex-row">
  {/* mobile: column, tablet ke atas: row */}
</div>

<p className="text-sm md:text-base lg:text-lg">
  {/* ukuran font naik seiring layar membesar */}
</p>

<div className="w-full md:w-1/2 lg:w-1/3">
  {/* lebar berubah sesuai breakpoint */}
</div>
```

---

## State Variants — Hover, Focus, Active

```jsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
  Klik
</button>

<input className="border border-gray-300 focus:border-blue-500 focus:outline-none" />

<li className="hover:bg-gray-100 cursor-pointer">Item</li>
```

---

## Dark Mode

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Konten yang support dark mode
</div>
```

---

## Pola Komponen yang Sering Dipakai

### Card

```jsx
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Judul</h2>
  <p className="text-gray-600 text-sm">Deskripsi konten di sini.</p>
</div>
```

### Button

```jsx
{/* Primary */}
<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  Simpan
</button>

{/* Secondary */}
<button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
  Batal
</button>

{/* Danger */}
<button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
  Hapus
</button>
```

### Input

```jsx
<div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-700">Nama</label>
  <input
    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    placeholder="Masukkan nama..."
  />
</div>
```

### Badge / Tag

```jsx
<span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
  JavaScript
</span>
```

### Loading Skeleton

```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

---

## Tips Penting

**1. Jangan takut class panjang — itu normal di Tailwind**
```jsx
{/* Ini normal dan acceptable */}
<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors duration-200">
```

**2. Kalau class terlalu panjang, extract ke komponen — bukan ke CSS file**
```jsx
// Buat komponen Button terpisah, bukan class CSS terpisah
function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}
```

**3. Install ekstensi Tailwind CSS IntelliSense di VS Code** — ini wajib, autocomplete class-nya sangat membantu dan kamu bisa hover untuk lihat CSS yang dihasilkan.

---
---

# Tugas

> **Aturan:** Jangan copy-paste dari rangkuman. Buka dokumentasi Tailwind (tailwindcss.com/docs) kalau butuh referensi class yang belum ada di rangkuman ini — itu cara kerja developer nyata.

---

## Tugas 1 — Styling Komponen yang Sudah Ada

**Deskripsi:** Ambil `UserList.jsx` yang sudah kamu buat sebelumnya dan beri styling dengan Tailwind sampai layak ditunjukkan.

**Target tampilan:**
- Background halaman abu-abu terang (`bg-gray-50`)
- Setiap user ditampilkan sebagai **card** — bukan list item polos
- Card punya shadow, border tipis, dan padding yang nyaman
- Nama user lebih besar dan tebal, email dan kota lebih kecil dan abu-abu
- Tombol Refresh punya style yang proper (bukan button default browser)
- Teks loading dan error punya style yang berbeda (loading abu-abu, error merah)
- Responsive: satu kolom di mobile, dua kolom di tablet, tiga kolom di desktop (gunakan CSS Grid)

**Langkah pengerjaan:**
1. Install Tailwind di project kamu sesuai instruksi di atas
2. Buka `UserList.jsx`, hapus semua `className="container"` yang lama
3. Bungkus seluruh konten dengan `<div className="min-h-screen bg-gray-50 p-8">`
4. Ubah `<ul>` jadi `<div>` dengan class grid responsive
5. Ubah setiap `<li>` jadi card dengan class yang sesuai
6. Style teks nama, email, dan kota secara berbeda (hierarchy yang jelas)
7. Style tombol Refresh
8. Style kondisi loading dan error

---

## Tugas 2 — Buat Profile Card dari Nol

**Deskripsi:** Buat komponen `ProfileCard.jsx` yang menampilkan profile card seorang developer — tanpa fetch, fokus murni pada Tailwind.

**Yang harus ada:**
- Avatar (gunakan `https://github.com/github.png` sebagai placeholder)
- Nama dan username (contoh: "Ahmad Haris" dan "@ahmdhrs")
- Bio singkat (satu kalimat)
- Tiga stat: Repositories, Followers, Following — dalam satu baris
- List bahasa pemrograman sebagai badge/tag berwarna
- Tombol "Follow" dan "Message" berdampingan
- Hover effect pada tombol

**Langkah pengerjaan:**
1. Buat file `ProfileCard.jsx`
2. Mulai dari struktur HTML-nya dulu tanpa class, pastikan kontennya benar
3. Bungkus semuanya dengan card container (white, rounded, shadow)
4. Styling avatar: gunakan `rounded-full` dan ukuran yang proporsional (`w-20 h-20`)
5. Styling stats: gunakan flexbox dengan `justify-around` atau `justify-between`
6. Styling badges: warna berbeda untuk setiap bahasa (biru untuk JS, merah untuk HTML, dll)
7. Styling tombol: Follow solid (primary), Message outline (secondary)
8. Pastikan card terlihat bagus di berbagai lebar — coba resize browser

**Challenge tambahan (opsional):** Buat tiga ProfileCard sekaligus dalam satu halaman dengan layout grid — satu kolom di mobile, tiga kolom di desktop.

---

## Cara Review Mandiri Setelah Selesai

Sebelum kirim ke saya, lakukan ini:

1. Buka di mobile view (DevTools → toggle device toolbar) — apakah masih enak dibaca?
2. Hover semua tombol — apakah ada perubahan visual yang memberikan feedback?
3. Tunjukkan ke orang yang tidak tahu konteksnya — apakah mereka paham apa yang ditampilkan?
4. Bandingkan dengan tampilan sebelum Tailwind — apakah perbedaannya signifikan?

Kalau jawabannya semua "ya", berarti sudah layak. Kalau ada yang "tidak", perbaiki dulu sebelum kirim.
