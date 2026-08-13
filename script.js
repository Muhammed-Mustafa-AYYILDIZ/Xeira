/**
 * OUR MEMORY BOX — DATA CONFIGURATION
 * Placeholder içerikler korundu. Gerçek içerikler buraya eklenecek.
 */

const data = {
    photos: [
        {
            image: "assets/images/placeholder.jpg",
            title: "ADD TITLE",
            date: "2025",
            description: "ADD DESCRIPTION"
        },
        {
            image: "assets/images/placeholder.jpg",
            title: "ADD TITLE",
            date: "2025",
            description: "ADD DESCRIPTION"
        },
        {
            image: "assets/images/placeholder.jpg",
            title: "ADD TITLE",
            date: "2026",
            description: "ADD DESCRIPTION"
        }
    ],

    places: [
        {
            id: "kirsehir",
            name: "KIRŞEHİR",
            subtitle: "Where it started.",
            date: "2025",
            description: "ADD DESCRIPTION",
            image: "assets/images/placeholder.jpg"
        },
        {
            id: "giresun",
            name: "GİRESUN",
            subtitle: "10+ days of us.",
            date: "2026",
            description: "ADD DESCRIPTION",
            image: "assets/images/placeholder.jpg"
        },
        {
            id: "izmir",
            name: "İZMİR",
            subtitle: "ADD SUBTITLE",
            date: "2026",
            description: "ADD DESCRIPTION",
            image: "assets/images/placeholder.jpg"
        },
        {
            id: "antalya",
            name: "ANTALYA",
            subtitle: "ADD SUBTITLE",
            date: "2026",
            description: "ADD DESCRIPTION",
            image: "assets/images/placeholder.jpg"
        }
    ],

    timeline: [
        {
            year: "2025",
            events: [
                { title: "First Conversation", desc: "ADD DESCRIPTION" },
                { title: "First Meeting",      desc: "ADD DESCRIPTION" },
                { title: "First Kiss",         desc: "ADD DESCRIPTION" }
            ]
        },
        {
            year: "2026",
            events: [
                { title: "Giresun",  desc: "ADD DESCRIPTION" },
                { title: "Izmir",    desc: "ADD DESCRIPTION" },
                { title: "Antalya",  desc: "ADD DESCRIPTION" },
                { title: "One Year", desc: "August 2026" }
            ]
        }
    ],

    memories: [
        {
            text: "\"Buraya daha sonra gerçek bir anı gelecek. Birlikte yaşadığımız sıradan ama güzel anlar.\"",
            date: "2025"
        },
        {
            text: "\"ADD MEMORY\"",
            date: "2026"
        },
        {
            text: "\"ADD MEMORY\"",
            date: "2026"
        }
    ],

    letter: `
        <p class="date-text" style="text-align:right;">August 2026</p>
        <br>
        <p>Gül,</p>
        <br>
        <p>[ YOUR LETTER GOES HERE ]</p>
        <br>
        <p>Sevgilerle...</p>
    `
};

/* =========================================================
   CORE LOGIC & UI MANAGEMENT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    renderPhotos();
    renderPlaces();
    renderTimeline();
    renderMemories();

    setupWelcomeScreen();
    setupNavigation();
    setupMusic();
    setupLightbox();
    setupLetter();
    setupScrollReveal();
}

/* ---------------------------------------------------------
   1. KARŞILAMA EKRANI
   --------------------------------------------------------- */
function setupWelcomeScreen() {
    const btn          = document.getElementById("open-box-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent  = document.getElementById("main-content");

    btn.addEventListener("click", () => {
        welcomeScreen.classList.remove("active");
        welcomeScreen.setAttribute("aria-hidden", "true");

        setTimeout(() => {
            mainContent.classList.remove("hidden");
            mainContent.setAttribute("aria-hidden", "false");
            setTimeout(handleScroll, 100);
        }, 1000);
    });
}

/* ---------------------------------------------------------
   2. NAVİGASYON
   --------------------------------------------------------- */
function setupNavigation() {
    const navBtns  = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            navBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const target = btn.getAttribute("data-target");
            sections.forEach(sec => {
                sec.classList.toggle("active", sec.id === target);
            });

            handleScroll();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}

/* ---------------------------------------------------------
   3. MÜZİK OYNATICI
   FIX: State sadece play() promise başarılı olduğunda güncellenir.
        Dosya bulunamazsa veya autoplay engellenirse ikon yanlış duruma geçmez.
   --------------------------------------------------------- */
function setupMusic() {
    const btn   = document.getElementById("music-toggle");
    const audio = document.getElementById("bg-music");
    const icon  = document.getElementById("music-icon");
    let isPlaying = false;

    btn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            icon.textContent = "▶";
            btn.setAttribute("aria-label", "Müziği Başlat");
            isPlaying = false;
        } else {
            audio.play()
                .then(() => {
                    icon.textContent = "⏸";
                    btn.setAttribute("aria-label", "Müziği Durdur");
                    isPlaying = true;
                })
                .catch(() => {
                    // Dosya bulunamadı veya çalınamadı — state değişmez, ikon ▶ kalır
                });
        }
    });
}

