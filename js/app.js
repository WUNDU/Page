// Inicializar AOS
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

openMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.remove('navbar-transparent');
    navbar.classList.add('navbar-active');
    navLinks.forEach(link => {
      link.classList.remove('text-white');
      link.classList.add('text-dark');
    });
  } else {
    navbar.classList.remove('navbar-active');
    navbar.classList.add('navbar-transparent');
    navLinks.forEach(link => {
      link.classList.remove('text-dark');
      link.classList.add('text-white');
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (window.scrollY > 500) {
    backToTopBtn.classList.remove('opacity-0', 'invisible');
    backToTopBtn.classList.add('opacity-100', 'visible');
  } else {
    backToTopBtn.classList.remove('opacity-100', 'visible');
    backToTopBtn.classList.add('opacity-0', 'invisible');
  }
});

// Back to top button action
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// FAQ toggles
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

        otherContent.classList.add('hidden');
        otherIcon.classList.remove('rotate-180');
      }
    });
  });
});

// Contador de estatísticas (animação simples)
const statsCounters = document.querySelectorAll('.stats-counter');

const animateCounters = () => {
  statsCounters.forEach(counter => {
    const valueDisplay = counter.querySelector('div:first-child');
    const finalValue = valueDisplay.textContent;

    // Apenas para demonstração - não implementando contador animado completo
    valueDisplay.classList.add('animate-pulse');
    setTimeout(() => {
      valueDisplay.classList.remove('animate-pulse');
    }, 1500);
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

if (statsCounters.length > 0) {
  observer.observe(statsCounters[0].parentElement);
}