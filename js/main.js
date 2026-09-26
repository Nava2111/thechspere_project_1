/**
 * TechSphere – Technology & Learning Hub
 * BCA College Project | Pure Frontend Static Website
 * Main JavaScript File (main.js)
 * 
 * Features:
 * 1. Mobile Hamburger Menu Toggle & Outside Click Dismissal
 * 2. Active Navigation Highlight based on current path
 * 3. Back-to-Top Button with Smooth Scroll
 * 4. Homepage Hero Typing Animation
 * 5. Python Code Block Simulation Runner
 * 6. Contact Form Client-side Validation & Success Message (Zero Backend)
 * 7. FAQ Accordion Toggle Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      }
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 2. Active Navigation Highlight
  highlightActiveNav();

  // 3. Back-to-Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Hero Typing Animation (Homepage)
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    initTypingEffect(typingElement, [
      'Web Development',
      'Python Programming',
      'Artificial Intelligence',
      'Machine Learning',
      'Cloud Computing',
      'Cyber Security'
    ]);
  }

  // 5. Python Code Runner Simulation (Python Page)
  const runCodeBtn = document.getElementById('runCodeBtn');
  const codeOutput = document.getElementById('codeOutput');
  if (runCodeBtn && codeOutput) {
    runCodeBtn.addEventListener('click', () => {
      codeOutput.style.display = 'block';
      codeOutput.innerHTML = `<strong>Output:</strong><br><span style="color:#10b981;">&gt; Hello Student</span>`;
    });
  }

  // 6. Contact Form Validation & Success Alert (Contact Page)
  const contactForm = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      let isValid = true;

      // Fields
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      // Helper validator
      function validateField(input, condition) {
        if (!condition) {
          input.classList.add('invalid');
          isValid = false;
        } else {
          input.classList.remove('invalid');
        }
      }

      if (nameInput) {
        validateField(nameInput, nameInput.value.trim().length >= 2);
      }

      if (emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      }

      if (subjectInput) {
        validateField(subjectInput, subjectInput.value.trim().length >= 3);
      }

      if (messageInput) {
        validateField(messageInput, messageInput.value.trim().length >= 10);
      }

      if (isValid) {
        // Reset form fields
        contactForm.reset();

        // Display success banner
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Auto-hide after 8 seconds
          setTimeout(() => {
            successBanner.style.display = 'none';
          }, 8000);
        }
      }
    });

    // Real-time error removal on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
      });
    });
  }

  // 7. FAQ Accordion (Contact Page)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
        const btn = acc.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

/**
 * Highlights current active nav item according to window.location.pathname
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.substring(href.lastIndexOf('/') + 1);

    if (currentFile === targetFile || (currentFile === '' && targetFile === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Lightweight pure JavaScript typing effect
 */
function initTypingEffect(element, words, typingSpeed = 100, pauseTime = 1800) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
    }

    let speed = isDeleting ? typingSpeed / 2 : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}
