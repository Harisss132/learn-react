# Fundamental `useState` di React

## Apa itu `useState`?

`useState` adalah Hook yang memungkinkan function component menyimpan dan mengelola **data yang bisa berubah**. Setiap kali state berubah, React akan otomatis **re-render** komponen dan memperbarui UI.

```javascript
import { useState } from 'react';

const [state, setState] = useState(initialValue);
```

- `state` → nilai saat ini
- `setState` → fungsi untuk mengubah nilai
- `initialValue` → nilai awal (bisa string, number, boolean, array, object, null)

---

## Aturan Paling Penting

> **React hanya re-render kalau state berubah via `setState`. Variabel biasa tidak akan trigger re-render.**

```javascript
// ❌ Salah — UI tidak akan update
let count = 0;
count = count + 1;

// ✅ Benar — UI akan update
const [count, setCount] = useState(0);
setCount(count + 1);
```

---

## 1. State dengan Tipe Data Primitif

```javascript
// Number
const [count, setCount] = useState(0);

// String
const [name, setName] = useState('');

// Boolean
const [isVisible, setIsVisible] = useState(false);

// Contoh penggunaan
setCount(count + 1);         // tambah 1
setName('Aldi');             // set nama
setIsVisible(!isVisible);    // toggle true/false
```

---

## 2. Functional Update — Cara yang Lebih Aman

Ketika nilai state baru bergantung pada nilai sebelumnya, gunakan **functional update** dengan callback `prev`:

```javascript
// ❌ Bisa bermasalah saat update terjadi bersamaan
setCount(count + 1);

// ✅ Lebih aman — selalu dapat nilai terbaru
setCount(prev => prev + 1);
```

Biasakan pakai `prev =>` setiap kali nilai baru bergantung pada nilai lama.

---

## 3. State dengan Object

React **tidak bisa** melacak perubahan di dalam object secara langsung. Kamu harus selalu membuat **object baru** dengan spread operator:

```javascript
const [user, setUser] = useState({
  name: 'Aldi',
  age: 22,
  city: 'Jakarta'
});

// ❌ Salah — React tidak akan re-render
user.name = 'Budi';
setUser(user);

// ✅ Benar — buat object baru dengan spread
setUser(prev => ({ ...prev, name: 'Budi' }));
// Hasilnya: { name: 'Budi', age: 22, city: 'Jakarta' }
```

**Kenapa harus spread?** Karena `...prev` menyalin semua property lama, lalu kamu override hanya yang berubah. Tanpa ini, property lain akan hilang.

---

## 4. State dengan Array

Sama seperti object — jangan mutate array langsung. Selalu kembalikan **array baru**:

```javascript
const [items, setItems] = useState([]);

// Tambah item
setItems(prev => [...prev, newItem]);

// Hapus item berdasarkan id
setItems(prev => prev.filter(item => item.id !== id));

// Update item tertentu
setItems(prev =>
  prev.map(item =>
    item.id === id ? { ...item, name: 'Updated' } : item
  )
);
```

---

## 5. Immutability — Konsep Paling Krusial

**Immutability** artinya tidak mengubah data asli, melainkan selalu membuat salinan baru.

React membandingkan state lama dan baru dengan cara yang sangat cepat (shallow comparison). Kalau kamu mutate data asli, React mengira tidak ada perubahan dan **tidak akan re-render**.

```javascript
// ❌ Mutasi langsung — React tidak akan re-render
const [todos, setTodos] = useState([{ id: 1, text: 'Belajar React' }]);
todos.push({ id: 2, text: 'Belajar Hooks' }); // mutasi!
setTodos(todos); // React: "array-nya sama aja, skip."

// ✅ Array baru — React akan re-render
setTodos(prev => [...prev, { id: 2, text: 'Belajar Hooks' }]);
```

---

## 6. Beberapa State vs Satu State Object

Untuk state yang tidak saling berkaitan, lebih baik pisah:

```javascript
// ✅ Lebih mudah dikelola
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);

// ⚠️ Boleh, tapi lebih rumit saat update
const [formState, setFormState] = useState({
  username: '',
  email: '',
  isLoading: false
});
```

Gunakan satu object hanya kalau state-state itu memang saling berkaitan erat.

---

## Cheat Sheet

| Kebutuhan | Cara |
|---|---|
| Update nilai primitive | `setState(newValue)` |
| Update berdasarkan nilai lama | `setState(prev => prev + 1)` |
| Update property object | `setState(prev => ({ ...prev, key: value }))` |
| Tambah item ke array | `setState(prev => [...prev, newItem])` |
| Hapus item dari array | `setState(prev => prev.filter(...))` |
| Update item di array | `setState(prev => prev.map(...))` |

---
---

# Tugas

> **Aturan:** Jangan pakai tutorial saat mengerjakan. Pakai dokumentasi resmi React jika perlu referensi. Setiap selesai satu tugas, review sendiri dulu sebelum lanjut ke tugas berikutnya.

---

## Tugas 1 — Counter dengan Batasan

