// ============================================
//  JAVASCRIPT PROFESSIONNEL GEIGE
// ============================================

// ========== CONFIGURATION ========== //
const CONFIG = {
  heroTransitionDuration: 5000, // 5 secondes
  avisTransitionDuration: 10000, // 10 secondes
  scrollOffset: 320, // Pour le défilement des professeurs
  fadeOutDelay: 400 // Délai pour le fade out
};

// ========== IMAGES & CITATIONS HERO ========== //
const heroData = {
  images: [
    "./Img/fond2.jpg",
    "./Img/annie-spratt-QckxruozjRg-unsplash.jpg",
    "./Img/jakub-zerdzicki-U4-I4oH4xlg-unsplash.jpg",
    "./Img/bozhin-karaivanov-5z70PsbFCMM-unsplash.jpg",
    "./Img/img1.jpg",
    "./Img/img2.jpg",
    "./Img/img3.jpg"
  ],
  citations: [
    {
      texte: "L'éducation est l'arme la plus puissante qu'on puisse utiliser pour changer le monde.",
      auteur: "Nelson Mandela"
    },
    {
      texte: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.",
      auteur: "Winston Churchill"
    },
    {
      texte: "Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement.",
      auteur: "Martin Luther King Jr."
    },
    {
      texte: "Enseigner, ce n'est pas remplir un vase, c'est allumer un feu.",
      auteur: "Montaigne"
    },
    {
      texte: "L'éducation est ce qui reste après qu'on ait oublié ce qu'on a appris à l'école.",
      auteur: "Albert Einstein"
    },
    {
      texte: "Le but de l'éducation n'est pas d'accroître la quantité de connaissances, mais de créer les possibilités pour un enfant d'inventer et de découvrir.",
      auteur: "Jean Piaget"
    },
    {
      texte: "L'éducation est le développement progressif et harmonieux de toutes les facultés de l'homme.",
      auteur: "Adolphe Ferrière"
    }
  ]
};

// ========== NAVBAR SCROLL EFFECT ========== //
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Ajouter/retirer la classe 'scrolled' pour l'effet
  if (currentScrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
}, { passive: true });

// ========== HERO BACKGROUND CAROUSEL ========== //
class HeroCarousel {
  constructor() {
    this.bg1 = document.querySelector('.bg1');
    this.bg2 = document.querySelector('.bg2');
    this.citationEl = document.getElementById('citation');
    this.index = 0;
    this.activeBg = 1;
    
    this.init();
  }
  
  init() {
    // Initialiser la première image et citation
    this.bg1.style.backgroundImage = this.getBackgroundImage(0);
    this.updateCitation(0);
    
    // Démarrer le carousel
    setInterval(() => this.transition(), CONFIG.heroTransitionDuration);
  }
  
  getBackgroundImage(index) {
    return `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${heroData.images[index]}')`;
  }
  
  updateCitation(index) {
    const { texte, auteur } = heroData.citations[index];
    this.citationEl.innerHTML = `"${texte}" - <span id="auteur">${auteur}</span>`;
  }
  
  transition() {
    this.index = (this.index + 1) % heroData.images.length;
    
    const nextImage = this.getBackgroundImage(this.index);
    
    // Transition des images
    if (this.activeBg === 1) {
      this.bg2.style.backgroundImage = nextImage;
      this.bg2.style.opacity = 1;
      this.bg1.style.opacity = 0;
      this.activeBg = 2;
    } else {
      this.bg1.style.backgroundImage = nextImage;
      this.bg1.style.opacity = 1;
      this.bg2.style.opacity = 0;
      this.activeBg = 1;
    }
    
    // Transition du texte avec effet fade
    this.citationEl.style.opacity = 0;
    setTimeout(() => {
      this.updateCitation(this.index);
      this.citationEl.style.opacity = 1;
    }, 800);
  }
}

// Initialiser le carousel hero
const heroCarousel = new HeroCarousel();

// ========== SCROLL PROFESSEURS ========== //
class ProfesseursScroller {
  constructor() {
    this.container = document.getElementById('professeursContainer');
    this.leftBtn = document.getElementById('scrollLeft');
    this.rightBtn = document.getElementById('scrollRight');
    
    if (this.container && this.leftBtn && this.rightBtn) {
      this.init();
    }
  }
  
  init() {
    this.rightBtn.addEventListener('click', () => this.scrollRight());
    this.leftBtn.addEventListener('click', () => this.scrollLeft());
    
    // Ajouter un effet de hover sur les boutons
    [this.leftBtn, this.rightBtn].forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-50%) scale(1.15)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(-50%) scale(1)';
      });
    });
  }
  
  scrollRight() {
    this.container.scrollBy({
      left: CONFIG.scrollOffset,
      behavior: 'smooth'
    });
  }
  
  scrollLeft() {
    this.container.scrollBy({
      left: -CONFIG.scrollOffset,
      behavior: 'smooth'
    });
  }
}

