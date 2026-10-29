# Platform Belajar Programming Interaktif --- SyntaxLab

Platform pembelajaran programming yang terinspirasi dari pola belajar
interaktif seperti W3Schools. Website menyediakan tutorial, referensi,
contoh kode yang dapat dicoba, latihan, quiz, dan dashboard progres
belajar. Arsitektur dirancang agar fitur AI dapat ditambahkan secara
bertahap.

> **Catatan:** SyntaxLab adalah nama kerja. Periksa ketersediaan nama,
> domain, dan merek dagang sebelum digunakan secara publik. Project ini
> terinspirasi oleh pola platform pembelajaran programming; desain,
> konten, dan identitas visual sebaiknya dibuat sendiri.

------------------------------------------------------------------------

## 1. Tujuan Proyek

Membangun platform belajar programming yang:

-   Menyajikan materi dengan navigasi yang jelas dan mudah diikuti.
-   Memungkinkan pengguna mencoba contoh kode secara langsung.
-   Menyediakan latihan dan quiz untuk menguji pemahaman.
-   Memiliki tampilan responsif untuk desktop, tablet, dan mobile.
-   Menggunakan animasi secara terukur untuk meningkatkan pengalaman
    pengguna.
-   Memiliki fondasi yang memungkinkan integrasi AI Tutor di tahap
    berikutnya.

## 2. Daftar Page yang Dibutuhkan

### A. Halaman publik dan navigasi

  -----------------------------------------------------------------------
  Page / Route            Fungsi                  Prioritas
  ----------------------- ----------------------- -----------------------
  `/`                     Homepage, pengenalan    MVP
                          platform, pencarian     
                          materi, kategori        
                          populer, dan ajakan     
                          mulai belajar           

  `/tutorials`            Katalog seluruh         MVP
                          tutorial dan teknologi  
                          yang tersedia           

  `/search?q=`            Hasil pencarian materi, MVP
                          bahasa, dan topik       

  `/about`                Informasi tentang       Opsional
                          tujuan dan pendekatan   
                          pembelajaran platform   

  `/contact`              Informasi kontak atau   Opsional
                          kanal masukan           

  `/help`                 Panduan penggunaan      Setelah MVP
                          website dan FAQ         
  -----------------------------------------------------------------------

### B. Halaman belajar dan dokumentasi

Halaman-halaman ini merupakan inti website.

  ----------------------------------------------------------------------------
  Page / Route                 Fungsi                  Prioritas
  ---------------------------- ----------------------- -----------------------
  `/learn/[course]`            Halaman pengantar       MVP
                               kursus, daftar topik,   
                               dan urutan belajar      

  `/learn/[course]/[lesson]`   Halaman tutorial dengan MVP
                               konten, contoh kode,    
                               sidebar, serta navigasi 
                               materi                  
                               sebelumnya/berikutnya   

  `/references/[technology]`   Referensi sintaks,      Tahap 2
                               properti, fungsi,       
                               atribut, atau API       
                               berdasarkan teknologi   

  `/examples`                  Kumpulan contoh kode    Tahap 2
                               berdasarkan topik       

  `/playground`                Editor untuk mencoba    MVP sederhana
                               kode tanpa harus        
                               membuka tutorial        
                               tertentu                

  `/playground/[id]`           Playground dengan kode  Tahap 2
                               yang dapat dibagikan    
                               melalui ID atau URL     

  `/glossary`                  Daftar istilah          Tahap 2
                               programming dan         
                               definisinya             
  ----------------------------------------------------------------------------

**Teknologi awal yang disarankan untuk materi:** HTML, CSS, dan
JavaScript. Setelah alur belajar dan editor stabil, materi dapat
diperluas ke Python, SQL, TypeScript, atau teknologi lain.

### C. Halaman latihan dan evaluasi

  -----------------------------------------------------------------------
  Page / Route            Fungsi                  Prioritas
  ----------------------- ----------------------- -----------------------
  `/exercises`            Katalog latihan         MVP
                          berdasarkan bahasa,     
                          topik, dan tingkat      
                          kesulitan               

  `/exercises/[id]`       Deskripsi tugas, editor Tahap 2
                          atau area jawaban,      
                          instruksi, dan hasil    
                          evaluasi                

  `/quizzes`              Daftar quiz berdasarkan MVP sederhana
                          kursus atau topik       

  `/quizzes/[id]`         Menampilkan pertanyaan, MVP sederhana
                          pilihan jawaban, dan    
                          hasil                   

  `/results/[id]`         Ringkasan skor, jawaban Tahap 2
                          benar/salah, dan        
                          rekomendasi materi      
                          untuk diulang           
  -----------------------------------------------------------------------

