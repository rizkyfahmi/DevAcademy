export interface ExerciseQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ----------------------------------------------------------------------------
// HTML 3-Question Exercises
// ----------------------------------------------------------------------------
export const HTML_THREE_EXERCISES: Record<string, ExerciseQuestion[]> = {
  introduction: [
    {
      question: "Apa kepanjangan resmi dari singkatan HTML?",
      options: [
        "Hyper Text Markup Language",
        "Hyperlink Textual Modern Language",
        "Home Tool Markup Level",
        "High Technical Modern Language",
      ],
      correctIndex: 0,
      explanation: "HTML merupakan singkatan resmi dari Hyper Text Markup Language.",
    },
    {
      question: "Tag HTML manakah yang membungkus seluruh konten visual yang tampil di jendela browser?",
      options: [
        "<body>",
        "<head>",
        "<title>",
        "<meta>",
      ],
      correctIndex: 0,
      explanation: "Tag <body> mendefinisikan badan dokumen yang memuat seluruh konten yang terlihat oleh pengguna.",
    },
    {
      question: "Deklarasi manakah yang wajib ditulis di baris paling awal dokumen HTML5?",
      options: [
        "<!DOCTYPE html>",
        "<html version='5'>",
        "<?xml version='1.0'?>",
        "<doctype html5>",
      ],
      correctIndex: 0,
      explanation: "<!DOCTYPE html> memberitahu browser bahwa dokumen ini ditulis sesuai standar HTML5 modern.",
    },
  ],
  basic: [
    {
      question: "Tag heading manakah yang menghasilkan judul berukuran paling besar dan utama di HTML?",
      options: [
        "<h1>",
        "<h6>",
        "<heading>",
        "<head>",
      ],
      correctIndex: 0,
      explanation: "<h1> adalah heading tingkat pertama yang paling besar dan penting secara semantik.",
    },
    {
      question: "Tag apa yang digunakan untuk membuat sebuah paragraf teks baru di HTML?",
      options: [
        "<p>",
        "<paragraph>",
        "<text>",
        "<para>",
      ],
      correctIndex: 0,
      explanation: "<p> digunakan untuk mendefinisikan sebuah paragraf teks.",
    },
    {
      question: "Bagaimana cara membuat tautan (hyperlink) ke website lain di HTML?",
      options: [
        "<a href='https://example.com'>Tautan</a>",
        "<link src='https://example.com'>Tautan</link>",
        "<hyperlink to='https://example.com'>Tautan</hyperlink>",
        "<url link='https://example.com'>Tautan</url>",
      ],
      correctIndex: 0,
      explanation: "Tag <a> dengan atribut href digunakan untuk membuat hyperlink.",
    },
  ],
  elements: [
    {
      question: "Apa yang dimaksud dengan HTML Element secara utuh?",
      options: [
        "Mulai dari tag pembuka (start tag), konten, hingga tag penutup (end tag)",
        "Hanya nama tag di dalam kurung siku",
        "Teks konten tanpa tag",
        "Atribut tag saja",
      ],
      correctIndex: 0,
      explanation: "Sebuah elemen HTML mencakup tag pembuka, konten di dalamnya, dan tag penutup.",
    },
    {
      question: "Manakah di bawah ini yang merupakan contoh empty element (elemen tanpa tag penutup)?",
      options: [
        "<br>",
        "<p>",
        "<div>",
        "<h1>",
      ],
      correctIndex: 0,
      explanation: "<br> adalah empty element yang digunakan untuk ganti baris dan tidak memiliki tag penutup.",
    },
    {
      question: "Apakah tag HTML bersifat case-sensitive menurut rekomendasi standar W3C?",
      options: [
        "Tidak, namun W3C sangat merekomendasikan huruf kecil (lowercase)",
        "Ya, wajib huruf kapital",
        "Ya, wajib huruf kecil",
        "Tergantung browser klien",
      ],
      correctIndex: 0,
      explanation: "W3C merekomendasikan lowercase untuk HTML dan menjadikannya standar baku pada industri modern.",
    },
  ],
  attributes: [
    {
      question: "Di bagian mana atribut HTML selalu disematkan?",
      options: [
        "Di dalam start tag (tag pembuka)",
        "Di dalam end tag (tag penutup)",
        "Di antara tag pembuka dan penutup",
        "Di file CSS terpisah",
      ],
      correctIndex: 0,
      explanation: "Atribut selalu diletakkan pada start tag (tag pembuka) elemen HTML.",
    },
    {
      question: "Atribut manakah yang wajib ada pada tag <img> untuk memberikan teks alternatif jika gambar gagal dimuat?",
      options: [
        "alt",
        "title",
        "caption",
        "desc",
      ],
      correctIndex: 0,
      explanation: "Atribut alt menyediakan teks alternatif yang sangat penting untuk aksesibilitas dan pembaca layar.",
    },
    {
      question: "Atribut href pada tag <a> digunakan untuk?",
      options: [
        "Menentukan alamat URL tujuan tautan",
        "Menentukan warna teks tautan",
        "Menentukan font tautan",
        "Menyimpan nama pembuat tautan",
      ],
      correctIndex: 0,
      explanation: "href (Hypertext Reference) menentukan URL halaman atau sumber daya yang dituju saat tautan diklik.",
    },
  ],
  headings: [
    {
      question: "Berapa banyak level heading bawaan yang disediakan oleh HTML?",
      options: [
        "6 level (h1 sampai h6)",
        "4 level (h1 sampai h4)",
        "8 level (h1 sampai h8)",
        "10 level (h1 sampai h10)",
      ],
      correctIndex: 0,
      explanation: "HTML mendefinisikan 6 level heading, mulai dari <h1> (paling penting) hingga <h6> (paling kecil).",
    },
    {
      question: "Berapa jumlah tag <h1> yang idealnya digunakan per halaman web demi praktik SEO terbaik?",
      options: [
        "Tepat 1 tag <h1> per halaman",
        "Minimal 5 tag <h1>",
        "Bebas sebanyak mungkin",
        "Tidak boleh ada <h1>",
      ],
      correctIndex: 0,
      explanation: "Standar SEO merekomendasikan satu <h1> sebagai judul utama halaman web.",
    },
    {
      question: "Heading level manakah yang memiliki ukuran teks default paling kecil di browser?",
      options: [
        "<h6>",
        "<h1>",
        "<h3>",
        "<h8>",
      ],
      correctIndex: 0,
      explanation: "<h6> adalah heading terkecil di HTML.",
    },
  ],
  paragraphs: [
    {
      question: "Perilaku default apakah yang diterapkan browser pada elemen <p>?",
      options: [
        "Menambahkan margin atas dan bawah secara otomatis",
        "Membuat teks menjadi cetak miring",
        "Menghapus semua spasi",
        "Membuat teks menjadi tebal",
      ],
      correctIndex: 0,
      explanation: "Browser secara otomatis menambahkan ruang margin sebelum dan sesudah setiap elemen <p>.",
    },
    {
      question: "Tag apa yang digunakan untuk membuat baris baru di dalam sebuah paragraf tanpa membuat paragraf baru?",
      options: [
        "<br>",
        "<hr>",
        "<break>",
        "<p>",
      ],
      correctIndex: 0,
      explanation: "Tag <br> menyisipkan line break (ganti baris tunggal).",
    },
    {
      question: "Elemen apa yang digunakan untuk menampilkan teks yang mempertahankan spasi dan baris baru apa adanya?",
      options: [
        "<pre>",
        "<code>",
        "<p>",
        "<samp>",
      ],
      correctIndex: 0,
      explanation: "Elemen <pre> menampilkan teks preformatted dengan font monospace dan spasi yang dipertahankan.",
    },
  ],
  styles: [
    {
      question: "Atribut apa yang digunakan untuk menyematkan inline style CSS langsung ke dalam elemen HTML?",
      options: [
        "style",
        "css",
        "class",
        "styles",
      ],
      correctIndex: 0,
      explanation: "Atribut style digunakan untuk menambahkan properti CSS inline langsung ke tag HTML.",
    },
    {
      question: "Properti CSS apa yang digunakan untuk mengubah warna teks pada elemen?",
      options: [
        "color",
        "text-color",
        "font-color",
        "bg-color",
      ],
      correctIndex: 0,
      explanation: "Properti 'color' digunakan untuk menentukan warna teks di CSS/HTML.",
    },
    {
      question: "Properti CSS apa yang digunakan untuk mengubah warna latar belakang elemen?",
      options: [
        "background-color",
        "color-fill",
        "bgcolor",
        "canvas-color",
      ],
      correctIndex: 0,
      explanation: "'background-color' adalah properti standar untuk warna latar.",
    },
  ],
  tables: [
    {
      question: "Tag apa yang mendefinisikan baris tabel di HTML?",
      options: [
        "<tr>",
        "<td>",
        "<th>",
        "<table>",
      ],
      correctIndex: 0,
      explanation: "<tr> merupakan singkatan dari 'table row'.",
    },
    {
      question: "Tag apa yang mendefinisikan sel data standar dalam tabel HTML?",
      options: [
        "<td>",
        "<th>",
        "<tr>",
        "<cell>",
      ],
      correctIndex: 0,
      explanation: "<td> merupakan singkatan dari 'table data'.",
    },
    {
      question: "Atribut apa yang digunakan untuk menggabungkan sel tabel secara vertikal (melewati beberapa baris)?",
      options: [
        "rowspan",
        "colspan",
        "span",
        "merge-rows",
      ],
      correctIndex: 0,
      explanation: "rowspan menentukan berapa banyak baris yang direntang oleh suatu sel.",
    },
  ],
  forms: [
    {
      question: "Elemen utama apa yang digunakan untuk membuat formulir interaktif di web?",
      options: [
        "<form>",
        "<input>",
        "<fieldset>",
        "<submit>",
      ],
      correctIndex: 0,
      explanation: "Elemen <form> membungkus semua elemen input dan kontrol formulir.",
    },
    {
      question: "Atribut apa pada <input> yang menentukan jenis data yang akan dimasukkan pengguna?",
      options: [
        "type",
        "name",
        "value",
        "role",
      ],
      correctIndex: 0,
      explanation: "Atribut type (seperti text, password, email, checkbox) menentukan format input.",
    },
    {
      question: "Metode pengiriman formulir mana yang menyertakan data input di dalam body request HTTP?",
      options: [
        "POST",
        "GET",
        "HEAD",
        "PUT",
      ],
      correctIndex: 0,
      explanation: "Metode POST mengirimkan data form di dalam body HTTP sehingga lebih aman untuk data rahasia.",
    },
  ],
};

