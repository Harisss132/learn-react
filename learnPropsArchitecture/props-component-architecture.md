# Props & Component Architecture di React

## Apa itu Props?

Props (properties) adalah cara React **meneruskan data dari komponen parent ke komponen child**. Analoginya seperti argumen fungsi — kamu kirim data masuk, komponen menggunakannya untuk render tampilan.

```jsx
// Parent mengirim data
<UserCard name="Ahmad" email="ahmad@gmail.com" age={22} />

// Child menerima lewat parameter props
function UserCard(props) {
  return <p>{props.name} - {props.email}</p>;
}

// Atau lebih umum, pakai destructuring langsung
function UserCard({ name, email, age }) {
  return <p>{name} - {email}</p>;
}
```

---

## Aturan Fundamental Props

### 1. Props itu One-Way (Satu Arah)

Data mengalir **dari parent ke child**, tidak bisa sebaliknya. Child tidak bisa mengubah props yang diterimanya.

```jsx
function Child({ name }) {
  name = "Budi"; // ❌ jangan pernah mutate props
  return <p>{name}</p>;
}
```

Kalau child perlu "mengubah" sesuatu di parent, caranya lewat **callback function** yang dikirim sebagai props (dibahas di bawah).

### 2. Props Bisa Berisi Apa Saja

```jsx
<Component
  name="Ahmad"           // string
  age={22}               // number
  isActive={true}        // boolean
  scores={[90, 85, 78]}  // array
  user={{ id: 1 }}       // object
  onDelete={handleDelete} // function
  icon={<StarIcon />}    // JSX element
/>
```

### 3. Default Props

```jsx
function Button({ label, variant = "primary", disabled = false }) {
  return (
    <button disabled={disabled} className={variant}>
      {label}
    </button>
  );
}

// Pakai tanpa variant dan disabled → pakai nilai default
<Button label="Simpan" />
```

---

## Callback Props — Cara Child Komunikasi ke Parent

Ini pola yang paling penting dan paling sering bikin junior bingung.

```jsx
// Parent punya state dan logic
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Belajar React" },
    { id: 2, text: "Belajar Props" },
  ]);

  function handleDelete(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  return (
    <ul>
      {todos.map(todo => (
        // Parent kirim function sebagai props ke child
        <TodoItem
          key={todo.id}
          text={todo.text}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </ul>
  );
}

// Child menerima dan memanggil function tersebut
function TodoItem({ text, onDelete }) {
  return (
    <li>
      {text}
      <button onClick={onDelete}>Hapus</button>
    </li>
  );
}
```

**Konvensi penamaan callback props:** selalu mulai dengan `on` — `onClick`, `onDelete`, `onSubmit`, `onChange`. Ini standar industri yang wajib diikuti.

---

## Children Props — Komposisi Komponen

`children` adalah props spesial yang berisi apapun yang ditulis **di antara** tag pembuka dan penutup sebuah komponen.

```jsx
// Definisi komponen wrapper
function Card({ children, title }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Penggunaan — konten apapun bisa jadi children
<Card title="Profil User">
  <img src="avatar.jpg" />
  <p>Nama: Ahmad</p>
  <button>Edit</button>
</Card>
```

Ini fondasi dari **composition pattern** — cara membangun UI yang fleksibel tanpa membuat komponen yang terlalu spesifik.

---

## Cara Berpikir Memecah Komponen

### Kapan Harus Pecah?

Pecah komponen kalau memenuhi **minimal satu** dari kriteria ini:

```
1. Bisa dipakai ulang di tempat lain (reusability)
2. Terlalu panjang dan sulit dibaca (complexity)
3. Punya tanggung jawab yang berbeda (separation of concern)
4. Perlu di-test secara independen (testability)
```

### Single Responsibility Principle

Setiap komponen idealnya punya **satu tanggung jawab utama**:

```
✅ Avatar      → tampilkan gambar profil
✅ StatBadge   → tampilkan satu angka statistik
✅ LanguageTag → tampilkan satu badge bahasa
✅ ActionButton → satu tombol aksi

❌ UserProfile → tampilkan avatar + stats + badges + buttons + form edit
   (ini terlalu banyak tanggung jawab)
```

---

## Cara Berpikir Memecah Page

Sebuah halaman (page) bisa dipecah menjadi beberapa layer:

```
Page
├── Layout (struktur halaman: sidebar, main content, header)
│   ├── Header
│   └── Sidebar
└── Feature Sections (bagian-bagian fitur utama)
    ├── Section A
    │   ├── SectionHeader
    │   └── ItemList
    │       └── ItemCard (diulang)
    └── Section B
```

### Contoh Konkret — GitHub User Finder

