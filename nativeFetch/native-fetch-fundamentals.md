# Fundamental Native Fetch di JavaScript & React

## Apa itu Fetch?

`fetch` adalah Web API bawaan browser untuk melakukan HTTP request — mengambil atau mengirim data ke server/API. Tidak perlu install library apapun, langsung bisa dipakai.

```javascript
fetch('https://api.example.com/data')
```

Sesederhana itu untuk memulai. Tapi ada banyak hal yang perlu dipahami di baliknya.

---

## Promise — Fondasi dari Fetch

`fetch` mengembalikan **Promise** — sebuah objek yang merepresentasikan operasi yang belum selesai. Karena request ke network itu butuh waktu, JavaScript tidak menunggu — dia lanjut eksekusi kode berikutnya, dan Promise akan "resolve" (berhasil) atau "reject" (gagal) nanti.

```javascript
// Promise dengan .then() dan .catch()
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())   // step 1: parse response jadi JSON
  .then(data => console.log(data))     // step 2: pakai datanya
  .catch(error => console.log(error)); // kalau ada error
```

Ada **dua step** yang perlu dipahami:
- `response` itu bukan data-nya langsung — itu HTTP response object (berisi status, headers, dll)
- `.json()` adalah method untuk mengekstrak body response dan parse jadi JavaScript object — dan ini juga mengembalikan Promise, makanya butuh `.then()` lagi

---

## Async/Await — Cara Modern yang Lebih Readable

`async/await` adalah syntax sugar di atas Promise — hasilnya sama persis, tapi lebih mudah dibaca seperti kode synchronous biasa.

```javascript
// Dengan .then() — Promise chaining
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

// Dengan async/await — lebih readable
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

`await` artinya "tunggu Promise ini selesai dulu, baru lanjut ke baris berikutnya". Tapi `await` hanya bisa dipakai di dalam function yang diberi keyword `async`.

---

## Fetch di React — Pola yang Benar

Fetch harus selalu ada di dalam `useEffect` karena dia adalah side effect. Pola lengkap yang wajib kamu hafal:

```javascript
function UserList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Cek apakah HTTP response-nya sukses (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // jalan baik error maupun sukses
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{/* render data */}</div>;
}
```

**Kenapa function `fetchData` didefinisikan di dalam `useEffect`, bukan di luar?**
Karena `useEffect` tidak bisa langsung menerima async function sebagai argumennya — kalau kamu tulis `useEffect(async () => {...}, [])`, React akan warning karena async function mengembalikan Promise, sedangkan `useEffect` mengharapkan return berupa cleanup function atau tidak return apapun.

---

## Tiga State yang Selalu Dibutuhkan

Ini pattern yang akan kamu pakai berulang kali di setiap fetch:

| State | Tipe | Fungsi |
|---|---|---|
| `data` | null / array / object | Menyimpan hasil fetch |
| `loading` | boolean | Indikator apakah request sedang berlangsung |
| `error` | null / string | Menyimpan pesan error kalau fetch gagal |

Ketiga state ini **tidak boleh dihilangkan salah satunya** di aplikasi production. Loading state mencegah user melihat konten kosong. Error state mencegah aplikasi diam saja tanpa feedback saat ada masalah.

---

## Satu Hal yang Sering Salah — `response.ok`

```javascript
// ❌ Banyak junior yang hanya begini
const response = await fetch(url);
const data = await response.json(); // langsung parse, tidak cek status

// ✅ Yang benar
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`);
}
const data = await response.json();
```

**Kenapa perlu cek `response.ok`?** Karena `fetch` hanya throw error untuk kegagalan network (tidak ada koneksi, DNS gagal, dll). Kalau server merespons dengan status `404` (not found) atau `500` (server error), `fetch` tetap menganggapnya "berhasil" dan tidak masuk ke `catch`. Kamu harus cek `response.ok` secara manual.

---

## HTTP Methods — Bukan Cuma GET

```javascript
// GET (default) — ambil data
await fetch('https://api.example.com/users');

// POST — kirim data baru
await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Aldi', email: 'aldi@gmail.com' })
});

// PUT — update data
await fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Aldi Updated' })
});

// DELETE — hapus data
await fetch('https://api.example.com/users/1', {
  method: 'DELETE'
});
```

Untuk tugas hari ini fokus ke **GET** dulu. POST, PUT, DELETE akan relevan saat kamu mulai bikin project dengan backend sendiri.

---

## Mental Model yang Harus Diingat

> **Fetch itu asynchronous — artinya kode setelah fetch tidak menunggu fetch selesai, kecuali kamu pakai `await`.**

```javascript
// ❌ Salah — data masih undefined saat console.log dijalankan
const response = fetch(url); // tidak pakai await
console.log(response); // Promise {<pending>}, bukan data!

// ✅ Benar — await memastikan fetch selesai dulu
const response = await fetch(url);
const data = await response.json();
console.log(data); // data yang sesungguhnya
```