**Deskripsi:** Buat komponen counter yang punya aturan.

**Yang harus ada:**
- Tampilkan angka counter
- Tombol **Tambah** — naikkan counter 1
- Tombol **Kurang** — turunkan counter 1
- Tombol **Reset** — kembalikan ke 0
- Counter tidak boleh kurang dari **0** dan tidak boleh lebih dari **10**
- Tampilkan teks `"Maksimum!"` kalau counter sudah di angka 10
- Tampilkan teks `"Minimum!"` kalau counter sudah di angka 0

**Langkah pengerjaan:**
1. Buat file `Counter.jsx`
2. Definisikan state `count` dengan `useState(0)`
3. Buat function `handleIncrement` — di dalamnya tulis logika agar tidak melebihi 10
4. Buat function `handleDecrement` — di dalamnya tulis logika agar tidak kurang dari 0
5. Buat function `handleReset` — set count kembali ke 0
6. Return JSX dengan tombol-tombol dan tampilan angka
7. Tambahkan kondisi untuk menampilkan teks "Maksimum!" dan "Minimum!"

**Challenge tambahan (opsional):** Buat warna angka berubah — merah kalau di angka 10, biru kalau di angka 0, hitam kalau di tengah.

---

## Tugas 2 — Todo List Sederhana

**Deskripsi:** Buat aplikasi todo list dengan fitur tambah dan hapus.

**Yang harus ada:**
- Input teks untuk menulis todo baru
- Tombol **Tambah** — masukkan todo ke list
- Tampilkan semua todo dalam bentuk list
- Tombol **Hapus** di setiap todo — untuk menghapus item tersebut
- Kalau input kosong dan tombol Tambah ditekan, **jangan tambahkan** todo kosong
- Tampilkan teks `"Belum ada todo"` kalau list masih kosong

**Langkah pengerjaan:**
1. Buat file `TodoList.jsx`
2. Definisikan dua state: `todos` (array, awalnya `[]`) dan `inputValue` (string, awalnya `''`)
3. Buat function `handleAdd`:
   - Cek dulu apakah `inputValue` kosong, kalau iya langsung `return`
   - Buat object todo baru: `{ id: Date.now(), text: inputValue }`
   - Update state `todos` dengan spread operator
   - Reset `inputValue` kembali ke `''`
4. Buat function `handleDelete(id)`:
   - Update state `todos` menggunakan `filter` untuk hapus item dengan id yang sesuai
5. Return JSX:
   - Input yang value-nya terikat ke `inputValue` (controlled input)
   - Tombol Tambah yang panggil `handleAdd`
   - Kondisi: kalau `todos` kosong tampilkan teks, kalau tidak kosong `map` semua todo
   - Di setiap todo, tampilkan teks dan tombol Hapus

**Challenge tambahan (opsional):** Tambahkan fitur **mark as done** — klik todo untuk coret teksnya (gunakan property `isDone: boolean` di object todo).

---

## Tugas 3 — Form dengan Validasi

**Deskripsi:** Buat form registrasi sederhana yang punya validasi sebelum submit.

**Yang harus ada:**
- Input **Nama** — minimal 3 karakter
- Input **Email** — harus mengandung `@`
- Input **Password** — minimal 6 karakter
- Tombol **Submit**
- Tampilkan pesan error di bawah setiap input kalau validasi gagal
- Kalau semua valid dan submit berhasil, tampilkan pesan sukses dan reset semua field

**Langkah pengerjaan:**
1. Buat file `RegisterForm.jsx`
2. Definisikan state untuk form values: `name`, `email`, `password` (semua string kosong)
3. Definisikan state untuk errors: `errors` sebagai object `{ name: '', email: '', password: '' }`
4. Definisikan state `isSuccess` (boolean, awalnya `false`)
5. Buat function `validate()`:
   - Buat object `newErrors` kosong
   - Cek setiap field, isi `newErrors` kalau ada yang tidak valid
   - Return `newErrors`
6. Buat function `handleSubmit`:
   - Panggil `validate()`, simpan hasilnya
   - Update state `errors` dengan hasil validasi
   - Cek apakah ada error — kalau ada, `return` (jangan lanjut)
   - Kalau tidak ada error: set `isSuccess` ke `true`, reset semua field ke string kosong
7. Return JSX dengan semua input, pesan error kondisional, tombol submit, dan pesan sukses kondisional

**Challenge tambahan (opsional):** Tampilkan error **secara realtime** saat user mengetik (bukan hanya saat submit).

---

## Cara Review Mandiri Setelah Selesai

Sebelum kirim ke saya, tanya ke diri sendiri:

1. Apakah semua interaksi bekerja tanpa error di console?
2. Apakah ada tempat di mana kamu mutate state langsung tanpa spread?
3. Apakah ada logika yang bisa disederhanakan?
4. Kalau kamu hapus semua komentar, apakah kode masih mudah dibaca?

Setelah selesai, kirim kodenya ke saya untuk direview. Kita akan bahas apa yang sudah bagus dan apa yang bisa diperbaiki.