/* ---------------------------------------------------------
   4. RENDER FONKSİYONLARI
   --------------------------------------------------------- */
function renderPhotos() {
    const container = document.getElementById("photo-container");

    data.photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card fade-in-on-scroll";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Fotoğrafı büyüt: ${photo.title}`);

        card.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay" aria-hidden="true">
                <span class="overlay-title">${photo.title}</span>
                <span class="overlay-date">${photo.date}</span>
            </div>
        `;

        const openHandler = () => openLightbox(photo);
        card.addEventListener("click", openHandler);

        // FIX: keypress (deprecated) → keydown; Space key desteği eklendi
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openHandler();
            }
        });

        container.appendChild(card);
    });
}

function renderPlaces() {
    const container = document.getElementById("places-container");

    data.places.forEach(place => {
        const card = document.createElement("div");
        card.className = "place-card fade-in-on-scroll";
        card.innerHTML = `
            <div class="place-image-wrapper">
                <img src="${place.image}" loading="lazy" alt="${place.name}">
            </div>
            <div class="place-info">
                <h3 class="serif-title">${place.name}</h3>
                <p class="date-text">${place.subtitle}</p>
                <p class="place-desc">${place.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// FIX: innerHTML += yerine DOM metodları — daha güvenli ve tutarlı
function renderTimeline() {
    const container = document.getElementById("timeline-container");

    data.timeline.forEach(group => {
        const yearBlock = document.createElement("div");
        yearBlock.className = "timeline-year-block fade-in-on-scroll";

        const yearHeading = document.createElement("h3");
        yearHeading.className = "timeline-year serif-title";
        yearHeading.textContent = group.year;
        yearBlock.appendChild(yearHeading);

        group.events.forEach(ev => {
            const item = document.createElement("div");
            item.className = "timeline-item";
            item.innerHTML = `<h4>${ev.title}</h4><p>${ev.desc}</p>`;
            yearBlock.appendChild(item);
        });

        container.appendChild(yearBlock);
    });
}

function renderMemories() {
    const container = document.getElementById("memories-container");

    data.memories.forEach(mem => {
        const card = document.createElement("div");
        card.className = "memory-card fade-in-on-scroll";
        card.innerHTML = `
            <p class="memory-text">${mem.text}</p>
            <p class="date-text" style="text-align:right;">— ${mem.date}</p>
        `;
        container.appendChild(card);
    });
}

/* ---------------------------------------------------------
   5. LIGHTBOX
   FIX: Focus yönetimi eklendi.
        - Açılışta close button'a focus gider
        - Kapanışta tetikleyen elemana focus geri döner
   --------------------------------------------------------- */
let _lightboxTrigger = null;

function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close-lightbox");

    const closeLightbox = () => {
        lightbox.classList.add("hidden");
        lightbox.setAttribute("aria-hidden", "true");
        // Focus'u lightbox'ı açan elemana geri döndür
        if (_lightboxTrigger) {
            _lightboxTrigger.focus();
            _lightboxTrigger = null;
        }
    };

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target.classList.contains("lightbox-overlay")) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
            closeLightbox();
        }
    });
}

function openLightbox(photo) {
    _lightboxTrigger = document.activeElement;

    document.getElementById("lightbox-img").src         = photo.image;
    document.getElementById("lightbox-img").alt         = photo.title || "Anı Fotoğrafı";
    document.getElementById("lightbox-title").textContent = photo.title;
    document.getElementById("lightbox-date").textContent  = photo.date;
    document.getElementById("lightbox-desc").textContent  = photo.description;

    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");

    // FIX: Açılışta close button'a focus gider
    document.querySelector(".close-lightbox").focus();
}

/* ---------------------------------------------------------
   6. ZARF VE MEKTUP
   FIX: Enter / Space klavye desteği eklendi
        Açıldıktan sonra mektuba programatik focus gider
   --------------------------------------------------------- */
function setupLetter() {
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const letterContent   = document.getElementById("letter-content");

    letterContent.innerHTML = data.letter;

    const openEnvelope = () => {
        if (envelopeWrapper.classList.contains("open")) return;
        envelopeWrapper.classList.add("open");

        setTimeout(() => {
            envelopeWrapper.style.display = "none";
            letterContent.classList.remove("hidden");
            letterContent.focus(); // Odağı mektuba taşı
        }, 600);
    };

    envelopeWrapper.addEventListener("click", openEnvelope);

    // FIX: Klavye desteği — Enter veya Space ile zarfı aç
    envelopeWrapper.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openEnvelope();
        }
    });
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL
   FIX: prefers-reduced-motion kontrolü eklendi
        — motion azaltma tercih edilmişse tüm elemanlar anında görünür yapılır
        passive: true eklendi — scroll performansı iyileşir
   --------------------------------------------------------- */
function setupScrollReveal() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        document.querySelectorAll(".fade-in-on-scroll").forEach(el => {
            el.classList.add("is-visible");
        });
        return;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
}

function handleScroll() {
    const elements    = document.querySelectorAll(".fade-in-on-scroll");
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.9) {
            el.classList.add("is-visible");
        }
    });
}