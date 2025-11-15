# 🎮 Game 2048

Game puzzle klasik 2048 yang dibuat dengan HTML, CSS, dan JavaScript murni. Gabungkan tile dengan angka yang sama hingga mencapai 2048!

![2048 Game](https://img.shields.io/badge/Game-2048-orange)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Fitur

- 🎯 **Gameplay Klasik**: Grid 4x4 dengan mekanisme penggabungan tile yang sama
- 🎨 **Animasi Smooth**: CSS animations untuk pergerakan dan penggabungan tile
- 📱 **Mobile-Friendly**: Mendukung touch gestures (swipe) untuk perangkat mobile
- ⌨️ **Keyboard Support**: Kontrol menggunakan arrow keys untuk desktop
- 💾 **High Score**: Penyimpanan skor tertinggi menggunakan localStorage
- 📊 **Score Tracking**: Sistem scoring real-time dengan animasi
- 🏆 **Win/Lose Detection**: Deteksi otomatis kondisi menang (2048) dan game over
- 📐 **Responsive Design**: Tampilan optimal di semua ukuran layar
- 🌈 **UI Modern**: Desain yang menarik dengan gradient background
- 🇮🇩 **Bahasa Indonesia**: Interface dalam Bahasa Indonesia

## 🎮 Cara Bermain

### Desktop
- Gunakan **tombol panah** (↑ ↓ ← →) pada keyboard untuk menggerakkan tile
- Tile dengan angka yang sama akan bergabung ketika bertabrakan
- Setiap gerakan akan menambahkan tile baru (2 atau 4) di posisi acak
- Tujuan: Gabungkan tile hingga mencapai **2048**!

### Mobile/Tablet
- **Swipe** ke atas, bawah, kiri, atau kanan untuk menggerakkan tile
- Gunakan tombol "Permainan Baru" untuk memulai game baru
- Interface touch-friendly dan responsive

## 🚀 Cara Menjalankan

### Metode 1: Langsung dari Browser
1. Clone repository ini:
   ```bash
   git clone https://github.com/rochiyat-bit/game-2048.git
   cd game-2048
   ```

2. Buka file `index.html` di browser favorit Anda

### Metode 2: Menggunakan Local Server
```bash
# Menggunakan Python 3
python -m http.server 8000

# Menggunakan Node.js (jika terinstall http-server)
npx http-server

# Menggunakan PHP
php -S localhost:8000
```

Kemudian buka browser dan akses `http://localhost:8000`

## 📁 Struktur File

```
game-2048/
│
├── index.html          # Struktur HTML utama
├── styles.css          # Styling dan animations
├── game.js            # Logika game dan event handlers
├── LICENSE            # Lisensi MIT
└── README.md          # Dokumentasi
```

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantic markup
- **CSS3**:
  - Flexbox untuk layout
  - CSS Grid untuk game grid
  - CSS Animations untuk efek visual
  - Media queries untuk responsive design
- **JavaScript (ES6)**:
  - Classes untuk struktur kode
  - Touch API untuk mobile support
  - localStorage API untuk persistensi data
  - Event handling untuk controls

## 🎯 Implementasi Teknis

### Animasi CSS
```css
@keyframes pop {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

### Touch Events
```javascript
gameContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

gameContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});
```

### localStorage untuk High Score
```javascript
saveBestScore() {
    localStorage.setItem('game2048-best-score', this.bestScore.toString());
}

loadBestScore() {
    const saved = localStorage.getItem('game2048-best-score');
    return saved ? parseInt(saved, 10) : 0;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: > 600px
- **Tablet**: 400px - 600px
- **Mobile**: < 400px

## 🎨 Color Scheme

| Tile Value | Background Color | Text Color |
|-----------|-----------------|------------|
| 2         | #eee4da        | #776e65    |
| 4         | #ede0c8        | #776e65    |
| 8         | #f2b179        | #f9f6f2    |
| 16        | #f59563        | #f9f6f2    |
| 32        | #f67c5f        | #f9f6f2    |
| 64        | #f65e3b        | #f9f6f2    |
| 128       | #edcf72        | #f9f6f2    |
| 256       | #edcc61        | #f9f6f2    |
| 512       | #edc850        | #f9f6f2    |
| 1024      | #edc53f        | #f9f6f2    |
| 2048      | #edc22e        | #f9f6f2    |

## 💡 Tips Bermain

1. **Jaga tile tertinggi di sudut** - Pilih satu sudut dan pertahankan tile dengan nilai tertinggi di sana
2. **Bangun secara berurutan** - Susun tile dari besar ke kecil menuju sudut
3. **Jangan terburu-buru** - Pikirkan beberapa langkah ke depan
4. **Hindari gerakan acak** - Fokus pada strategi yang konsisten
5. **Gunakan 2-3 arah saja** - Batasi gerakan untuk kontrol lebih baik

## 📝 Lisensi

Project ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Kontributor

Dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript murni.

## 🤝 Kontribusi

Kontribusi, issues, dan feature requests sangat diterima! Jangan ragu untuk check [issues page](https://github.com/rochiyat-bit/game-2048/issues).

## ⭐ Dukungan

Jika Anda menyukai project ini, berikan ⭐ di GitHub!

---

**Selamat Bermain! 🎮**
