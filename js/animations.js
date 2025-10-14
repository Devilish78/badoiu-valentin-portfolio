// Animation Configuration
const ANIMATION_CONFIG = {
  hero: {
    scaleStart: 1.08,
    scaleEnd: 1,
    duration: 1600,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    parallaxDistance: -6,
    parallaxThreshold: 600,
    charStagger: 40
  },
  reveal: {
    stagger: 80,
    duration: 550,
    distance: 16,
    easing: 'cubic-bezier(0.22, 0.9, 0.34, 1)'
  },
  transition: {
    duration: 750,
    easing: 'cubic-bezier(0.22, 0.9, 0.34, 1)'
  }
};

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Utility Functions
function getRandomDelay(min = 0, max = 100) {
  return Math.random() * (max - min) + min;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Hero Animations
class HeroAnimations {
  constructor() {
    this.heroElement = document.querySelector('.hero');
    this.backgroundElement = document.querySelector('.hero__background');
    this.titleLines = document.querySelectorAll('.hero__title-line');
    this.typedTextElement = document.querySelector('.hero__typed-text');
    this.profileImage = document.querySelector('.profile-img');
    
    this.rotatingPhrases = [
      "Badoiu Valentin crafts with accessibility as a priority",
      "Badoiu Valentin creates AI-enhanced digital masterpieces",
      "Badoiu Valentin builds innovative web experiences",
      "Badoiu Valentin transforms ideas into digital reality",
      "Badoiu Valentin specializes in creative development",
      "Badoiu Valentin brings imagination to life through code"
    ];
    
    this.currentPhraseIndex = 0;
    this.typingSpeed = 80; // 80ms per character
    this.pauseDuration = 1500; // 1.5s pause
    
    this.init();
  }
  
  init() {
    if (prefersReducedMotion) {
      this.showWithoutAnimations();
      return;
    }
    
    this.animateHeroEntrance();
    this.setupParallax();
    this.startTypewriterAnimation();
  }
  
  showWithoutAnimations() {
    this.titleLines.forEach(line => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    });
    
    if (this.profileImage) {
      this.profileImage.style.opacity = '1';
      this.profileImage.style.transform = 'scale(1)';
    }
    
    this.typedTextElement.style.opacity = '1';
    this.typedTextElement.innerHTML = this.rotatingPhrases[0] + '<span class="cursor">|</span>';
  }
  
  animateHeroEntrance() {
    // Background scale animation
    if (this.backgroundElement) {
      this.backgroundElement.style.transform = `scale(${ANIMATION_CONFIG.hero.scaleStart})`;
      this.backgroundElement.style.transition = `transform ${ANIMATION_CONFIG.hero.duration}ms ${ANIMATION_CONFIG.hero.easing}`;
      
      requestAnimationFrame(() => {
        this.backgroundElement.style.transform = `scale(${ANIMATION_CONFIG.hero.scaleEnd})`;
      });
    }
    
    // Profile image animation
    if (this.profileImage) {
      setTimeout(() => {
        this.profileImage.style.transition = 'opacity 800ms ease, transform 800ms ease';
        this.profileImage.style.opacity = '1';
        this.profileImage.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Title lines animation
    this.titleLines.forEach((line, index) => {
      const delay = 400 + (index * 200);
      
      setTimeout(() => {
        line.style.transition = `opacity 800ms ${ANIMATION_CONFIG.hero.easing}, transform 800ms ${ANIMATION_CONFIG.hero.easing}`;
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, delay);
    });
  }
  
  setupParallax() {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      if (scrolled <= ANIMATION_CONFIG.hero.parallaxThreshold) {
        const parallaxValue = (scrolled / ANIMATION_CONFIG.hero.parallaxThreshold) * ANIMATION_CONFIG.hero.parallaxDistance;
        
        if (this.backgroundElement) {
          this.backgroundElement.style.transform = `scale(${ANIMATION_CONFIG.hero.scaleEnd}) translateY(${parallaxValue}%)`;
        }
      }
      
      ticking = false;
    };
    
    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  }
  
  startTypewriterAnimation() {
    // Show cursor
    this.typedTextElement.style.opacity = '1';
    
    // Start typing after title animations
    setTimeout(() => {
      this.typewriterLoop();
    }, 1200);
  }
  
  typewriterLoop() {
    const currentPhrase = this.rotatingPhrases[this.currentPhraseIndex];
    
    // Type the current phrase
    this.typeText(currentPhrase, () => {
      // Pause, then erase
      setTimeout(() => {
        this.eraseText(() => {
          // Move to next phrase
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.rotatingPhrases.length;
          // Continue the loop
          setTimeout(() => this.typewriterLoop(), 200);
        });
      }, this.pauseDuration);
    });
  }
  
  typeText(text, callback) {
    let i = 0;
    const cursor = '<span class="cursor">|</span>';
    
    const typing = () => {
      if (i <= text.length) {
        this.typedTextElement.innerHTML = text.substring(0, i) + cursor;
        i++;
        setTimeout(typing, this.typingSpeed);
      } else {
        callback();
      }
    };
    
    typing();
  }
  
  eraseText(callback) {
    const currentText = this.typedTextElement.textContent.replace('|', '');
    let i = currentText.length;
    const cursor = '<span class="cursor">|</span>';
    
    const erasing = () => {
      if (i >= 0) {
        this.typedTextElement.innerHTML = currentText.substring(0, i) + cursor;
        i--;
        setTimeout(erasing, this.typingSpeed / 2); // Erase faster than typing
      } else {
        callback();
      }
    };
    
    erasing();
  }
}

// Scroll-triggered Animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    if (prefersReducedMotion) {
      this.showAllElements();
      return;
    }
    
    this.setupIntersectionObserver();
  }
  
  showAllElements() {
    const elements = document.querySelectorAll('.section__title, .about__paragraph, .project-card, .testimonial-card, .contact__text, .contact__links');
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);
    
    // Observe all animatable elements
    const elements = document.querySelectorAll('.section__title, .about__paragraph, .project-card, .testimonial-card, .contact__text, .contact__links');
    elements.forEach(el => observer.observe(el));
  }
  
  animateElement(element) {
    // Handle staggered animations for groups
    if (element.parentElement.classList.contains('projects__grid') || 
        element.parentElement.classList.contains('testimonials__grid')) {
      this.animateGroup(element.parentElement);
    } else if (element.classList.contains('about__paragraph')) {
      this.animateAboutParagraphs(element);
    } else {
      this.animateSingleElement(element);
    }
  }
  
  animateGroup(container) {
    const items = container.children;
    
    Array.from(items).forEach((item, index) => {
      const delay = index * ANIMATION_CONFIG.reveal.stagger;
      
      setTimeout(() => {
        item.style.transition = `opacity ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}, transform ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, delay);
    });
  }
  
  animateAboutParagraphs(triggeredElement) {
    const paragraphs = document.querySelectorAll('.about__paragraph');
    
    paragraphs.forEach((paragraph, index) => {
      const delay = index * ANIMATION_CONFIG.reveal.stagger;
      
      setTimeout(() => {
        paragraph.style.transition = `opacity ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}, transform ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}`;
        paragraph.style.opacity = '1';
        paragraph.style.transform = 'translateY(0)';
      }, delay);
    });
  }
  
  animateSingleElement(element) {
    element.style.transition = `opacity ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}, transform ${ANIMATION_CONFIG.reveal.duration}ms ${ANIMATION_CONFIG.reveal.easing}`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Add smooth scroll behavior for any anchor links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.offsetTop;
          const offsetPosition = elementPosition - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  }
}

// Background Color Transitions
class BackgroundTransitions {
  constructor() {
    this.sections = {
      hero: { element: document.querySelector('.hero'), color: 'var(--color-bg-primary)' },
      about: { element: document.querySelector('.about'), color: 'var(--color-bg-secondary)' },
      projects: { element: document.querySelector('.projects'), color: 'var(--color-bg-primary)' },
      testimonials: { element: document.querySelector('.testimonials'), color: 'var(--color-bg-tertiary)' },
      contact: { element: document.querySelector('.contact'), color: 'var(--color-bg-primary)' }
    };
    
    this.init();
  }
  
  init() {
    if (prefersReducedMotion) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateBodyBackground(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    Object.values(this.sections).forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });
  }
  
  updateBodyBackground(activeSection) {
    const sectionData = Object.values(this.sections).find(section => section.element === activeSection);
    if (sectionData) {
      document.body.style.transition = `background-color ${ANIMATION_CONFIG.transition.duration}ms ${ANIMATION_CONFIG.transition.easing}`;
      document.body.style.backgroundColor = sectionData.color;
    }
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Lazy load non-critical images
    this.setupLazyLoading();
    
    // Optimize animations for GPU
    this.optimizeForGPU();
  }
  
  preloadCriticalResources() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
  }
  
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  optimizeForGPU() {
    const animatedElements = document.querySelectorAll('.hero__background, .project-card, .testimonial-card');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform, opacity';
      el.style.transform = 'translateZ(0)'; // Force GPU layer
    });
  }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  if (prefersReducedMotion) {
    console.log('Reduced motion detected - animations minimized');
  }
  
  // Initialize all animation systems
  new HeroAnimations();
  new ScrollAnimations();
  new SmoothScroll();
  new BackgroundTransitions();
  new PerformanceOptimizer();
  
  console.log('Portfolio animations initialized');
});

// Handle window resize for responsive animations
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate animations if needed
    console.log('Window resized - animations adjusted');
  }, 250);
}, { passive: true });