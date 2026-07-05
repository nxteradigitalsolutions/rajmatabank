const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/tk486/Downloads/CTK Digital Services/Rajmata Bank';
const files = ['index.html', 'about.html', 'contact.html', 'documentation.html', 'open-account.html', 'security.html'];

const headerRegex = /<header.*?<\/header>/s;

const newHeader = `<header class="bg-surface sticky top-0 z-50 border-b border-outline-variant h-20 flex items-center shadow-sm transition-all duration-300" id="main-header">
    <div class="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-full">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300 transform hover:scale-105">
            <span class="material-symbols-outlined text-primary" style="font-size: 32px;">account_balance</span>
            <span class="font-headline-md font-bold text-primary tracking-tight" style="font-size: 1.5rem; line-height: 1;">Rajmata Bank</span>
        </a>

        <!-- Navigation Links -->
        <nav class="hidden lg:flex gap-gutter h-full items-center">
            <a class="nav-link text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md text-body-md relative hover:-translate-y-0.5" href="index.html">Home</a>
            <a class="nav-link text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md text-body-md relative hover:-translate-y-0.5" href="about.html">About Us</a>
            <a class="nav-link text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md text-body-md relative hover:-translate-y-0.5" href="security.html">Security &amp; Compliance</a>
            
            <!-- Services Dropdown -->
            <div class="dropdown relative h-full flex items-center group">
                <a href="documentation.html" class="nav-link text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md text-body-md flex items-center gap-1 relative hover:-translate-y-0.5">
                    Services
                    <span class="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-300">expand_more</span>
                </a>
                <div class="dropdown-menu absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-secondary ring-1 ring-black ring-opacity-5 z-50 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#savings-account">Saving Account</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#current-account">Current Account</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#term-deposits">Term Deposit Rates</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#cumulative">Cumulative &amp; RD</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#yield-calculator">Yield Calculator</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#loan-calculator">Loan Calculator</a>
                    <a class="block px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-secondary transition-colors font-body-md text-body-md" href="documentation.html#bank-charges">Bank Charges</a>
                </div>
            </div>
            <a class="nav-link text-on-surface-variant hover:text-secondary transition-all duration-300 font-body-md text-body-md relative hover:-translate-y-0.5" href="contact.html">Contact Us</a>
        </nav>

        <!-- Right Buttons -->
        <div class="flex items-center gap-4 z-50">
            <a href="open-account.html" class="px-8 py-2.5 bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold rounded-sm hover:opacity-90 active:scale-95 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 shadow-sm inline-block">Open Account</a>
            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="lg:hidden p-2 text-on-surface-variant hover:text-secondary transition-colors">
                <span class="material-symbols-outlined" style="font-size: 28px;">menu</span>
            </button>
        </div>
    </div>
    
    <!-- Mobile Navigation Menu (Hidden by default) -->
    <div id="mobile-menu" class="fixed inset-0 bg-surface z-40 flex flex-col hidden lg:hidden pt-24 px-6 border-t border-outline-variant">
        <a class="nav-link block py-4 text-on-surface-variant hover:text-secondary font-headline-sm text-headline-sm border-b border-outline-variant/30" href="index.html">Home</a>
        <a class="nav-link block py-4 text-on-surface-variant hover:text-secondary font-headline-sm text-headline-sm border-b border-outline-variant/30" href="about.html">About Us</a>
        <a class="nav-link block py-4 text-on-surface-variant hover:text-secondary font-headline-sm text-headline-sm border-b border-outline-variant/30" href="security.html">Security &amp; Compliance</a>
        <a class="nav-link block py-4 text-on-surface-variant hover:text-secondary font-headline-sm text-headline-sm border-b border-outline-variant/30" href="documentation.html">Services</a>
        <a class="nav-link block py-4 text-on-surface-variant hover:text-secondary font-headline-sm text-headline-sm" href="contact.html">Contact Us</a>
    </div>
</header>`;

// Script injection to handle active nav state across all files
const navScript = `
<script type="module" src="https://cdn.jsdelivr.net/npm/@hotwired/turbo@8.0.4/dist/turbo.es2017-umd.js"></script>
<script>
    function initNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('text-secondary', 'font-bold', 'border-b-2', 'border-secondary');
                link.classList.remove('text-on-surface-variant');
            } else {
                link.classList.remove('text-secondary', 'font-bold', 'border-b-2', 'border-secondary');
                link.classList.add('text-on-surface-variant');
            }
        });

        // Mobile menu toggle logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            // Remove existing listener if any
            const newBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
            newBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                const icon = newBtn.querySelector('span');
                if(mobileMenu.classList.contains('hidden')) {
                    icon.textContent = 'menu';
                } else {
                    icon.textContent = 'close';
                }
            });
        }
    }
    document.addEventListener("turbo:load", initNav);
    document.addEventListener("DOMContentLoaded", initNav);
</script>
</body>`;

for (let file of files) {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace header
    content = content.replace(headerRegex, newHeader);
    
    // Remove old navScript completely before injecting new one
    content = content.replace(/<script type="module" src="https:\/\/cdn\.jsdelivr\.net.*<\/body>/s, '</body>');
    content = content.replace(/<script>\s*function initNav.*<\/body>/s, '</body>');
    content = content.replace(/<script>\s*document\.addEventListener\("DOMContentLoaded".*<\/body>/s, '</body>');

    content = content.replace(/<\/body>/, navScript);
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated', file);
}
