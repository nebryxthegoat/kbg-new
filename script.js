// ========================================
// CORPORATE WEBSITE INTERACTIONS
// KBG Group - Premium Aluminium Solutions
// ========================================

// HEADER SCROLL BEHAVIOR
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// SMOOTH ANCHOR SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in to product cards
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const industryCards = document.querySelectorAll(".industry-card");
  const projectCards = document.querySelectorAll(".project-card");
  
  // Set initial state
  [...productCards, ...industryCards, ...projectCards].forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
  });
  
  // Observe cards
  [...productCards, ...industryCards, ...projectCards].forEach(card => {
    fadeInObserver.observe(card);
  });
});

// STAGGER ANIMATION FOR STATS
document.addEventListener("DOMContentLoaded", () => {
  const statItems = document.querySelectorAll(".stat-item");
  
  statItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      item.style.transition = "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 1200 + (index * 150));
  });
});

// ANIMATED COUNTERS FOR STATS
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (target < 100 ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (target < 100 ? '+' : '');
    }
  }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target, 1500);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
});

// PARALLAX EFFECT FOR HERO IMAGE
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
  }
});

// MOBILE MENU TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const header = document.querySelector('header');

  if (mobileMenuBtn) {
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      
      // Clone the desktop nav
      const desktopNav = document.querySelector('nav.hidden');
      if (desktopNav) {
        const navClone = desktopNav.cloneNode(true);
        navClone.classList.remove('hidden', 'md:flex');
        navClone.classList.add('mobile-nav-links');
        mobileMenu.appendChild(navClone);
      }
      
      header.appendChild(mobileMenu);

// Create backdrop
const backdrop = document.createElement('div');
backdrop.className = 'mobile-menu-backdrop';
document.body.appendChild(backdrop);

// Close menu when clicking backdrop
backdrop.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  mobileMenuBtn.classList.remove('active');
  document.body.classList.remove('mobile-menu-open');
});
    }
    
    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      document.body.classList.toggle('mobile-menu-open');
    });
    
    // Close menu when clicking a link
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }
});

// ENHANCED HOVER EFFECTS FOR PROJECT IMAGES
document.addEventListener("DOMContentLoaded", () => {
  const projectImages = document.querySelectorAll('.project-image');
  
  projectImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    image.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// LAZY LOADING FOR IMAGES
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// SMOOTH REVEAL FOR SECTION HEADERS
document.addEventListener("DOMContentLoaded", () => {
  const sectionHeaders = document.querySelectorAll('.section-header');
  
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });
  
  sectionHeaders.forEach(header => {
    header.style.opacity = "0";
    header.style.transform = "translateY(30px)";
    header.style.transition = "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    headerObserver.observe(header);
  });
});

// BUTTON RIPPLE EFFECT
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn-primary, .btn-secondary, .btn-primary-large, .btn-secondary-large {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// PERFORMANCE: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
  // Any heavy scroll calculations go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// LOG LOADED MESSAGE
console.log('%c🏢 KBG Group Website Loaded', 'color: #ef7f1b; font-size: 16px; font-weight: bold;');
console.log('%cPrecision-Engineered Aluminium Solutions', 'color: #525252; font-size: 12px;');
