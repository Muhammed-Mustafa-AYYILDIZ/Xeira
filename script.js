/**
 * OUR MEMORY BOX - DATA CONFIGURATION
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
                { title: "First Meeting", desc: "ADD DESCRIPTION" },
                { title: "First Kiss", desc: "ADD DESCRIPTION" }
            ]
        },
        {
            year: "2026",
            events: [
                { title: "Giresun", desc: "ADD DESCRIPTION" },
                { title: "Izmir", desc: "ADD DESCRIPTION" },
                { title: "Antalya", desc: "ADD DESCRIPTION" },
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

/**
 * CORE LOGIC & UI MANAGEMENT
 */

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

// 1. Karşılama Ekranı Geçişi
function setupWelcomeScreen() {
    const btn = document.getElementById("open-box-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");

    btn.addEventListener("click", () => {
        welcomeScreen.classList.remove("active");
        welcomeScreen.setAttribute("aria-hidden", "true");
        
        setTimeout(() => {
            mainContent.classList.remove("hidden");
            mainContent.setAttribute("aria-hidden", "false");
            // Render sonrası scroll efekti tetiklemesi için
            setTimeout(handleScroll, 100); 
        }, 1000);
    });
}

// 2. Navigasyon
function setupNavigation() {
    const navBtns = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            navBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const target = btn.getAttribute("data-target");
            sections.forEach(sec => {
                if(sec.id === target) {
                    sec.classList.add("active");
                } else {
                    sec.classList.remove("active");
                }
            });
            // Yeni tab açıldığında animasyonları tetikle
            handleScroll();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// 3. Müzik Oynatıcı (ılılı kaldırıldı, ►/❚❚ mantığı)
function setupMusic() {
    const btn = document.getElementById("music-toggle");
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("music-icon");
    let isPlaying = false;

    btn.addEventListener("click", () => {
        if (!audio.src || audio.src.includes("null")) return; 
        
        if (isPlaying) {
            audio.pause();
            icon.textContent = "▶"; // Play icon
            btn.style.opacity = "0.7";
        } else {
            audio.play().catch(() => console.log("Müzik dosyası bulunamadı."));
            icon.textContent = "⏸"; // Pause icon
            btn.style.opacity = "1";
        }
        isPlaying = !isPlaying;
    });
}

// 4. Render Fonksiyonları
function renderPhotos() {
    const container = document.getElementById("photo-container");
    data.photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card fade-in-on-scroll";
        card.setAttribute("tabindex", "0"); // Klavye ile odaklanılabilir
        
        card.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay">
                <span class="overlay-title">${photo.title}</span>
                <span class="overlay-date">${photo.date}</span>
            </div>
        `;
        
        const openHandler = () => openLightbox(photo);
        card.addEventListener("click", openHandler);
        card.addEventListener("keypress", (e) => {
            if(e.key === "Enter") openHandler();
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

function renderTimeline() {
    const container = document.getElementById("timeline-container");
    data.timeline.forEach(group => {
        const yearBlock = document.createElement("div");
        yearBlock.className = "timeline-year-block fade-in-on-scroll";
        yearBlock.innerHTML = `<h3 class="timeline-year serif-title">${group.year}</h3>`;
        
        group.events.forEach(ev => {
            yearBlock.innerHTML += `
                <div class="timeline-item">
                    <h4>${ev.title}</h4>
                    <p>${ev.desc}</p>
                </div>
            `;
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

// 5. Lightbox Mantığı (ESC ile Kapatma eklendi)
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close-lightbox");
    
    const closeLightbox = () => {
        lightbox.classList.add("hidden");
        lightbox.setAttribute("aria-hidden", "true");
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if(e.target.classList.contains("lightbox-overlay")) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape" && !lightbox.classList.contains("hidden")) {
            closeLightbox();
        }
    });
}

function openLightbox(photo) {
    document.getElementById("lightbox-img").src = photo.image;
    document.getElementById("lightbox-img").alt = photo.title;
    document.getElementById("lightbox-title").textContent = photo.title;
    document.getElementById("lightbox-date").textContent = photo.date;
    document.getElementById("lightbox-desc").textContent = photo.description;
    
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
}

// 6. Zarf ve Mektup Mantığı (Gerçekçi Açılış Animasyonu)
function setupLetter() {
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const letterContent = document.getElementById("letter-content");
    
    letterContent.innerHTML = data.letter;

    envelopeWrapper.addEventListener("click", () => {
        if (!envelopeWrapper.classList.contains("open")) {
            envelopeWrapper.classList.add("open");
            // Zarf kapağı açıldıktan sonra içeriği göster
            setTimeout(() => {
                envelopeWrapper.style.display = "none";
                letterContent.classList.remove("hidden");
            }, 600);
        }
    });
}

// 7. Micro-Interactions (Scroll Reveal)
function setupScrollReveal() {
    window.addEventListener("scroll", handleScroll);
}

function handleScroll() {
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    const windowHeight = window.innerHeight;
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Elementin üst kısmı ekranın %90'ına geldiğinde görünür yap
        if (rect.top <= windowHeight * 0.9) {
            el.classList.add("is-visible");
        }
    });
}