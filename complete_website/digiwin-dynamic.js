/**
 * DigiWin Dynamic Content
 * Automatically calculates and updates dynamic values across the site
 */

(function() {
    'use strict';

    // DigiWin founding year
    const FOUNDING_YEAR = 1982;

    // Calculate years since founding
    const currentYear = new Date().getFullYear();
    const yearsSinceFounding = currentYear - FOUNDING_YEAR;

    // Update all elements with data-dw-years attribute or class
    function updateYears() {
        // Update elements using data attribute
        document.querySelectorAll('[data-dw-years]').forEach(function(el) {
            el.textContent = yearsSinceFounding;
        });

        // Update elements using class
        document.querySelectorAll('.dw-years').forEach(function(el) {
            el.textContent = yearsSinceFounding;
        });

        // Update elements using data-dw-years-text for full text replacement
        document.querySelectorAll('[data-dw-years-text]').forEach(function(el) {
            const template = el.getAttribute('data-dw-years-text');
            el.textContent = template.replace('{years}', yearsSinceFounding);
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateYears);
    } else {
        updateYears();
    }

    // Expose for use in other scripts if needed
    window.DigiWin = {
        foundingYear: FOUNDING_YEAR,
        yearsSinceFounding: yearsSinceFounding,
        currentYear: currentYear
    };
})();