### D. Halaman akun dan progres belajar

Halaman ini memerlukan autentikasi dan penyimpanan data. Bisa
ditambahkan setelah versi publik berjalan.

  -----------------------------------------------------------------------
  Page / Route            Fungsi                  Prioritas
  ----------------------- ----------------------- -----------------------
  `/login`                Login pengguna          Tahap 2

  `/register`             Registrasi pengguna     Tahap 2

  `/forgot-password`      Memulai proses          Tahap 2
                          pemulihan kata sandi    

  `/dashboard`            Ringkasan progres,      Tahap 2
                          kursus terakhir, dan    
                          rekomendasi materi      

  `/my-learning`          Daftar kursus atau      Tahap 2
                          materi yang sedang      
                          dipelajari              

  `/bookmarks`            Materi yang disimpan    Tahap 2
                          pengguna                

  `/settings`             Pengaturan profil,      Tahap 2
                          preferensi tema, dan    
                          akun                    

  `/history`              Riwayat latihan dan     Tahap 2
                          quiz                    
  -----------------------------------------------------------------------

### E. Halaman AI --- dirancang untuk tahap berikutnya

AI sebaiknya menjadi fitur yang terhubung dengan aktivitas belajar,
bukan sekadar chatbot yang terpisah dari materi.

  ------------------------------------------------------------------------------
  Page / Route atau komponen     Fungsi                  Prioritas
  ------------------------------ ----------------------- -----------------------
  Komponen AI Tutor di halaman   Menjawab pertanyaan     Tahap 3
  tutorial                       dengan konteks materi   
                                 yang sedang dibaca      

  `/ai-tutor`                    Antarmuka tutor AI umum Tahap 3
                                 untuk pertanyaan        
                                 programming             

  `/ai-tutor/[conversationId]`   Melanjutkan percakapan  Tahap 3, jika riwayat
                                 AI yang tersimpan       percakapan diperlukan

  Komponen Explain Code          Meminta AI menjelaskan  Tahap 3
                                 potongan kode           

  Komponen Debug Assistant       Membantu menganalisis   Tahap 3
                                 kode dan pesan error    

  Komponen AI Hint               Memberi petunjuk        Tahap 3
                                 bertahap untuk latihan  
                                 tanpa langsung          
                                 membocorkan jawaban     

  Komponen AI Exercise Generator Membuat latihan         Tahap 3
                                 berdasarkan topik dan   
                                 tingkat kesulitan       

  Komponen AI Learning           Menyarankan materi      Tahap 4
  Recommendations                berdasarkan progres dan 
                                 hasil latihan           
  ------------------------------------------------------------------------------

Komponen AI dapat ditampilkan di dalam halaman tutorial atau latihan
sehingga pengguna tidak harus berpindah halaman untuk meminta bantuan.

### F. Halaman admin / pengelolaan konten

Diperlukan jika konten nantinya dikelola melalui dashboard, bukan hanya
file di repository.

  -----------------------------------------------------------------------
  Page / Route            Fungsi                  Prioritas
  ----------------------- ----------------------- -----------------------
  `/admin`                Ringkasan pengelolaan   Tahap 4
                          konten                  

  `/admin/courses`        Membuat dan mengelola   Tahap 4
                          kursus                  

  `/admin/lessons`        Membuat, mengedit,      Tahap 4
                          menerbitkan, atau       
                          mengarsipkan materi     

  `/admin/exercises`      Mengelola latihan dan   Tahap 4
                          test case               

  `/admin/quizzes`        Mengelola pertanyaan    Tahap 4
                          dan jawaban quiz        
  -----------------------------------------------------------------------

Route admin wajib dilindungi autentikasi dan otorisasi berbasis peran.
Jangan mengandalkan penyembunyian menu di frontend sebagai pengamanan.

------------------------------------------------------------------------

## 3. Fitur Utama

### Fitur MVP

-   **Homepage:** pengenalan platform, kategori populer, materi terbaru,
    dan pencarian.
-   **Katalog tutorial:** daftar kursus yang dapat difilter berdasarkan
    kategori.
-   **Lesson page:** konten materi, daftar isi, sidebar, breadcrumb, dan
    navigasi Previous / Next.
-   **Code examples:** contoh kode dengan syntax highlighting dan tombol
    salin.
-   **Code playground:** editor dasar untuk HTML, CSS, dan JavaScript
    dengan preview hasil.
