# RYOKOU Front-end — berdasarkan screenshot Figma

## Halaman
- `login.html` — login admin, tampilkan sandi, lupa password
- `verify-email.html` — verifikasi email/username
- `reset-password.html` — buat dan konfirmasi password baru
- `register.html` — pendaftaran akun
- `dashboard.html` — dashboard admin dengan statistik, grafik, status unit, transaksi terbaru, dan aksi cepat

## File utama
- `auth.css` dan `auth.js` untuk halaman login, daftar, dan pemulihan sandi
- `dashboard.css` dan `dashboard.js` untuk dashboard admin
- `index.html`, `style.css`, `script.js`, dan `assets/` dari versi katalog rental motor sebelumnya

## Menjalankan
Buka folder ini di VS Code, lalu klik kanan file yang ingin dilihat dan pilih **Open with Live Server**. Bisa juga membuka HTML langsung melalui browser. Bootstrap Icons dan font Google membutuhkan koneksi internet.

## Catatan
Ini front-end demo. Data login, akun, email verifikasi, transaksi, dan password belum disimpan/diolah oleh backend atau database. Nilai dashboard dan harga merupakan data contoh. Screenshot yang diberikan menjadi acuan layout dan warna; tampilan dapat berbeda sedikit karena ukuran layar, font, dan browser.


## Halaman kelola motor (tambahan berdasarkan screenshot terbaru)
- `motor-list.html` — daftar 13 motor, foto, status, pencarian, filter status, dan tombol Detail.
- `add-motor.html` — form tambah motor, unggah foto dengan preview, merek, tipe, nomor polisi, tahun, harga per hari, dan status.
- `motor.css`, `motor-list.js`, `add-motor.css`, `add-motor.js` — styling dan interaksi halaman kelola motor.