---
---

# Tugas

> **Aturan:** Kerjakan berurutan. Tugas 1 adalah fondasi dari Tugas 2. Public API yang dipakai: `https://jsonplaceholder.typicode.com` — tidak perlu API key, gratis, dan reliable untuk belajar.

---

## Tugas 1 — Fetch dan Tampilkan Data Users

**Deskripsi:** Ambil data dari API dan tampilkan ke UI dengan penanganan loading dan error yang benar.

**Endpoint:** `GET https://jsonplaceholder.typicode.com/users`

**Yang harus ada:**
- Tampilkan **loading indicator** saat data sedang diambil
- Tampilkan **pesan error** kalau fetch gagal
- Tampilkan list users yang berisi: nama, email, dan kota (city) tiap user
- Tombol **Refresh** yang fetch ulang data dari awal (hint: kamu butuh state tambahan untuk trigger ini)

**Langkah pengerjaan:**
1. Buat file `UserList.jsx`
2. Definisikan tiga state: `users` (array, awal `[]`), `loading` (boolean, awal `true`), `error` (null, awal `null`)
3. Buat `useEffect` dengan `[]` sebagai dependency
4. Di dalam `useEffect`, definisikan `async function fetchUsers()` lalu panggil langsung setelahnya
5. Di dalam `fetchUsers`:
   - Set `loading` ke `true` di awal
   - Fetch dari endpoint di atas
   - Cek `response.ok` — kalau tidak ok, throw Error
   - Parse response jadi JSON, simpan ke state `users`
   - Di `catch`: set state `error` dengan pesan errornya
   - Di `finally`: set `loading` ke `false`
6. Di JSX: render kondisional — loading dulu, lalu error, lalu data
7. Untuk tombol Refresh: buat state `refetchTrigger` (number, awal `0`), masukkan ke dependency array useEffect, dan increment nilainya saat tombol Refresh diklik

**Cara test error handling:** Setelah berhasil, coba ganti URL-nya jadi URL yang salah (misal tambahkan `/wrongpath`) — pastikan pesan error muncul, bukan blank atau crash.

---

## Tugas 2 — Fetch dengan Parameter Dinamis

**Deskripsi:** Ambil data posts berdasarkan user yang dipilih — fetch ulang setiap kali pilihan berubah.

**Endpoints:**
- `GET https://jsonplaceholder.typicode.com/users` — untuk list user
- `GET https://jsonplaceholder.typicode.com/posts?userId={id}` — untuk posts milik user tertentu

**Yang harus ada:**
- Dropdown (`<select>`) berisi nama semua user (fetch dari endpoint users)
- Saat user dipilih dari dropdown, otomatis fetch posts milik user tersebut
- Tampilkan list posts (title saja) dari user yang dipilih
- Loading dan error state untuk **masing-masing** fetch (users dan posts terpisah)
- Tampilkan teks `"Pilih user untuk melihat posts"` kalau belum ada user yang dipilih

**Langkah pengerjaan:**
1. Buat file `UserPosts.jsx`
2. Definisikan state: `users`, `loadingUsers`, `errorUsers` untuk fetch list user
3. Definisikan state: `posts`, `loadingPosts`, `errorPosts`, `selectedUserId` untuk fetch posts
4. Buat `useEffect` pertama dengan `[]` — fetch semua users untuk isi dropdown
5. Buat `useEffect` kedua dengan `[selectedUserId]` — fetch posts saat selectedUserId berubah:
   - Kalau `selectedUserId` masih `null`, langsung `return` (jangan fetch)
   - Kalau ada nilainya, fetch ke endpoint posts dengan userId yang sesuai
6. Di JSX:
   - Render dropdown dari data `users`
   - `onChange` dropdown: update `selectedUserId` dengan id user yang dipilih (ingat: value dari select itu string, mungkin perlu dikonversi ke number)
   - Render posts di bawah dropdown secara kondisional

**Hal yang perlu diperhatikan:** Saat user ganti pilihan di dropdown, posts lama masih terlihat sebentar sebelum yang baru datang. Bagaimana cara handle ini supaya UX-nya lebih baik? (Hint: kapan sebaiknya kamu set `posts` kembali ke array kosong?)

---

## Cara Review Mandiri Setelah Selesai

Sebelum kirim ke saya, pastikan:

1. Apakah `loading` state selalu di-set ke `false` di `finally`, bukan hanya di sukses?
2. Apakah ada pengecekan `response.ok` sebelum `.json()`?
3. Apakah fetch dipanggil di dalam `useEffect`, bukan langsung di body component?
4. Apakah dropdown bisa ganti pilihan berulang kali dan data posts selalu update sesuai user yang dipilih?
5. Test dengan koneksi normal, lalu test dengan URL yang salah — apakah error state muncul dengan benar?