-   **Exercises:** latihan dasar yang dapat dibuka dari halaman materi.
-   **Quiz:** pertanyaan pilihan ganda dan ringkasan skor sederhana.
-   **Responsive design:** layout yang nyaman di desktop, tablet, dan
    ponsel.
-   **Dark / light mode:** preferensi tema jika waktu pengembangan
    memungkinkan.
-   **Accessibility:** navigasi keyboard, label yang jelas, kontras
    warna memadai, dan dukungan `prefers-reduced-motion`.

### Fitur tahap lanjutan

-   Registrasi dan login.
-   Dashboard serta progres belajar.
-   Bookmark dan riwayat belajar.
-   Pencarian yang lebih baik.
-   Referensi sintaks dan pustaka contoh.
-   AI Tutor, AI Explain Code, AI Debug Assistant, dan AI Hint.
-   Rekomendasi materi personal.
-   Admin dashboard untuk mengelola konten.
-   Penyimpanan dan berbagi playground.

------------------------------------------------------------------------

## 4. Tech Stack

  -----------------------------------------------------------------------
  Bagian                  Teknologi               Keterangan
  ----------------------- ----------------------- -----------------------
  UI Library              React.js                Membangun komponen
                                                  antarmuka

  Build Tool              Vite                    Development server dan
                                                  production build

  Language                JavaScript (ES6+)       Bahasa awal project

  Styling                 Tailwind CSS            Styling responsif dan
                                                  konsisten

  Animation               Motion for React        Animasi komponen dan
                          (sebelumnya dikenal     transisi
                          sebagai Framer Motion)  

  Routing                 React Router            Navigasi halaman untuk
                                                  aplikasi React + Vite

  Code Editor             CodeMirror              Editor kode untuk
                                                  playground

  Syntax Highlighting     Shiki atau CodeMirror   Menampilkan kode dengan
                          language packages       pewarnaan sintaks

  Content                 Markdown / MDX          Menyimpan materi
                                                  tutorial sebagai konten

  Icons                   Lucide React            Ikon antarmuka

  Package Manager         npm                     Mengelola dependencies

  Version Control         Git + GitHub            Mengelola source code

  Deployment              Vercel, Netlify, atau   Hosting frontend
                          static hosting lain     
  -----------------------------------------------------------------------

**Catatan frontend:** stack utama project ini adalah React + Vite +
Tailwind CSS + Motion for React, sesuai kebutuhan frontend interaktif.
React Router diperlukan ketika website memiliki banyak route.
Konfigurasi Tailwind CSS mengikuti versi yang dipilih saat setup.

### Backend dan database di masa depan

Versi awal dapat menggunakan data statis dan belum membutuhkan backend.
Ketika fitur akun, progres, penyimpanan percakapan AI, atau pengelolaan
konten diperlukan, opsi yang praktis adalah:

  -----------------------------------------------------------------------
  Bagian                              Pilihan yang disarankan
  ----------------------------------- -----------------------------------
  Backend awal                        Supabase untuk database dan
                                      autentikasi; tambahkan server/API
                                      untuk logika khusus

  Database                            PostgreSQL melalui Supabase

  AI Provider                         API model AI, misalnya OpenAI API

  Server-side AI endpoint             Backend/API route yang menyimpan
                                      secret dan memvalidasi permintaan

  AI streaming                        Dapat memakai Vercel AI SDK atau
                                      SDK resmi provider

  Retrieval materi (jika diperlukan)  PostgreSQL + pgvector atau solusi
                                      pencarian lain
  -----------------------------------------------------------------------

Frontend-only tidak boleh menyimpan API key AI di source code browser.
Permintaan ke provider AI harus melewati server yang aman. Jika memilih
backend terpisah, backend seperti Express atau NestJS dapat ditambahkan
berdasarkan kebutuhan; tidak wajib untuk MVP.

------------------------------------------------------------------------

## 5. Struktur Proyek

Contoh struktur awal untuk React + Vite:

``` text
syntaxlab/
├── public/
│   ├── images/
│   └── favicon.svg
├── content/
│   ├── html/
│   │   ├── introduction.mdx
│   │   └── headings.mdx
│   ├── css/
│   └── javascript/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AppLayout.jsx
│   │   ├── navigation/
│   │   │   ├── CourseSidebar.jsx
│   │   │   └── LessonNavigation.jsx
│   │   ├── lesson/
│   │   │   ├── LessonContent.jsx
│   │   │   ├── CodeBlock.jsx
│   │   │   └── TableOfContents.jsx
│   │   ├── editor/
│   │   │   ├── CodePlayground.jsx
│   │   │   └── PreviewFrame.jsx
│   │   ├── exercises/
│   │   ├── quiz/
│   │   └── ui/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TutorialsPage.jsx
│   │   ├── CoursePage.jsx
│   │   ├── LessonPage.jsx
│   │   ├── PlaygroundPage.jsx
│   │   ├── ExercisesPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── data/
│   │   ├── courses.js
│   │   ├── lessons.js
│   │   ├── exercises.js
│   │   └── quizzes.js
│   ├── hooks/
│   ├── lib/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Struktur ini merupakan titik awal. Folder `pages` dapat diganti dengan
struktur berbasis fitur jika aplikasi berkembang. Komponen AI dan kode
backend dapat ditambahkan ketika fase AI dimulai.

------------------------------------------------------------------------

## 6. Persiapan

Pastikan perangkat memiliki:

-   Node.js versi LTS.
-   npm, yang biasanya disertakan bersama Node.js.
-   Git (opsional, tetapi disarankan).
-   Editor kode seperti Visual Studio Code.

Periksa instalasi:

``` bash
node -v
npm -v
git --version
```

------------------------------------------------------------------------

## 7. Menjalankan Proyek

### 1. Buat project React + Vite

``` bash
npm create vite@latest syntaxlab -- --template react
cd syntaxlab
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Tambahkan library yang diperlukan

``` bash
npm install react-router-dom motion lucide-react
```

Tambahkan Tailwind CSS mengikuti panduan instalasi resmi untuk versi
yang digunakan: https://tailwindcss.com/docs/installation.

Jika ingin memakai CodeMirror, instal paket inti dan dukungan bahasa
yang diperlukan. Pilih paket berdasarkan bahasa yang akan dijalankan di
playground.

### 4. Jalankan development server

``` bash
npm run dev
```

Buka alamat lokal yang ditampilkan di terminal, biasanya
`http://localhost:5173`.

### 5. Build untuk production

``` bash
npm run build
```

Hasil build Vite biasanya tersedia di folder `dist/`.

### 6. Preview hasil build

``` bash
npm run preview
```

------------------------------------------------------------------------

## 8. Animasi dan Interaksi

Animasi yang dapat digunakan:

-   Elemen hero muncul dengan transisi ringan.
-   Kartu kursus dan proyek memiliki hover state.
-   Sidebar dan menu mobile terbuka dengan transisi.
-   Konten atau kartu muncul saat masuk ke viewport.
-   Tombol memiliki feedback visual saat ditekan.
-   Transisi ringan untuk tab, modal, dan panel editor.

Gunakan Motion for React untuk animasi yang membutuhkan kontrol lebih
lanjut. Untuk interaksi sederhana, CSS transition sudah cukup.

Prinsip animasi:

-   Jangan mengorbankan keterbacaan dan performa.
-   Hindari animasi berlebihan di halaman tutorial.
-   Hormati `prefers-reduced-motion`.
-   Pastikan interaksi tetap dapat digunakan dengan keyboard.
-   Jangan menganimasikan properti yang berat jika dapat dihindari.

------------------------------------------------------------------------

## 9. Keamanan Code Playground

Code playground adalah fitur penting, tetapi kode yang dimasukkan
pengguna harus dipisahkan dari aplikasi utama.

-   Untuk preview HTML/CSS/JavaScript sederhana, gunakan `iframe` dengan
    konfigurasi `sandbox` yang ditinjau dengan cermat.
-   Jangan memasukkan kode pengguna langsung ke DOM aplikasi utama.
-   Hindari menggabungkan `allow-scripts` dan `allow-same-origin` pada
    iframe dari origin yang sama tanpa memahami konsekuensi keamanannya.
-   Jangan menjalankan kode arbitrer pengguna sebagai proses di server
    aplikasi.
-   Untuk bahasa yang membutuhkan runtime server, gunakan lingkungan
    eksekusi terisolasi atau layanan khusus dengan batas CPU, memori,
    waktu, dan akses jaringan.
-   Jangan menganggap AI sebagai mekanisme keamanan untuk kode yang
    dihasilkan.

Mulai dari preview HTML/CSS/JavaScript di browser sebelum menambah
eksekusi bahasa lain.

------------------------------------------------------------------------

## 10. Rencana Integrasi AI

AI direncanakan sebagai fitur tahap lanjutan. Website tetap harus
berfungsi untuk belajar meskipun AI belum diaktifkan.

### Fase 1 --- Platform belajar dasar

-   Homepage dan katalog tutorial.
-   Halaman materi dengan navigasi.
-   Code examples dan playground HTML/CSS/JavaScript.
-   Latihan dan quiz sederhana.
-   Responsivitas dan aksesibilitas.

