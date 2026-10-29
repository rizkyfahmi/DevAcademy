const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const COURSES = [
  {
    slug: 'html',
    title: 'HTML Tutorial',
    description: 'Pelajari dasar-dasar HTML dari struktur tag, elemen semantic, hingga form dan media.',
    category: 'Frontend',
    icon: 'FileCode2',
    badge: 'Fundamental',
    lessons: [
      {
        slug: 'introduction',
        title: 'HTML Introduction',
        description: 'Pengenalan HTML, struktur dasar dokumen, dan cara kerja browser membaca HTML.',
        order: 1,
        language: 'html',
        starterCode: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Halaman Pertama Saya</title>\n  </head>\n  <body>\n    <h1>Selamat Datang di DevAcademy!</h1>\n    <p>Ini adalah paragraf pertama saya dalam belajar HTML.</p>\n  </body>\n</html>',
        content: 'HTML (HyperText Markup Language) adalah bahasa standar untuk membuat halaman web. HTML mendeskripsikan struktur halaman web secara semantik menggunakan markup elemen dan tag pembuka serta penutup.',
      },
      {
        slug: 'editors',
        title: 'HTML Editors',
        description: 'Mengenal editor kode terbaik untuk menulis HTML seperti VS Code.',
        order: 2,
        language: 'html',
        starterCode: '<h1>Halo Dunia!</h1>\n<p>Belajar HTML itu mudah dan menyenangkan.</p>',
        content: 'Untuk menulis HTML, Anda bisa menggunakan teks editor apa saja, dari Notepad sederhana hingga modern IDE seperti Visual Studio Code.',
      },
    ],
  },
  {
    slug: 'css',
    title: 'CSS Tutorial',
    description: 'Kuasai teknik styling web modern dengan CSS Flexbox, Grid, Responsive Design, dan Animasi.',
    category: 'Styling',
    icon: 'Palette',
    badge: 'Popular',
    lessons: [
      {
        slug: 'introduction',
        title: 'CSS Introduction',
        description: 'Pengenalan CSS untuk mendesain tampilan dan tata letak halaman web.',
        order: 1,
        language: 'css',
        starterCode: 'body {\n  background-color: #f0fdf4;\n  font-family: Arial, sans-serif;\n}\nh1 {\n  color: #16a34a;\n  text-align: center;\n}',
        content: 'CSS (Cascading Style Sheets) digunakan untuk mengatur gaya, tata letak, warna, font, dan animasi halaman web.',
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript Tutorial',
    description: 'Belajar logika pemrograman interaktif, manipulasi DOM, Fetch API, hingga Async/Await.',
    category: 'Programming',
    icon: 'Code2',
    badge: 'Essential',
    lessons: [
      {
        slug: 'introduction',
        title: 'JavaScript Introduction',
        description: 'Pengantar bahasa pemrograman web paling populer di dunia.',
        order: 1,
        language: 'javascript',
        starterCode: 'console.log("Halo dari DevAcademy!");\nconst nama = "Developer";\nconsole.log(`Selamat belajar, ${nama}!`);',
        content: 'JavaScript adalah bahasa pemrograman web yang memungkinkan interaktivitas dinamis pada halaman web.',
      },
    ],
  },
  {
    slug: 'python',
    title: 'Python Tutorial',
    description: 'Pelajari Python dari dasar sintaks, struktur data, fungsi, hingga automasi dan web backend.',
    category: 'Backend',
    icon: 'Terminal',
    badge: 'Trending',
    lessons: [
      {
        slug: 'introduction',
        title: 'Python Introduction',
        description: 'Mengenal bahasa pemrograman serbaguna dan ramah pemula.',
        order: 1,
        language: 'python',
        starterCode: 'print("Halo Dunia dari Python!")\nangka = [1, 2, 3, 4, 5]\nprint(f"Jumlah elemen: {len(angka)}")',
        content: 'Python adalah bahasa pemrograman tingkat tinggi yang mudah dibaca dan memiliki ekosistem sangat luas.',
      },
    ],
  },
  {
    slug: 'sql',
    title: 'SQL Tutorial',
    description: 'Kuasai query database relasional: SELECT, JOIN, GROUP BY, INSERT, UPDATE, dan INDEXING.',
    category: 'Database',
    icon: 'Database',
    badge: 'Data',
    lessons: [
      {
        slug: 'introduction',
        title: 'SQL Introduction',
        description: 'Memahami dasar database relasional dan Structured Query Language.',
        order: 1,
        language: 'sql',
        starterCode: 'SELECT id, title, category FROM courses WHERE category = "Frontend";',
        content: 'SQL (Structured Query Language) adalah bahasa standar untuk menyimpan, memanipulasi, dan mengambil data dari database relasional.',
      },
    ],
  },
];

async function seed() {
  console.log('🌱 Seeding courses and lessons to TiDB Cloud...');
  for (const c of COURSES) {
    const course = await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        description: c.description,
        category: c.category,
        icon: c.icon,
        badge: c.badge,
        lessonsCount: c.lessons.length,
      },
      create: {
        slug: c.slug,
        title: c.title,
        description: c.description,
        category: c.category,
        icon: c.icon,
        badge: c.badge,
        lessonsCount: c.lessons.length,
      },
    });

    for (const l of c.lessons) {
      await prisma.lesson.upsert({
        where: { slug: l.slug },
        update: {
          title: l.title,
          description: l.description,
          content: l.content,
          starterCode: l.starterCode,
          language: l.language,
          order: l.order,
          courseSlug: course.slug,
        },
        create: {
          slug: l.slug,
          title: l.title,
          description: l.description,
          content: l.content,
          starterCode: l.starterCode,
          language: l.language,
          order: l.order,
          courseSlug: course.slug,
        },
      });
    }
    console.log(`✅ Seeded course: ${c.title} (${c.lessons.length} lessons)`);
  }

  // Create default student user
  await prisma.user.upsert({
    where: { email: 'student@devacademy.id' },
    update: {},
    create: {
      email: 'student@devacademy.id',
      name: 'DevAcademy Student',
      role: 'STUDENT',
    },
  });
  console.log('✅ Seeded demo user: student@devacademy.id');

  console.log('🎉 Seeding to TiDB Cloud finished successfully!');
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Error seeding TiDB:', e);
    process.exit(1);
  });

