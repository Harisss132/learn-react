# Fundamental `useEffect` di React

## Apa itu `useEffect`?

`useEffect` adalah Hook untuk menjalankan **side effect** — yaitu hal-hal yang terjadi **di luar** proses render biasa React. Contoh side effect: fetch data dari API, set timer, subscribe ke event, manipulasi DOM langsung, baca/tulis localStorage.

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // kode yang mau dijalankan
}, [dependency]);
```

`useEffect` menerima dua argumen:
1. **Function** — kode yang mau dijalankan (disebut "effect")
2. **Dependency array** — kapan effect ini harus dijalankan ulang

---

## Kenapa Tidak Bisa Asal Taruh Kode di Body Component?

```javascript
function UserProfile() {
  fetch('/api/user').then(res => res.json()).then(data => console.log(data));
  // ❌ ini akan jalan TERUS MENERUS setiap kali komponen render
  
  return <div>Profile</div>;
}
```

Setiap kali state berubah → komponen re-render → kalau fetch ditaruh langsung di body, fetch akan terpanggil **lagi dan lagi** tanpa henti. Inilah kenapa side effect harus dibungkus `useEffect` — supaya bisa dikontrol **kapan** dia jalan.

---

## 3 Variasi Dependency Array — Ini Inti dari `useEffect`

### 1. Tanpa Dependency Array — Jalan Setiap Render

```javascript
useEffect(() => {
  console.log('Ini jalan setiap kali komponen render');
});
```

Jarang dipakai, karena hampir selalu menyebabkan effect terpanggil berlebihan.

### 2. Dependency Array Kosong `[]` — Jalan Sekali Saja

```javascript
useEffect(() => {
  console.log('Ini jalan SEKALI saat komponen pertama kali muncul');
}, []);
```

Dipakai untuk: fetch data awal, setup yang cuma perlu dilakukan sekali (misal ambil data dari API saat halaman pertama dibuka).

### 3. Dependency Array Berisi Value — Jalan Saat Value Berubah

```javascript
useEffect(() => {
  console.log(`userId berubah jadi: ${userId}`);
}, [userId]);
```

Effect ini jalan saat **pertama kali render**, DAN setiap kali `userId` berubah nilainya. Dipakai untuk: fetch ulang data saat ada parameter yang berubah (misal ganti halaman, ganti filter).

---

## Cheat Sheet Dependency Array

| Pola | Kapan Jalan |
|---|---|
| `useEffect(() => {...})` | Setiap kali render (jarang dipakai) |
| `useEffect(() => {...}, [])` | Sekali saja, saat komponen pertama muncul |
| `useEffect(() => {...}, [value])` | Saat pertama muncul + setiap kali `value` berubah |
| `useEffect(() => {...}, [value1, value2])` | Saat pertama muncul + setiap kali `value1` ATAU `value2` berubah |

---

## Cleanup Function — Sering Diabaikan, Tapi Penting

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup function
  };
}, []);
```

Function yang di-`return` di dalam `useEffect` disebut **cleanup function**. Dia dijalankan:
- Sesaat sebelum effect berikutnya jalan (kalau dependency berubah)
- Saat komponen **unmount** (dihapus dari layar)

**Kenapa penting?** Tanpa cleanup, timer/subscription/event listener akan terus jalan di background walau komponennya sudah tidak ada di layar — ini namanya **memory leak**.

Contoh kasus nyata: kalau kamu pasang `setInterval` tanpa `clearInterval` di cleanup, lalu user pindah halaman, timer itu **tetap jalan** walau tidak ada gunanya — ini bug yang sering luput dari junior karena tidak kelihatan errornya secara langsung.

---

## Common Mistakes yang Sering Terjadi