// ----------------------------------------------------------------------------
// CSS 3-Question Exercises
// ----------------------------------------------------------------------------
export const CSS_THREE_EXERCISES: Record<string, ExerciseQuestion[]> = {
  introduction: [
    {
      question: "Apa kepanjangan resmi dari singkatan CSS?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Style Sheets",
        "Colorful Style Selector",
      ],
      correctIndex: 0,
      explanation: "CSS merupakan singkatan resmi dari Cascading Style Sheets.",
    },
    {
      question: "Di dalam bagian HTML manakah tag <style> biasanya ditempatkan?",
      options: [
        "Di dalam bagian <head>",
        "Di dalam bagian <footer>",
        "Di luar tag <html>",
        "Di baris paling akhir file",
      ],
      correctIndex: 0,
      explanation: "Tag <style> untuk internal CSS diletakkan di dalam bagian <head> halaman web.",
    },
    {
      question: "Tag HTML manakah yang digunakan untuk menautkan file CSS eksternal?",
      options: [
        "<link rel='stylesheet' href='style.css'>",
        "<style src='style.css'>",
        "<stylesheet>style.css</stylesheet>",
        "<css href='style.css'>",
      ],
      correctIndex: 0,
      explanation: "Tag <link rel='stylesheet' href='...'> adalah cara standar memuat CSS eksternal.",
    },
  ],
  selectors: [
    {
      question: "Simbol apakah yang digunakan untuk memilih elemen berdasarkan ID di CSS?",
      options: [
        "# (tanda pagar / hash)",
        ". (tanda titik / dot)",
        "* (tanda bintang / asterisk)",
        "> (tanda panah / child)",
      ],
      correctIndex: 0,
      explanation: "Tanda pagar (#) digunakan untuk memilih elemen dengan ID tertentu di CSS.",
    },
    {
      question: "Simbol apakah yang digunakan untuk memilih elemen berdasarkan Class di CSS?",
      options: [
        ". (tanda titik / dot)",
        "# (tanda pagar / hash)",
        ": (titik dua / pseudo)",
        "& (ampersand)",
      ],
      correctIndex: 0,
      explanation: "Tanda titik (.) digunakan untuk memilih elemen dengan class tertentu di CSS.",
    },
    {
      question: "Bagaimana cara memilih semua elemen <p> yang berada di dalam elemen <div>?",
      options: [
        "div p",
        "div.p",
        "div + p",
        "div:p",
      ],
      correctIndex: 0,
      explanation: "'div p' adalah descendant selector yang memilih seluruh elemen p di dalam div.",
    },
  ],
  "box-model": [
    {
      question: "Sebutkan urutan lapisan CSS Box Model dari lapisan paling dalam ke paling luar!",
      options: [
        "Content -> Padding -> Border -> Margin",
        "Margin -> Border -> Padding -> Content",
        "Content -> Border -> Padding -> Margin",
        "Padding -> Content -> Margin -> Border",
      ],
      correctIndex: 0,
      explanation: "CSS Box Model terdiri dari Content di tengah, dilapisi Padding, lalu Border, dan paling luar Margin.",
    },
    {
      question: "Lapisan Box Model manakah yang transparan dan berada di luar border elemen?",
      options: [
        "Margin",
        "Padding",
        "Border",
        "Content",
      ],
      correctIndex: 0,
      explanation: "Margin memberikan jarak di sekeliling luar border elemen dan selalu bersifat transparan.",
    },
    {
      question: "Nilai properti box-sizing apa yang membuat padding dan border dihitung ke dalam total width elemen?",
      options: [
        "border-box",
        "content-box",
        "initial",
        "inherit",
      ],
      correctIndex: 0,
      explanation: "'box-sizing: border-box' memastikan padding dan border tidak menambah ukuran lebar elemen.",
    },
  ],
};

