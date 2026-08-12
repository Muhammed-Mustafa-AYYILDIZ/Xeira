/**
 * OUR MEMORY BOX - DATA CONFIGURATION
 * Burada yer alan verileri gerçek anılar, fotoğraflar ve notlarla güncelleyebilirsin.
 */

const data = {
    photos: [
        {
            image: "assets/images/placeholder.jpg",
            title: "İlk Fotoğrafımız",
            date: "2025",
            description: "ADD DESCRIPTION"
        },
        {
            image: "assets/images/placeholder.jpg",
            title: "Gülümseme",
            date: "2025",
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
            ]
        },
        {
            year: "2026",
            events: [
                { title: "Project Xeira", desc: "Building something special together." },
                { title: "First Anniversary", desc: "August 2026" }
            ]
        }
    ],

    memories: [
        {
            text: "\"Buraya daha sonra gerçek bir anı gelecek. Küçük bir mesaj veya komik bir detay.\"",
            date: "2025"
        },
        {
            text: "\"ADD MEMORY\"",
            date: "2026"
        }
    ],

    letter: `
        <p class="date-text" style="text-align:right;">August 2026</p>
        <br>
        <p>Değerli Gül,</p>
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
    setupWelcomeScreen();
    setupNavigation();
    setupMusic();
    setupLightbox();
    setupLetter();
    
    // Verileri DOM'a render et
    renderPhotos();
    renderPlaces();
    renderTimeline();
    renderMemories();
}

// 1. Karşılama Ekranı Geçişi
function setupWelcomeScreen() {
    const btn = document.getElementById("open-box-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");

    btn.addEventListener("click", () => {
        welcomeScreen.classList.remove("active");
        setTimeout(() => {
            mainContent.classList.remove("hidden");
        }, 1000); // CSS transition süresi ile uyumlu
    });
}

// 2. Navigasyon (Tab) Mantığı
function setupNavigation() {
    const navBtns = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Aktif buton stilini değiştir
            navBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Bölümleri değiştir
            const target = btn.getAttribute("data-target");
            sections.forEach(sec => {
                if(sec.id === target) {
                    sec.classList.add("active");
                } else {
                    sec.classList.remove("active");
                }
            });
        });
    });
}

// 3. Müzik Oynatıcı
function setupMusic() {
    const btn = document.getElementById("music-toggle");
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("music-icon");
    let isPlaying = false;

    btn.addEventListener("click", () => {
        if (!audio.src || audio.src.includes("null")) return; // Dosya yoksa hata verme
        
        if (isPlaying) {
            audio.pause();
            icon.textContent = "♫";
            btn.style.opacity = "0.7";
        } else {
            audio.play().catch(e => console.log("Müzik dosyası bulunamadı."));
            icon.textContent = "ılılı";
            btn.style.opacity = "1";
        }
        isPlaying = !isPlaying;
    });
}

// 4. Render Fonksiyonları (HTML'e veri basma)
function renderPhotos() {
    const container = document.getElementById("photo-container");
    data.photos.forEach((photo, index) => {
        const card = document.createElement("div");
        card.className = "photo-card";
        card.innerHTML = `<img src="${photo.image}" alt="${photo.title}" loading="lazy">`;
        
        card.addEventListener("click", () => openLightbox(photo));
        container.appendChild(card);
    });
}

function renderPlaces() {
    const container = document.getElementById("places-container");
    data.places.forEach(place => {
        const card = document.createElement("div");
        card.className = "place-card";
        card.innerHTML = `
            <div class="place-info">
                <h3>${place.name}</h3>
                <p class="date-text">${place.subtitle}</p>
                <p style="margin-top:1rem; font-size:0.9rem; color:#555;">${place.description}</p>
            </div>
            <div style="flex:1;">
                <img src="${place.image}" style="width:100%; height:200px; object-fit:cover;" loading="lazy" alt="${place.name}">
            </div>
        `;
        container.appendChild(card);
    });
}

function renderTimeline() {
    const container = document.getElementById("timeline-container");
    data.timeline.forEach(group => {
        const yearBlock = document.createElement("div");
        yearBlock.innerHTML = `<h3 class="serif-title" style="margin: 2rem 0 1rem -35px; background:var(--bg-color); display:inline-block; padding-right:10px;">${group.year}</h3>`;
        container.appendChild(yearBlock);

        group.events.forEach(ev => {
            const item = document.createElement("div");
            item.className = "timeline-item";
            item.innerHTML = `
                <h4 style="margin-bottom:0.3rem;">${ev.title}</h4>
                <p style="font-size:0.9rem; color:#666;">${ev.desc}</p>
            `;
            container.appendChild(item);
        });
    });
}

function renderMemories() {
    const container = document.getElementById("memories-container");
    data.memories.forEach(mem => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.innerHTML = `
            <p>${mem.text}</p>
            <p class="date-text" style="margin-top:1rem; text-align:right;">— ${mem.date}</p>
        `;
        container.appendChild(card);
    });
}

// 5. Lightbox Mantığı
function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close-lightbox");
    
    closeBtn.addEventListener("click", () => lightbox.classList.add("hidden"));
    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox) lightbox.classList.add("hidden");
    });
}

function openLightbox(photo) {
    document.getElementById("lightbox-img").src = photo.image;
    document.getElementById("lightbox-title").textContent = photo.title;
    document.getElementById("lightbox-date").textContent = photo.date;
    document.getElementById("lightbox-desc").textContent = photo.description;
    
    document.getElementById("lightbox").classList.remove("hidden");
}

// 6. Zarf ve Mektup Mantığı
function setupLetter() {
    const envelope = document.getElementById("envelope");
    const letterContent = document.getElementById("letter-content");
    
    // Mektup içeriğini data'dan alıp yerleştir
    letterContent.innerHTML = data.letter;

    envelope.addEventListener("click", () => {
        envelope.style.display = "none";
        letterContent.classList.remove("hidden");
    });
}