### Mistake 1 — Lupa Dependency Array, Infinite Loop

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1); // ❌ ini akan infinite loop!
}); // tanpa dependency array
```

Tanpa `[]`, effect jalan setiap render → effect ini ubah state → state berubah memicu render baru → effect jalan lagi → ubah state lagi → **infinite loop**.

### Mistake 2 — Dependency Array Tidak Lengkap

```javascript
useEffect(() => {
  console.log(`Halo ${name}, umur ${age}`);
}, [name]); // ❌ age dipakai tapi tidak dimasukkan ke dependency array
```

React (lewat ESLint plugin) biasanya akan warning soal ini. Aturannya: **semua value dari luar effect yang dipakai di dalam effect, harus dimasukkan ke dependency array** — kecuali kamu punya alasan kuat untuk tidak melakukannya.

### Mistake 3 — Fetch Tanpa Cleanup Saat Komponen Unmount

```javascript
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data)); // ❌ kalau komponen sudah unmount, ini bisa warning
}, []);
```

Kalau user pindah halaman sebelum fetch selesai, lalu data datang dan `setData` dipanggil — React akan warning karena mencoba update state pada komponen yang sudah tidak ada. Solusi lebih advance untuk ini akan dibahas saat masuk ke fetch API.

---

## Mental Model yang Harus Diingat

> **`useEffect` itu jembatan antara dunia React (render, state) dan dunia luar (API, timer, browser API, DOM manual).**

Kalau kode yang kamu tulis **bukan** untuk menghitung tampilan (JSX), kemungkinan besar itu side effect dan harus masuk `useEffect`.

---
---

# Tugas

> **Aturan:** Sama seperti kemarin — coba dulu sendiri minimal 15-20 menit sebelum tanya. Eksperimen di console browser untuk lihat urutan log yang muncul, itu cara paling efektif memahami `useEffect`.

---

## Tugas 1 — Eksperimen Dependency Array

**Tujuan:** memahami **kapan persis** `useEffect` terpanggil dengan masing-masing variasi dependency array. Ini tugas observasi, bukan bikin fitur.

**Langkah pengerjaan:**
1. Buat file `EffectExperiment.jsx`
2. Buat 2 state: `count` (number, awal 0) dan `text` (string, awal kosong)
3. Buat 3 `useEffect` terpisah dengan `console.log` yang berbeda label, supaya bisa dibedakan di console:
   ```javascript
   useEffect(() => {
     console.log('EFFECT TANPA DEPENDENCY ARRAY');
   });

   useEffect(() => {
     console.log('EFFECT DENGAN [] - SEKALI SAJA');
   }, []);

   useEffect(() => {
     console.log('EFFECT DENGAN [count] - saat count berubah', count);
   }, [count]);
   ```
4. Buat tombol untuk increment `count`, dan input text untuk mengubah `text`
5. Buka console browser, lalu:
   - Amati apa yang muncul saat komponen pertama kali render
   - Klik tombol increment `count` — amati efek mana yang terpanggil
   - Ketik di input `text` — amati efek mana yang terpanggil (atau tidak terpanggil)

**Pertanyaan refleksi (jawab setelah eksperimen):**
- Kenapa effect dengan `[count]` tidak terpanggil saat kamu ngetik di input `text`?
- Effect mana yang paling sering terpanggil? Kenapa itu bisa berbahaya kalau isinya `setState`?

---

## Tugas 2 — Timer dengan Cleanup yang Benar

**Deskripsi:** Buat komponen stopwatch sederhana yang bisa start, pause, dan reset — dengan cleanup yang benar supaya tidak terjadi memory leak.

**Yang harus ada:**
- Tampilkan waktu berjalan dalam detik
- Tombol **Start** — mulai menghitung naik tiap 1 detik
- Tombol **Pause** — hentikan hitungan sementara
- Tombol **Reset** — kembalikan ke 0 dan berhenti

**Langkah pengerjaan:**
1. Buat file `Stopwatch.jsx`
2. Definisikan state: `seconds` (number, awal 0) dan `isRunning` (boolean, awal `false`)
3. Buat `useEffect` dengan dependency `[isRunning]`:
   - Di dalam, cek: kalau `isRunning` true, jalankan `setInterval` yang increment `seconds` tiap 1000ms
   - **Wajib** return cleanup function yang `clearInterval`
4. Buat function `handleStart` — set `isRunning` ke `true`
5. Buat function `handlePause` — set `isRunning` ke `false`
6. Buat function `handleReset` — set `seconds` ke 0 dan `isRunning` ke `false`
7. Render angka `seconds`, dan tiga tombol di atas

**Cara test cleanup-nya bekerja dengan benar:**
- Klik Start, biarkan jalan beberapa detik
- Klik Pause — pastikan angka **berhenti**, tidak terus jalan di background
- Klik Start lagi — pastikan lanjut dari angka terakhir, bukan reset atau dobel kecepatan (ini tanda cleanup tidak jalan dengan benar — kalau dobel kecepatan berarti ada interval lama yang masih nyangkut)

---

## Tugas 3 — Document Title Sync

**Deskripsi:** Buat komponen yang menyinkronkan judul tab browser (`document.title`) dengan jumlah item di sebuah counter/list.

**Yang harus ada:**
- Counter sederhana (boleh reuse logic dari Counter.jsx kemarin)
- Setiap kali angka counter berubah, **judul tab browser** ikut berubah menampilkan angka itu, misal: `"Counter: 5"`

**Langkah pengerjaan:**
1. Buat file `TitleSync.jsx`
2. Reuse state `count` dan tombol tambah/kurang dari Counter.jsx kemarin
3. Tambahkan `useEffect` baru dengan dependency `[count]`:
   ```javascript
   useEffect(() => {
     document.title = `Counter: ${count}`;
   }, [count]);
   ```
4. Tambahkan cleanup yang mengembalikan title ke semula saat komponen unmount:
   ```javascript
   return () => {
     document.title = 'React App'; // atau title default lainnya
   };
   ```
5. Test: ubah counter, lihat tab browser judulnya ikut berubah secara realtime

**Challenge tambahan (opsional):** kombinasikan dengan kondisional — kalau `count` di atas batas tertentu, ubah title jadi pesan berbeda, misal `"Counter: MAX!"`.

---

## Cara Review Mandiri Setelah Selesai

Sebelum kirim ke saya, tanya ke diri sendiri:

1. Apakah saya paham **kenapa** dependency array yang saya pilih itu yang benar, bukan cuma ikut contoh?
2. Apakah ada `useEffect` yang berpotensi infinite loop kalau saya tidak hati-hati?
3. Apakah setiap `setInterval`, `setTimeout`, atau subscription punya cleanup function yang sesuai?
4. Kalau saya hapus komponen ini dari layar (unmount), apakah ada sisa proses yang masih jalan di background?

Selamat istirahat — sampai ketemu besok pagi. 🚀