// ----------------------------------------------------------------------------
// JS 3-Question Exercises
// ----------------------------------------------------------------------------
export const JS_THREE_EXERCISES: Record<string, ExerciseQuestion[]> = {
  introduction: [
    {
      question: "Tag HTML manakah yang digunakan untuk menulis atau menyematkan kode JavaScript?",
      options: [
        "<script>",
        "<javascript>",
        "<js>",
        "<scripting>",
      ],
      correctIndex: 0,
      explanation: "Kode JavaScript di dalam HTML disematkan di antara tag <script> dan </script>.",
    },
    {
      question: "Metode JavaScript bawaan manakah yang paling sering digunakan untuk mencetak log ke konsol browser?",
      options: [
        "console.log()",
        "print()",
        "document.echo()",
        "system.out()",
      ],
      correctIndex: 0,
      explanation: "console.log() menulis pesan atau data ke konsol browser untuk keperluan debugging.",
    },
    {
      question: "Keyword ES6 manakah yang digunakan untuk mendeklarasikan variabel yang nilainya tidak dapat diubah (konstan)?",
      options: [
        "const",
        "let",
        "var",
        "final",
      ],
      correctIndex: 0,
      explanation: "Keyword 'const' mendefinisikan referensi variabel yang bersifat konstan (read-only).",
    },
  ],
  variables: [
    {
      question: "Manakah perbedaan utama antara keyword 'let' dan 'var' di JavaScript?",
      options: [
        "let memiliki block scope, sedangkan var memiliki function scope",
        "var memiliki block scope, sedangkan let memiliki global scope",
        "let tidak dapat diubah nilainya sama sekali",
        "var tidak mendukung tipe data string",
      ],
      correctIndex: 0,
      explanation: "'let' memiliki cakupan blok (block-scoped), mencegah bug kebocoran variabel yang sering terjadi pada 'var'.",
    },
    {
      question: "Manakah di bawah ini yang merupakan nama variabel JavaScript yang valid?",
      options: [
        "_totalScore",
        "2ndPlayer",
        "user-name",
        "var",
      ],
      correctIndex: 0,
      explanation: "Nama variabel di JS dapat diawali dengan huruf, tanda dolar ($), atau garis bawah (_), namun tidak boleh angka atau tanda hubung.",
    },
    {
      question: "Apa nilai bawaan (default value) dari variabel yang dideklarasikan dengan 'let' tanpa diisi nilai?",
      options: [
        "undefined",
        "null",
        "0",
        "false",
      ],
      correctIndex: 0,
      explanation: "Variabel yang baru dideklarasikan tanpa inisialisasi nilai akan memiliki nilai 'undefined'.",
    },
  ],
};

