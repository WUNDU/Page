// Inicializar AOS (usando a versão mais recente fornecida)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (openMenuBtn) {
  openMenuBtn.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('navbar-active');
      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-primary'); /* Changed from text-dark to text-primary for consistency with CSS */
      });
    } else {
      navbar.classList.remove('navbar-active');
      navbar.classList.add('navbar-transparent');
      navLinks.forEach(link => {
        link.classList.remove('text-primary'); /* Changed from text-dark to text-primary for consistency with CSS */
        link.classList.add('text-white');
      });
    }
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
      backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      backToTopBtn.classList.remove('opacity-100', 'visible');
      backToTopBtn.classList.add('opacity-0', 'invisible');
    }
  }
});

// Back to top button action
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Tab switching and anchor link handling (Existing code)
function switchTab(tabId) {
  document.querySelectorAll('.policy-tab-btn').forEach(btn => {
    btn.classList.remove('active-tab', 'border-primary', 'text-primary');
    btn.classList.add('text-gray-500');
  });

  document.querySelectorAll('.policy-tab').forEach(tab => tab.classList.add('hidden'));

  const button = document.querySelector(`.policy-tab-btn[data-tab="${tabId}"]`);
  if (button) {
    button.classList.add('active-tab', 'border-primary', 'text-primary');
    button.classList.remove('text-gray-500');
  }

  const tab = document.getElementById(`${tabId}-policy`);
  if (tab) {
    tab.classList.remove('hidden');
    const tabSection = document.querySelector('.policy-tab').closest('section');
    if (tabSection) {
      window.scrollTo({
        top: tabSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    AOS.refresh();
  }
}

document.querySelectorAll('.policy-tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    switchTab(tabId);
    history.pushState(null, null, `#${tabId}-policy`);
  });
});

function handleHashChange() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['privacy-policy', 'cookies-policy', 'terms-policy'];
  if (validTabs.includes(hash)) {
    const tabId = hash.replace('-policy', '');
    switchTab(tabId);
  }
}

window.addEventListener('load', handleHashChange);
window.addEventListener('hashchange', handleHashChange);

// FAQ toggles (from your app.js, with close others logic)
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector('i');

    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');

    // Fechar os outros FAQs
    faqToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        const otherContent = otherToggle.nextElementSibling;
        const otherIcon = otherToggle.querySelector('i');
        if (otherContent && !otherContent.classList.contains('hidden')) { // Only hide if not already hidden
          otherContent.classList.add('hidden');
        }
        if (otherIcon) {
          otherIcon.classList.remove('rotate-180');
        }
      }
    });
  });
});

// Contador de estatísticas (animação simples)
const statsCounters = document.querySelectorAll('.stats-counter');

const animateCounters = () => {
  statsCounters.forEach(counter => {
    const valueDisplay = counter.querySelector('div:first-child');
    // The original code had finalValue = valueDisplay.textContent, but then didn't use it for animation.
    // For a simple pulse, we just apply the class.
    if (valueDisplay) {
      valueDisplay.classList.add('animate-pulse');
      setTimeout(() => {
        valueDisplay.classList.remove('animate-pulse');
      }, 1500);
    }
  });
};

// Ativar animação quando a seção estiver visível
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Assuming statsCounters[0].parentElement is the section containing the counters
if (statsCounters.length > 0 && statsCounters[0].parentElement) {
  observer.observe(statsCounters[0].parentElement);
}