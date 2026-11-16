/* ==========================================================
   ADMIN: edit file ini saja untuk mengelola isi website.
   - href: isi dengan link web lain / halaman sendiri (contoh: 'https://webkamu.com' atau 'materi/matematika.html')
   - href kosong ('') = kartu tampil "Segera hadir" dan belum bisa diklik
   ========================================================== */
const OWNER='Bintang Satria';

const SUBJ=[
 {n:'Matematika',i:'123',href:''},
 {n:'Bahasa Indonesia',i:'Abc',href:''},
 {n:'Bahasa Inggris umum',i:'🗽',href:''},
 {n:'Sejarah',i:'⌛',href:''},
 {n:'Sejarah Tingkat Lanjut',i:'🗿',href:''},
 {n:'Biologi',i:'🦠',href:''},
 {n:'Informatika',i:'💻',href:''},
 {n:'Pendidikan Pancasila',i:'🇮🇩',href:''},
 {n:'Pendidikan Agama Islam',i:'🕋',href:''},
 {n:'PJOK',i:'💪',href:''},
 {n:'Seni Budaya',i:'🎨',href:''},
 {n:'PKWU',i:'💸',href:''},
 {n:'Bahasa Inggris Tingkat Lanjut',i:'🇺🇸',href:''}
];

const GAMES=[
 {n:'Kuis Pilihan Ganda',i:'?',href:''},
 {n:'Tebak Jawaban',i:'…',href:''},
 {n:'Flashcard',i:'▭',href:''},
 {n:'Tebak Tokoh Sejarah',i:'☺',href:''},
 {n:'Susun Urutan Peristiwa',i:'⇅',href:''},
 {n:'Tebak Istilah',i:'Ab',href:''},
 {n:'Memory Game',i:'▦',href:''}
];

/* Buku PDF: href = link langsung ke file PDF (bisa 'pdf/namafile.pdf' jika kamu taruh di folder pdf/, atau URL lain) */
const CATS=['Buku Pelajaran','Sejarah','Pengetahuan Umum','Pengembangan Diri','Referensi'];
const BOOKS=[
 {title:'Sejarah Indonesia',author:'Kemdikbud',cat:'Sejarah',href:''},
 {title:'Sejarah Lanjut',author:'Buku LKS bu esti',cat:'Buku LKS',href:'https://drive.google.com/file/d/1nNppiXPF-W8gqZuqNf-FiTx37w-s-kY6/view?usp=drivesdk'},
 {title:'Filsafat Ilmu',author:'Dr. J. Sudarminta',cat:'Referensi',href:''},
 {title:'Ensiklopedia Dunia',author:'Wikipedia',cat:'Pengetahuan Umum',href:''}
];
