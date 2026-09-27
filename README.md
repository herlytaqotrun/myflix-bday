# 🎬 AuliaFlix — Panduan Penggunaan

Website kejutan ulang tahun bergaya Netflix untuk **Mas Aulia Fauzia Rakhman** 💕  
Dibuat oleh: **Herlyta Qotrun Nada**

---

## 📂 Struktur Folder

```
birthday-aulia/
├── index.html          ← Halaman utama (Netflix-style)
├── our-story.html      ← Halaman cinematic "Our Story"
├── style.css           ← Style halaman utama
├── story.css           ← Style halaman Our Story
├── script.js           ← JS halaman utama
├── story.js            ← JS halaman Our Story
└── assets/
    ├── videos/
    │   ├── trailer.mp4       ← Video pendek hero background (~30 detik)
    │   └── full-video.mp4    ← Video lengkap (klik Play di hero)
    ├── photos/
    │   ├── photo1.jpg        ← Row "Momen Terbaik" (photo1-photo8.jpg)
    │   ├── adventure1.jpg    ← Row "Petualangan" (adventure1-adventure6.jpg)
    │   └── story1.jpg        ← Halaman Our Story (story1-story6.jpg)
    └── audio/
        └── our-song.mp3      ← Lagu di halaman Our Story (opsional)
```

---

## 🖼️ Cara Menambahkan Foto

### Halaman Utama (index.html)
Simpan foto kamu di `assets/photos/` dengan nama:
- `photo1.jpg` s/d `photo8.jpg` → Row "Momen Terbaik Kita"
- `adventure1.jpg` s/d `adventure6.jpg` → Row "Petualangan Kita"

Untuk mengubah **caption** foto, buka `index.html` dan cari:
```html
data-caption="Ganti dengan caption foto 1 💕"
```
Ubah teks di dalam tanda kutip sesuai keinginanmu.

### Halaman Our Story (our-story.html)
Simpan foto di `assets/photos/` dengan nama:
- `story1.jpg` s/d `story6.jpg` → Slide 1-6 halaman cinematic

Untuk mengubah judul, quote, dan caption tiap slide, buka `our-story.html` dan edit:
```html
<h2 class="slide-title">Judul Slide</h2>
<p class="slide-quote">"Quote romantismu di sini..."</p>
<p class="slide-caption">Caption penjelasan di sini.</p>
```

---

## 🎬 Cara Menambahkan Video

Simpan di `assets/videos/`:
- **trailer.mp4** → Video pendek (~30 detik) sebagai background hero yang autoplay
- **full-video.mp4** → Video lengkap yang diputar saat klik tombol Play

> **Tip:** Kompres video dulu agar loading lebih cepat. Gunakan aplikasi HandBrake (gratis).

---

## 🎵 Cara Menambahkan Musik

Simpan lagu favorit kalian di `assets/audio/our-song.mp3`  
Tekan tombol 🎵 di halaman Our Story untuk memutar/mematikan musik.

---

## 🌐 Cara Membuka Website

Cukup **double-click** file `index.html` untuk membukanya di browser.

> **Tips terbaik:** Gunakan Google Chrome atau Firefox untuk pengalaman terlengkap.  
> Jika ingin dibagikan secara online, upload ke Netlify Drop (netlify.com/drop) secara gratis!

---

## ✨ Fitur Website

| Fitur | Keterangan |
|-------|-----------|
| 🎬 Hero Video | Background trailer otomatis, gradient fallback jika tidak ada video |
| ▶ Tombol Play | Membuka video lengkap di modal fullscreen |
| 📖 Our Story | Halaman sinematik foto + teks romantis dari bawah |
| 🎂 Countdown | Hitung mundur real-time menuju 28 September 2026 |
| 🎊 Confetti | Animasi confetti otomatis saat halaman dibuka |
| 💝 30 Alasan | 30 kartu berisi hal-hal yang kamu suka dari Mas Aulia |
| 🖼️ Lightbox | Klik foto untuk melihat fullscreen + caption |
| 🎵 Musik | Tombol play/pause musik di halaman Our Story |
| ⏸ Auto-slide | Slide otomatis setiap 6 detik di halaman Our Story |
| 📱 Responsive | Tampil bagus di HP, tablet, dan laptop |

---

Semoga Mas Aulia suka dan terharu! 💕
