// AOS Initialization
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
      link.classList.add('text-primary');
    });
  } else {
    navbar.classList.remove('navbar-active');
    navbar.classList.add('navbar-transparent');
    navLinks.forEach(link => {
      link.classList.remove('text-primary');
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

// Tab switching and anchor link handling
function switchTab(tabId) {
  // Remove active class from all buttons
  document.querySelectorAll('.policy-tab-btn').forEach(btn => {
    btn.classList.remove('active-tab', 'border-primary', 'text-primary');
    btn.classList.add('text-gray-500');
  });

  // Hide all tabs
  document.querySelectorAll('.policy-tab').forEach(tab => tab.classList.add('hidden'));

  // Activate the selected button and tab
  const button = document.querySelector(`.policy-tab-btn[data-tab="${tabId}"]`);
  if (button) {
    button.classList.add('active-tab', 'border-primary', 'text-primary');
    button.classList.remove('text-gray-500');
  }

  const tab = document.getElementById(`${tabId}-policy`);
  if (tab) {
    tab.classList.remove('hidden');
    // Scroll to the tab section
    const tabSection = document.querySelector('.policy-tab').closest('section');
    if (tabSection) {
      window.scrollTo({
        top: tabSection.offsetTop - 100, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
    // Refresh AOS to ensure animations trigger for newly visible elements
    AOS.refresh();
  }
}

// Handle tab button clicks
document.querySelectorAll('.policy-tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    switchTab(tabId);
    // Update URL hash without jumping
    history.pushState(null, null, `#${tabId}-policy`);
  });
});

// Handle anchor links on page load and hash changes
function handleHashChange() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['privacy-policy', 'cookies-policy', 'terms-policy'];
  if (validTabs.includes(hash)) {
    const tabId = hash.replace('-policy', '');
    switchTab(tabId);
  }
}

// Run on page load
window.addEventListener('load', handleHashChange);

// Run on hash change (e.g., clicking footer links)
window.addEventListener('hashchange', handleHashChange);