// ----------------------------------------------------------------------------
// Python 3-Question Exercises
// ----------------------------------------------------------------------------
export const PYTHON_THREE_EXERCISES: Record<string, ExerciseQuestion[]> = {
  introduction: [
    {
      question: "Fungsi bawaan Python manakah yang digunakan untuk mencetak teks atau nilai ke layar/terminal?",
      options: [
        "print()",
        "echo()",
        "Console.WriteLine()",
        "printf()",
      ],
      correctIndex: 0,
      explanation: "Fungsi print() digunakan untuk menampilkan output ke konsol di Python.",
    },
    {
      question: "Apa yang digunakan bahasa Python untuk menentukan cakupan (scope) blok kode seperti loop atau function?",
      options: [
        "Indentasi (spasi/tab)",
        "Kurung kurawal {}",
        "Titik koma ;",
        "Keyword BEGIN / END",
      ],
      correctIndex: 0,
      explanation: "Python menggunakan indentasi (spasi konsisten) untuk mendefinisikan blok struktur kode.",
    },
    {
      question: "Karakter apakah yang digunakan untuk menulis komentar satu baris di Python?",
      options: [
        "# (tanda pagar / hash)",
        "// (garis miring ganda)",
        "/* (blok komentar)",
        "-- (strip ganda)",
      ],
      correctIndex: 0,
      explanation: "Tanda pagar (#) menandai awal komentar satu baris di Python.",
    },
  ],
};