// Initialiser le scroller des professeurs
const professeursScroller = new ProfesseursScroller();

// ========== CAROUSEL AVIS PARENTS ========== //
class AvisCarousel {
  constructor() {
    this.cards = Array.from(document.querySelectorAll('.avis-card'));
    this.indicatorsContainer = document.getElementById('avisIndicators');
    this.currentPage = 0;
    this.cardsPerPage = 3;
    this.totalPages = Math.ceil(this.cards.length / this.cardsPerPage);
    this.intervalId = null;
    
    if (this.cards.length > 0 && this.indicatorsContainer) {
      this.init();
    }
  }
  
  init() {
    this.createIndicators();
    this.startAutoPlay();
    this.addIndicatorClickHandlers();
  }
  
  createIndicators() {
    for (let i = 0; i < this.totalPages; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('avis-indicator');
      indicator.dataset.page = i;
      if (i === 0) indicator.classList.add('active');
      this.indicatorsContainer.appendChild(indicator);
    }
    this.indicators = document.querySelectorAll('.avis-indicator');
  }
  
  addIndicatorClickHandlers() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToPage(index);
        this.resetAutoPlay();
      });
    });
  }
  
  showPage(pageIndex) {
    // Masquer toutes les cartes
    this.cards.forEach(card => card.classList.remove('active'));
    
    // Afficher les cartes de la page actuelle après un délai
    setTimeout(() => {
      const startIndex = pageIndex * this.cardsPerPage;
      const endIndex = Math.min(startIndex + this.cardsPerPage, this.cards.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        this.cards[i].classList.add('active');
      }
      
      // Mettre à jour les indicateurs
      this.updateIndicators(pageIndex);
    }, CONFIG.fadeOutDelay);
    
    this.currentPage = pageIndex;
  }
  
  updateIndicators(activeIndex) {
    this.indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === activeIndex);
    });
  }
  
  goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < this.totalPages) {
      this.showPage(pageIndex);
    }
  }
  
  nextPage() {
    const nextPage = (this.currentPage + 1) % this.totalPages;
    this.goToPage(nextPage);
  }
  
  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextPage();
    }, CONFIG.avisTransitionDuration);
  }
  
  resetAutoPlay() {
    clearInterval(this.intervalId);
    this.startAutoPlay();
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// Initialiser le carousel des avis
const avisCarousel = new AvisCarousel();

// ========== SMOOTH SCROLL POUR LES ANCRES ========== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Ignorer les liens vides ou juste "#"
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========== ANIMATION AU SCROLL (INTERSECTION OBSERVER) ========== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Éléments à animer au scroll
const animateElements = document.querySelectorAll('.card, .professeur, .contenu');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeInObserver.observe(el);
});

// ========== GESTION DES PERFORMANCES ========== //
// Lazy loading des images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback pour les navigateurs qui ne supportent pas lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ========== PRÉCHARGEMENT DES IMAGES DU CAROUSEL ========== //
function preloadImages() {
  heroData.images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Précharger les images après le chargement de la page
window.addEventListener('load', preloadImages);

// ========== GESTION DES ERREURS ========== //
window.addEventListener('error', (e) => {
  console.error('Erreur détectée:', e.message);
  // Vous pouvez ajouter un système de log ici
}, true);

// ========== PERFORMANCE MONITORING ========== //
if ('PerformanceObserver' in window) {
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        console.warn('Action lente détectée:', entry.name, entry.duration + 'ms');
      }
    }
  });
  
  perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// ========== NETTOYAGE À LA FERMETURE ========== //
window.addEventListener('beforeunload', () => {
  if (avisCarousel) {
    avisCarousel.stop();
  }
});

// ========== EASTER EGG (optionnel) ========== //
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// ========== DEBUG MODE (Development) ========== //
const DEBUG = false; // Mettre à true pour activer le mode debug

if (DEBUG) {
  console.log('🎓 GEIGE Website - Mode Debug Activé');
  console.log('📊 Nombre de cartes avis:', avisCarousel.cards.length);
  console.log('📄 Pages d\'avis:', avisCarousel.totalPages);
  console.log('🖼️ Images hero:', heroData.images.length);
  console.log('💬 Citations:', heroData.citations.length);
}

// ========== EXPORTS (si utilisation de modules) ========== //
// export { heroCarousel, professeursScroller, avisCarousel };

console.log('✅ GEIGE Website - Chargement terminé avec succès!');