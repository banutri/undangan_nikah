document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-invitation");
    const cover = document.getElementById("cover");
    const mainContent = document.getElementById("main-content");

    // ==========================================
    // 1. DYNAMIC COLOR SCHEME & URL PARAMS
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    
    // Tangkap Nama Tamu (Contoh: ?to=Budi)
    const guestName = urlParams.get("to");
    if (guestName) {
        document.getElementById("guest-name").textContent = decodeURIComponent(guestName);
    }

    // Tangkap Preset Tema (Contoh: ?theme=emerald / ?theme=rose / ?theme=navy)
    const theme = urlParams.get("theme");
    if (theme) {
        document.body.classList.add(`theme-${theme}`);
    }

    // Tangkap Custom Hex Color langsung dari URL (Contoh: ?primary=ff5722&hover=e64a19)
    const customPrimary = urlParams.get("primary");
    const customHover = urlParams.get("hover");
    if (customPrimary) {
        setCustomTheme(`#${customPrimary}`, customHover ? `#${customHover}` : null);
    }

    // Action Buka Undangan
    openBtn.addEventListener("click", function () {
        cover.style.opacity = "0";
        setTimeout(() => {
            cover.style.display = "none";
            mainContent.classList.remove("hidden");
            window.scrollTo(0, 0);
        }, 500);
    });

    // ==========================================
    // 2. SLIDER / GALLERY (Auto Loop + Navigasi)
    // ==========================================
    const track = document.getElementById('sliderTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const dots = Array.from(dotsContainer.children);

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    function updateSlider(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider(currentIndex);
    }

    // Listener Tombol Manual
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Listener Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
            resetAutoSlide();
        });
    });

    // Auto Play Timer (Setiap 3.5 detik)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
});

// ==========================================
// 3. FUNGSI HELPER JAVASCRIPT
// ==========================================

// Helper Fungsi untuk Mengubah Warna Tema secara Dinamis via JavaScript
function setCustomTheme(primaryColor, hoverColor = null, lightColor = null) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    if (hoverColor) {
        root.style.setProperty('--primary-hover', hoverColor);
    }
    if (lightColor) {
        root.style.setProperty('--primary-light', lightColor);
    }
}

// Helper Salin Teks Rekening / Alamat
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Berhasil disalin ke clipboard!");
    }).catch(err => {
        console.error("Gagal menyalin teks: ", err);
    });
}