```
GitHubFinderPage
├── SearchBar                    ← input + tombol cari
├── UserProfile                  ← card profil user
│   ├── UserAvatar               ← foto + nama + bio
│   ├── UserStats                ← repo, followers, following
│   └── UserLinks                ← link ke github, website
└── RepositoryList               ← daftar repo
    └── RepositoryCard           ← satu repo (diulang)
        ├── RepoHeader           ← nama + visibility badge
        ├── RepoDescription      ← deskripsi
        └── RepoFooter           ← language + stars + forks
```

Setiap kotak di atas adalah **satu file `.jsx`**. Kelihatannya banyak, tapi setiap file jadi kecil, fokus, dan mudah dibaca.

---

## Struktur Folder yang Sesuai

Ada dua pendekatan yang umum dipakai di industri:

### Pendekatan 1 — By Feature (Recommended untuk project besar)

```
src/
├── features/
│   ├── github-finder/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── UserProfile/
│   │   │   │   ├── UserProfile.jsx
│   │   │   │   ├── UserAvatar.jsx
│   │   │   │   └── UserStats.jsx
│   │   │   └── RepositoryList/
│   │   │       ├── RepositoryList.jsx
│   │   │       └── RepositoryCard.jsx
│   │   └── pages/
│   │       └── GitHubFinderPage.jsx
│   └── profile/
│       └── ...
└── shared/
    └── components/
        ├── Button.jsx       ← komponen yang dipakai di banyak feature
        ├── Card.jsx
        └── LoadingSpinner.jsx
```

### Pendekatan 2 — By Type (Simpler, cocok untuk project kecil-menengah)

```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── UserProfile.jsx
│   ├── UserAvatar.jsx
│   ├── UserStats.jsx
│   ├── RepositoryList.jsx
│   └── RepositoryCard.jsx
├── pages/
│   └── GitHubFinderPage.jsx
└── shared/
    ├── Button.jsx
    └── LoadingSpinner.jsx
```

Untuk portfolio project kamu sekarang, **Pendekatan 2 sudah cukup**. Jangan over-engineer struktur folder sebelum project-nya cukup besar untuk membutuhkan Pendekatan 1.

---

## Anti-Pattern yang Harus Dihindari

### Props Drilling yang Berlebihan

```jsx
// ❌ data dioper 3+ level hanya untuk sampai ke komponen yang butuh
<App user={user}>
  <Dashboard user={user}>
    <Sidebar user={user}>
      <UserMenu user={user} /> {/* yang butuh cuma ini */}
    </Sidebar>
  </Dashboard>
</App>
```

Solusinya adalah Context API atau state management — tapi itu materi berikutnya. Untuk sekarang, kalau props harus dioper lebih dari 2 level, itu sinyal untuk evaluasi ulang struktur komponen.

### Komponen yang Terlalu Generic

```jsx
// ❌ terlalu generic, props-nya tidak jelas
<Component type="user" mode="card" variant="small" data={user} />

// ✅ nama yang spesifik, props yang jelas
<UserCard user={user} size="small" />
```

### Terlalu Banyak Props

```jsx
// ❌ lebih dari 5-6 props itu sinyal komponen terlalu besar
<UserCard
  name={user.name}
  email={user.email}
  avatar={user.avatar}
  bio={user.bio}
  followers={user.followers}
  following={user.following}
  repos={user.repos}
  location={user.location}
/>

// ✅ kirim object-nya langsung
<UserCard user={user} />
```

---

## Cheat Sheet Props

```jsx
// Kirim props
<Child name="Ahmad" age={22} active={true} onClick={handleClick} />

// Terima dengan destructuring
function Child({ name, age, active, onClick }) { ... }

// Default value
function Child({ variant = "primary", size = "md" }) { ... }

// Spread props (hati-hati, jangan overuse)
const btnProps = { disabled: true, type: "submit" };
<Button {...btnProps} />

// Children
function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}
```

---
---

# Tugas

> **Aturan:** Kerjakan berurutan. Tugas 1 membangun fondasi yang dibutuhkan Tugas 2. Fokus pada **pemecahan komponen yang masuk akal** — jangan pecah terlalu kecil tanpa alasan, tapi jangan biarkan satu komponen terlalu besar.

---

## Tugas 1 — Refactor ProfileCard

**Deskripsi:** Pecah `ProfileCard.jsx` yang sudah kamu buat sebelumnya menjadi komponen-komponen yang lebih kecil dan reusable menggunakan props.

**Target struktur yang harus dicapai:**

```
ProfileCard.jsx          ← komponen utama, terima props: user
├── Avatar.jsx           ← foto + nama + username, props: imageUrl, name, username
├── Bio.jsx              ← teks bio, props: text
├── StatList.jsx         ← section stats, props: stats (object)
├── LanguageBadge.jsx    ← SATU badge bahasa, props: language
└── ActionButtons.jsx    ← tombol Follow + Message
```

