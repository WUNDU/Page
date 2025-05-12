// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true
});

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const openMenuBtn = document.getElementById('open-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

openMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('navbar-active');
    navbar.classList.remove('navbar-transparent');
    navLinks.forEach(link => link.classList.add('text-primary'));
    navLinks.forEach(link => link.classList.remove('text-white'));
  } else {
    navbar.classList.remove('navbar-active');
    navbar.classList.add('navbar-transparent');
    navLinks.forEach(link => link.classList.remove('text-primary'));
    navLinks.forEach(link => link.classList.add('text-white'));
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const header = item.querySelector('.faq-header');
  const content = item.querySelector('.faq-content');
  const icon = item.querySelector('.faq-icon');

  header.addEventListener('click', () => {
    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  });
});
