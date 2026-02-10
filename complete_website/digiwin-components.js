/**
 * DigiWin Shared Components
 *
 * Navigation dropdowns, header scroll, mobile menu, and
 * scroll-triggered animations used across all pages.
 */
(function() {
    'use strict';

    // ==========================================
    // Header Scroll Effect
    // ==========================================
    var header = document.querySelector('.dw-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // Navigation Dropdown Menus
    // ==========================================
    var dropdowns = document.querySelectorAll('.dw-nav-item[data-dropdown]');
    var isMobile = function() { return window.innerWidth <= 1024; };

    function closeOtherDropdowns(except) {
        dropdowns.forEach(function(other) {
            if (other !== except) {
                other.classList.remove('active');
                var m = other.querySelector('.dw-mega-menu');
                if (m) m.classList.remove('active');
            }
        });
    }

    dropdowns.forEach(function(item) {
        var menu = item.querySelector('.dw-mega-menu');
        var link = item.querySelector('.dw-nav-link');

        // Desktop: hover open/close
        item.addEventListener('mouseenter', function() {
            if (isMobile()) return;
            closeOtherDropdowns(item);
            item.classList.add('active');
            if (menu) menu.classList.add('active');
        });

        item.addEventListener('mouseleave', function() {
            if (isMobile()) return;
            item.classList.remove('active');
            if (menu) menu.classList.remove('active');
        });

        // Both: click to toggle (primary method on mobile)
        if (link) {
            link.addEventListener('click', function(e) {
                if (menu) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeOtherDropdowns(item);
                    item.classList.toggle('active');
                    menu.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dw-nav-item[data-dropdown]')) {
            closeOtherDropdowns(null);
        }
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    var menuToggle = document.querySelector('.dw-menu-toggle');
    var nav = document.querySelector('.dw-nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            var isOpen = nav.classList.toggle('dw-nav--open');
            menuToggle.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile menu when a non-dropdown link is tapped
        nav.querySelectorAll('a.dw-nav-link, .dw-mega-item, .dw-mega-viewall').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('dw-nav--open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Scroll-Triggered Fade-In Animation
    // ==========================================
    /**
     * Two modes:
     *   'class' — adds className (for CSS-driven transitions)
     *   'style' — sets inline opacity/transform (for JS-driven transitions)
     *
     * @param {string} selector
     * @param {Object} [options]
     * @param {string}  [options.mode='style']      - 'class' or 'style'
     * @param {string}  [options.className='visible'] - class to add (mode='class')
     * @param {number}  [options.stagger=70]         - ms between elements
     * @param {number}  [options.duration=400]       - transition ms (mode='style')
     * @param {number}  [options.distance=20]        - translateY px (mode='style')
     * @param {number}  [options.threshold=0.1]
     * @param {string}  [options.rootMargin='0px 0px -50px 0px']
     */
    function initScrollAnimation(selector, options) {
        var opts = {
            mode: 'style',
            className: 'visible',
            stagger: 70,
            duration: 400,
            distance: 20,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        if (options) {
            for (var key in options) {
                if (options.hasOwnProperty(key)) opts[key] = options[key];
            }
        }

        var elements = document.querySelectorAll(selector);
        if (!elements.length) return null;

        if (opts.mode === 'style') {
            elements.forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(' + opts.distance + 'px)';
                el.style.transition = 'opacity ' + (opts.duration / 1000) + 's ease, transform ' + (opts.duration / 1000) + 's ease';
            });
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var all = Array.from(document.querySelectorAll(selector));
                    var idx = all.indexOf(entry.target);
                    setTimeout(function() {
                        if (opts.mode === 'class') {
                            entry.target.classList.add(opts.className);
                        } else {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    }, idx * opts.stagger);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: opts.threshold,
            rootMargin: opts.rootMargin
        });

        elements.forEach(function(el) { observer.observe(el); });
        return observer;
    }

    // Expose for page-specific use
    window.DigiWinUI = {
        initScrollAnimation: initScrollAnimation
    };

})();
