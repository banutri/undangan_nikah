document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-invitation");
    const cover = document.getElementById("cover");
    const mainContent = document.getElementById("main-content");

    // 1. DYNAMIC COLOR SCHEME & URL PARAMS
    const urlParams = new URLSearchParams(window.location.search);
    
    // Nama Tamu (?to=Nama)
    const guestName = urlParams.get("to");
    if (guestName) {
        document.getElementById("guest-name").textContent = decodeURIComponent(guestName);
    }

    // Preset Tema (?theme=emerald / ?theme=rose / ?theme=navy)
    const theme = urlParams.get("theme");
    if (theme) {
        document.body.classList.add(`theme-${theme}`);
    }

    // Custom Primary Color (?primary=ff5722)
    const customPrimary = urlParams.get("primary");
    const customHover = urlParams.get("hover");
    if (customPrimary) {
        setCustomTheme(`#${customPrimary}`, customHover ? `#${customHover}` : null);
    }

    // Buka Undangan
    openBtn.addEventListener("click", function () {
        cover.style.opacity = "0";
        setTimeout(() => {
            cover.style.display = "none";
            mainContent.classList.remove("hidden");
            // Scroll otomatis ke section pertama setelah cover ditutup
            mainContent.scrollTop = 0;
        }, 500);
    });

    // 2. GALLERY SLIDER AUTOMATION
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

    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
            resetAutoSlide();
        });
    });

    function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 3500); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

    startAutoSlide();
});

// Helper Functions
function setCustomTheme(primaryColor, hoverColor = null) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    if (hoverColor) root.style.setProperty('--primary-hover', hoverColor);
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Berhasil disalin ke clipboard!");
    }).catch(err => {
        console.error("Gagal menyalin: ", err);
    });
}