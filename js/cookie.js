// Cookie Consent Manager
document.addEventListener('DOMContentLoaded', function () {
  // Cookie functions
  const CookieManager = {
    setCookie: function (name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
    },

    getCookie: function (name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },

    deleteCookie: function (name) {
      document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
  };

  // Check if consent was already given
  if (!CookieManager.getCookie('wundu_cookie_consent')) {
    // Create cookie banner
    createCookieBanner();
  }

  function createCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-500';
    banner.innerHTML = `
      <div class="container mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="font-poppins font-bold text-dark text-lg mb-2">Nós valorizamos sua privacidade</h3>
            <p class="text-gray-600 text-sm">
              Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego do site. 
              Você pode escolher quais cookies deseja permitir e alterar suas preferências a qualquer momento.
              <a href="privacy-policy.html" class="text-primary hover:text-secondary">Saiba mais sobre nossa política de cookies</a>.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button id="cookie-customize" class="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
              Personalizar
            </button>
            <button id="cookie-accept-all" class="px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors whitespace-nowrap">
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept-all').addEventListener('click', function () {
      acceptAllCookies();
      hideBanner();
    });

    document.getElementById('cookie-customize').addEventListener('click', function () {
      showCookiePreferences();
    });
  }

  function createCookiePreferences() {
    const modal = document.createElement('div');
    modal.id = 'cookie-preferences-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-70 opacity-0 invisible transition-all duration-300';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-poppins font-bold text-dark text-xl">Preferências de Cookies</h3>
          <button id="cookie-modal-close" class="text-gray-500 hover:text-primary text-xl">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-6">
          <p class="text-gray-600 mb-4">Selecione quais cookies você aceita:</p>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-semibold text-dark">Essenciais</h4>
                <p class="text-gray-500 text-sm">Necessários para o funcionamento do site. Não podem ser desativados.</p>
              </div>
              <div class="relative">
                <input type="checkbox" id="essential-cookies" class="sr-only" checked disabled>
                <label for="essential-cookies" class="block w-14 h-7 rounded-full bg-gray-300 cursor-not-allowed">
                  <span class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform translate-x-7"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-semibold text-dark">Funcionais</h4>
                <p class="text-gray-500 text-sm">Permitem recursos avançados e personalização.</p>
              </div>
              <div class="relative">
                <input type="checkbox" id="functional-cookies" class="cookie-toggle sr-only">
                <label for="functional-cookies" class="cookie-toggle-label block w-14 h-7 rounded-full bg-gray-300 cursor-pointer">
                  <span class="cookie-toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-semibold text-dark">Analíticos</h4>
                <p class="text-gray-500 text-sm">Ajudam a entender como você usa o site e melhorar a experiência.</p>
              </div>
              <div class="relative">
                <input type="checkbox" id="analytics-cookies" class="cookie-toggle sr-only">
                <label for="analytics-cookies" class="cookie-toggle-label block w-14 h-7 rounded-full bg-gray-300 cursor-pointer">
                  <span class="cookie-toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform"></span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 class="font-semibold text-dark">Marketing</h4>
                <p class="text-gray-500 text-sm">Utilizados para exibir anúncios relevantes e compartilhar com parceiros.</p>
              </div>
              <div class="relative">
                <input type="checkbox" id="marketing-cookies" class="cookie-toggle sr-only">
                <label for="marketing-cookies" class="cookie-toggle-label block w-14 h-7 rounded-full bg-gray-300 cursor-pointer">
                  <span class="cookie-toggle-dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 justify-end">
          <button id="cookie-save-preferences" class="px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors">
            Salvar preferências
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add toggle styling
    const style = document.createElement('style');
    style.textContent = `
      .cookie-toggle:checked + .cookie-toggle-label {
        background-color: #4338CA;
      }
      .cookie-toggle:checked + .cookie-toggle-label .cookie-toggle-dot {
        transform: translateX(28px);
      }
    `;
    document.head.appendChild(style);

    // Event listeners
    document.getElementById('cookie-modal-close').addEventListener('click', hideCookiePreferences);
    document.getElementById('cookie-save-preferences').addEventListener('click', savePreferences);

    // Initialize toggle states from existing cookies
    if (CookieManager.getCookie('wundu_functional_cookies') === 'true') {
      document.getElementById('functional-cookies').checked = true;
    }
    if (CookieManager.getCookie('wundu_analytics_cookies') === 'true') {
      document.getElementById('analytics-cookies').checked = true;
    }
    if (CookieManager.getCookie('wundu_marketing_cookies') === 'true') {
      document.getElementById('marketing-cookies').checked = true;
    }
  }

  function showCookiePreferences() {
    if (!document.getElementById('cookie-preferences-modal')) {
      createCookiePreferences();
    }

    const modal = document.getElementById('cookie-preferences-modal');
    modal.classList.remove('invisible', 'opacity-0');
  }

  function hideCookiePreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    modal.classList.add('opacity-0');

    setTimeout(() => {
      modal.classList.add('invisible');
    }, 300);
  }

  function savePreferences() {
    const functionalCookies = document.getElementById('functional-cookies').checked;
    const analyticsCookies = document.getElementById('analytics-cookies').checked;
    const marketingCookies = document.getElementById('marketing-cookies').checked;

    // Essential cookies are always accepted
    CookieManager.setCookie('wundu_cookie_consent', 'true', 365);
    CookieManager.setCookie('wundu_essential_cookies', 'true', 365);

    // Set other cookie preferences
    CookieManager.setCookie('wundu_functional_cookies', functionalCookies, 365);
    CookieManager.setCookie('wundu_analytics_cookies', analyticsCookies, 365);
    CookieManager.setCookie('wundu_marketing_cookies', marketingCookies, 365);

    // Apply cookie settings to actual services (Google Analytics, etc.)
    applyCookieSettings();

    hideCookiePreferences();
    hideBanner();
  }

  function acceptAllCookies() {
    CookieManager.setCookie('wundu_cookie_consent', 'true', 365);
    CookieManager.setCookie('wundu_essential_cookies', 'true', 365);
    CookieManager.setCookie('wundu_functional_cookies', 'true', 365);
    CookieManager.setCookie('wundu_analytics_cookies', 'true', 365);
    CookieManager.setCookie('wundu_marketing_cookies', 'true', 365);

    // Apply cookie settings to actual services
    applyCookieSettings();
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    banner.style.transform = 'translateY(100%)';

    setTimeout(() => {
      banner.remove();
    }, 500);
  }

  function applyCookieSettings() {
    // Check if analytics cookies are accepted before loading Google Analytics
    if (CookieManager.getCookie('wundu_analytics_cookies') === 'true') {
      // Load Google Analytics (example)
      // loadGoogleAnalytics();
    }

    // Check if marketing cookies are accepted before loading advertising scripts
    if (CookieManager.getCookie('wundu_marketing_cookies') === 'true') {
      // Load marketing scripts (example)
      // loadMarketingScripts();
    }
  }

  // Add cookie settings button to footer for future access
  const footerLinks = document.querySelector('footer .flex.space-x-6');
  if (footerLinks) {
    const cookieSettingsLink = document.createElement('a');
    cookieSettingsLink.href = 'javascript:void(0)';
    cookieSettingsLink.className = 'text-gray-500 hover:text-white transition-colors';
    cookieSettingsLink.textContent = 'Configurações de Cookies';
    cookieSettingsLink.addEventListener('click', showCookiePreferences);
    footerLinks.appendChild(cookieSettingsLink);
  }
});