// ----------------------------------------------------------------------------
// SQL 3-Question Exercises
// ----------------------------------------------------------------------------
export const SQL_THREE_EXERCISES: Record<string, ExerciseQuestion[]> = {
  introduction: [
    {
      question: "Apa kepanjangan resmi dari singkatan SQL?",
      options: [
        "Structured Query Language",
        "Sequential Question Language",
        "Strong Query Logic",
        "Standard Quick Link",
      ],
      correctIndex: 0,
      explanation: "SQL merupakan singkatan dari Structured Query Language.",
    },
    {
      question: "Kueri SQL manakah yang digunakan untuk mengambil data dari tabel basis data?",
      options: [
        "SELECT",
        "EXTRACT",
        "GET",
        "OPEN",
      ],
      correctIndex: 0,
      explanation: "Perintah SELECT digunakan untuk memilih dan mengambil data dari database.",
    },
    {
      question: "Klausa SQL manakah yang digunakan untuk menyaring baris berdasarkan kondisi tertentu?",
      options: [
        "WHERE",
        "FILTER",
        "HAVING",
        "SEARCH",
      ],
      correctIndex: 0,
      explanation: "Klausa WHERE digunakan untuk memfilter baris data yang memenuhi kondisi yang ditentukan.",
    },
  ],
};