### Fase 2 --- Akun dan progres

-   Autentikasi pengguna.
-   Dashboard.
-   Penyimpanan progres, bookmark, dan hasil quiz.
-   Database untuk data yang perlu disimpan.

### Fase 3 --- AI Tutor

-   Chat AI yang mengetahui materi aktif.
-   Penjelasan kode.
-   Bantuan memahami pesan error.
-   Hint untuk latihan.
-   Streaming jawaban jika didukung stack AI yang dipilih.
-   Batas penggunaan dan pencatatan biaya.

### Fase 4 --- AI berbasis koleksi materi

-   Pencarian materi relevan sebelum membuat jawaban (RAG), jika jumlah
    konten membutuhkannya.
-   Pembuatan latihan berdasarkan topik dan tingkat kesulitan.
-   Rekomendasi materi berdasarkan progres.
-   Evaluasi kualitas jawaban AI dan mekanisme pelaporan jawaban yang
    keliru.

### Alur AI yang direncanakan

``` text
User
  |
  v
React Frontend
  |
  v
Server-side API
  |
  +--> Validasi input dan rate limit
  |
  +--> Ambil konteks materi yang relevan
  |
  v
AI Provider API
  |
  v
Server mengirim respons
  |
  v
AI Tutor UI
```

API key harus disimpan sebagai environment variable di server. Jangan
memasukkan secret ke variabel frontend yang dikirim ke browser. Validasi
input, autentikasi bila diperlukan, rate limiting, pembatasan biaya, dan
perlindungan data harus disiapkan sebelum AI dibuka untuk publik.

------------------------------------------------------------------------

## 11. Deployment

Pilihan hosting frontend:

-   Vercel.
-   Netlify.
-   GitHub Pages, dengan konfigurasi routing SPA yang sesuai.

Pengaturan build yang umum untuk Vite:

-   **Build command:** `npm run build`
-   **Output directory:** `dist`

Jika menggunakan React Router dan static hosting, siapkan fallback
routing agar URL halaman dalam tetap mengarah ke aplikasi. Jika backend
atau AI API ditambahkan, deploy komponen server ke lingkungan yang
mendukung server-side execution; jangan mengandalkan static hosting saja
untuk menyimpan secret atau menjalankan endpoint AI.

------------------------------------------------------------------------

## 12. Batasan dan Catatan

-   MVP dapat dimulai sebagai frontend-only dengan konten statis.
-   Data statis cocok untuk konten awal, tetapi kurang praktis jika
    jumlah materi sangat besar atau perlu diedit oleh banyak
    kontributor.
-   Login, progres lintas perangkat, riwayat AI, dan dashboard
    membutuhkan penyimpanan persisten serta backend atau layanan
    backend.
-   Form kontak tidak dapat mengirim data ke server secara langsung
    tanpa layanan eksternal atau backend.
-   API key AI tidak boleh disimpan di frontend.
-   Hasil AI dapat keliru; tampilkan jawaban sebagai bantuan belajar dan
    sediakan cara untuk melaporkan kesalahan.
-   Konten tutorial harus ditulis sendiri atau digunakan sesuai lisensi
    yang berlaku. Jangan menyalin konten, desain, atau branding platform
    lain secara langsung.

------------------------------------------------------------------------

## 13. Urutan Implementasi yang Disarankan

1.  Tentukan identitas visual, nama, dan kategori kursus awal.
2.  Setup React + Vite + Tailwind CSS.
3.  Buat layout global, navbar, footer, dan navigasi mobile.
4.  Buat homepage dan katalog tutorial.
5.  Buat halaman materi dengan sidebar, breadcrumb, dan navigasi
    Previous / Next.
6.  Tambahkan blok kode dengan syntax highlighting dan tombol salin.
7.  Buat playground HTML/CSS/JavaScript yang aman.
8.  Tambahkan latihan dan quiz sederhana.
9.  Uji responsivitas, aksesibilitas, dan performa.
10. Deploy MVP.
11. Tambahkan autentikasi dan database jika diperlukan.
12. Integrasikan AI melalui server-side API.
13. Tambahkan RAG dan personalisasi hanya jika kebutuhan sudah jelas.

------------------------------------------------------------------------

## Lisensi

Tambahkan lisensi jika source code akan dibagikan atau digunakan pihak
lain. Jika project merupakan produk pribadi, sertakan keterangan hak
cipta dan aturan penggunaan konten yang sesuai.

------------------------------------------------------------------------

**Dibangun dengan React.js, Vite, Tailwind CSS, dan Motion for React.
Dirancang agar fitur AI dapat ditambahkan secara bertahap.**
