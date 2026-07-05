// Rajmata Bank Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rajmata Bank website initialized.');
    
    // Add interactive animations if necessary
    // Mobile menu toggle example
    const menuBtn = document.querySelector('[data-mobile-menu]');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const menu = document.querySelector('[data-mobile-menu-content]');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        });
    }
});