// ----------------------------------------------------------------------------
// Intelligent Universal Fallback Generator (Ensures 3 distinct questions for ANY chapter)
// ----------------------------------------------------------------------------
export function generateThreeExercises(
  tech: string,
  chapterSlug: string,
  chapterTitle?: string
): ExerciseQuestion[] {
  const normTech = (tech || "HTML").toUpperCase();
  const cleanTitle = chapterTitle || chapterSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return [
    {
      question: `Apa fungsi dan peran fundamental dari materi ${cleanTitle} dalam ${normTech}?`,
      options: [
        `Menerapkan fitur dan standar resmi ${cleanTitle} pada pengembangan ${normTech}`,
        `Menonaktifkan eksekusi runtime pada compiler ${normTech}`,
        `Menggantikan seluruh dependensi internal dan arsitektur ${normTech}`,
        `Menghapus proses validasi tipe data secara permanen`,
      ],
      correctIndex: 0,
      explanation: `${cleanTitle} adalah konsep resmi pada ${normTech} yang dirancang untuk membangun aplikasi yang terstruktur dan sesuai standar industri.`,
    },
    {
      question: `Manakah kaidah penulisan atau sintaks yang tepat saat mengimplementasikan ${cleanTitle}?`,
      options: [
        `Mengikuti konvensi penamaan dan sintaks baku yang diatur dalam dokumentasi resmi ${normTech}`,
        `Menuliskan kode tanpa parameter atau blok penutup apapun`,
        `Menggabungkan sintaks bahasa lain yang tidak didukung runtime ${normTech}`,
        `Mendeklarasikan identifier dengan karakter terlarang`,
      ],
      correctIndex: 0,
      explanation: `Mengikuti konvensi resmi ${normTech} untuk ${cleanTitle} memastikan kode dapat dieksekusi dengan andal tanpa runtime error.`,
    },
    {
      question: `Praktik terbaik (best practice) apa yang disarankan saat bekerja dengan ${cleanTitle}?`,
      options: [
        `Menjaga kode tetap bersih, modular, teruji, dan mudah dipahami rekan pengembang`,
        `Menulis seluruh logika dalam satu baris panjang tanpa dokumentasi`,
        `Mengabaikan penanganan kesalahan (error handling)`,
        `Menonaktifkan optimasi performa dan memori aplikasi`,
      ],
      correctIndex: 0,
      explanation: `Kode yang modular, bersih, dan mematuhi best practice ${normTech} menjamin skalabilitas dan kemudahan pemeliharaan jangka panjang.`,
    },
  ];
}

// ----------------------------------------------------------------------------
// Master Dispatcher: Always returns exactly 3 questions
// ----------------------------------------------------------------------------
export function getThreeExercisesForChapter(
  tech: string,
  chapterSlug: string,
  chapterTitle?: string
): ExerciseQuestion[] {
  const norm = (tech || "HTML").toUpperCase();
  const slug = (chapterSlug || "introduction").toLowerCase();

  let questions: ExerciseQuestion[] | undefined;

  if (norm === "HTML" && HTML_THREE_EXERCISES[slug]) {
    questions = HTML_THREE_EXERCISES[slug];
  } else if (norm === "CSS" && CSS_THREE_EXERCISES[slug]) {
    questions = CSS_THREE_EXERCISES[slug];
  } else if (norm === "JAVASCRIPT" && JS_THREE_EXERCISES[slug]) {
    questions = JS_THREE_EXERCISES[slug];
  } else if (norm === "PYTHON" && PYTHON_THREE_EXERCISES[slug]) {
    questions = PYTHON_THREE_EXERCISES[slug];
  } else if (norm === "SQL" && SQL_THREE_EXERCISES[slug]) {
    questions = SQL_THREE_EXERCISES[slug];
  }

  if (questions && questions.length === 3) {
    return questions;
  }

  return generateThreeExercises(tech, chapterSlug, chapterTitle);
}