**Langkah pengerjaan:**
1. Buat folder `ProfileCard/` di dalam `components/`
2. Pindahkan `ProfileCard.jsx` ke dalam folder tersebut
3. Buat `Avatar.jsx` — cut JSX bagian avatar dari ProfileCard, buat jadi komponen terpisah yang terima props `imageUrl`, `name`, `username`
4. Buat `Bio.jsx` — komponen sederhana yang terima props `text`
5. Buat `StatList.jsx` — terima props `stats` (object berisi `repositories`, `followers`, `following`), render ketiganya
6. Buat `LanguageBadge.jsx` — komponen untuk **satu** badge bahasa, terima props `language`. Di `ProfileCard`, render ini dengan `.map()`
7. Buat `ActionButtons.jsx` — dua tombol Follow dan Message, tanpa props dulu (nanti bisa ditambahkan `onFollow` dan `onMessage` callback)
8. Update `ProfileCard.jsx` — sekarang cukup import dan susun komponen-komponen di atas, sambil teruskan data yang dibutuhkan lewat props

**Yang harus diperhatikan:**
- Setiap komponen child hanya boleh terima data yang benar-benar dibutuhkannya — `Avatar` tidak perlu tahu soal `stats`, `StatList` tidak perlu tahu soal `language`
- Pastikan tampilan akhir **identik** dengan sebelum refactor — refactor yang baik tidak mengubah tampilan, hanya mengubah struktur kode

---

## Tugas 2 — Bangun Halaman dengan Arsitektur yang Benar

**Deskripsi:** Buat halaman sederhana `DeveloperDirectoryPage` yang menampilkan direktori developer, dengan struktur komponen dan folder yang proper dari awal.

**Target tampilan:**
- Header halaman dengan judul dan deskripsi singkat
- Search bar untuk filter developer berdasarkan nama (filter lokal, tidak perlu fetch)
- Grid ProfileCard hasil refactor dari Tugas 1
- Empty state kalau hasil filter kosong ("Tidak ada developer yang cocok")
- Footer sederhana

**Target struktur folder:**

```
src/
├── components/
│   ├── ProfileCard/
│   │   ├── ProfileCard.jsx
│   │   ├── Avatar.jsx
│   │   ├── Bio.jsx
│   │   ├── StatList.jsx
│   │   ├── LanguageBadge.jsx
│   │   └── ActionButtons.jsx
│   └── shared/
│       ├── SearchBar.jsx
│       └── EmptyState.jsx
├── pages/
│   └── DeveloperDirectoryPage.jsx
└── data/
    └── developers.js
```

**Langkah pengerjaan:**
1. Buat struktur folder sesuai target di atas
2. Pindahkan `data.js` ke `src/data/developers.js`, rename variable jadi `developers`
3. Buat `SearchBar.jsx` di `shared/` — terima props `value`, `onChange`, `placeholder`
4. Buat `EmptyState.jsx` di `shared/` — terima props `message`
5. Buat `DeveloperDirectoryPage.jsx` di `pages/`:
   - Import `developers` dari `data/developers.js`
   - Definisikan state `searchQuery` (string, awal kosong)
   - Buat `filteredDevelopers` — filter `developers` berdasarkan `searchQuery` (case insensitive, cek nama mengandung query)
   - Render `SearchBar`, lalu grid `ProfileCard`, lalu `EmptyState` kalau `filteredDevelopers` kosong
6. Update `App.jsx` — render `DeveloperDirectoryPage`

**Yang harus diperhatikan:**
- `DeveloperDirectoryPage` adalah satu-satunya tempat yang boleh punya state dan logic filter — komponen child hanya terima data lewat props
- `SearchBar` harus murni presentational — tidak punya state sendiri, hanya terima `value` dan `onChange` dari parent (ini disebut **controlled component**)
- `EmptyState` harus reusable — bisa dipakai di halaman lain dengan `message` yang berbeda

**Challenge tambahan (opsional):** Tambahkan filter berdasarkan bahasa pemrograman — dropdown yang memungkinkan user filter developer yang menguasai bahasa tertentu. Kombinasikan dengan filter nama (keduanya aktif sekaligus).

---

## Cara Review Mandiri

Sebelum kirim ke saya, tanya ke diri sendiri:

1. Apakah setiap komponen child hanya terima props yang benar-benar dibutuhkannya?
2. Apakah ada logika (state, filtering, event handler) yang seharusnya di parent tapi malah ada di child?
3. Apakah ada duplikasi JSX yang bisa dihilangkan dengan membuat komponen baru?
4. Kalau saya mau reuse `SearchBar` di halaman lain, apakah bisa tanpa mengubah kodenya?
5. Kalau ada developer baru ditambahkan ke `developers.js`, apakah UI otomatis update tanpa perlu ubah kode komponen?
