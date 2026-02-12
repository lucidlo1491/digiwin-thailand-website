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

    // ==========================================
    // Particle Wave: Scroll Reveal
    // ==========================================
    /**
     * Reveals SVG particle dots (circles) when they enter the viewport.
     * Each dot scales from 0→1 with a staggered delay based on position.
     *
     * @param {string} selector — CSS selector for the SVG container
     */
    function initParticleReveal(selector) {
        var containers = document.querySelectorAll(selector);
        if (!containers.length) return null;

        // Check reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            containers.forEach(function(el) { el.classList.add('is-visible'); });
            return null;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var circles = entry.target.querySelectorAll('circle');
                    circles.forEach(function(circle, i) {
                        circle.style.transitionDelay = (i * 0.02) + 's';
                    });
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

        containers.forEach(function(el) { observer.observe(el); });
        return observer;
    }

    // ==========================================
    // Super D: Parallax Scroll
    // ==========================================
    /**
     * Moves the Super D background element at a slower rate than content scroll,
     * creating a depth/parallax effect. Uses transform for GPU acceleration.
     *
     * @param {string} selector — CSS selector for the D background element
     * @param {number} [speed=0.3] — scroll speed multiplier (0 = fixed, 1 = normal scroll)
     */
    function initDParallax(selector, speed) {
        var elements = document.querySelectorAll(selector);
        if (!elements.length) return;

        // Check reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var scrollSpeed = typeof speed === 'number' ? speed : 0.3;
        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    var scrollY = window.scrollY;
                    elements.forEach(function(el) {
                        var rect = el.parentElement.getBoundingClientRect();
                        // Only animate when parent section is near viewport
                        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
                            var offset = scrollY * scrollSpeed;
                            el.style.transform = 'translateY(calc(-50% + ' + offset + 'px))';
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ==========================================
    // Super D: Stroke Draw on Scroll
    // ==========================================
    /**
     * Triggers the stroke-dasharray "drawing" animation when the D enters viewport.
     *
     * @param {string} selector — CSS selector for the SVG container with .dw-d-draw
     */
    function initDDraw(selector) {
        var elements = document.querySelectorAll(selector);
        if (!elements.length) return null;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            elements.forEach(function(el) { el.classList.add('is-visible'); });
            return null;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(function(el) { observer.observe(el); });
        return observer;
    }

    // Expose for page-specific use
    window.DigiWinUI = {
        initScrollAnimation: initScrollAnimation,
        initParticleReveal: initParticleReveal,
        initDParallax: initDParallax,
        initDDraw: initDDraw
    };

    // ==========================================
    // Auto-init: animate .fade-in elements on every page
    // ==========================================
    if (document.querySelectorAll('.fade-in').length) {
        initScrollAnimation('.fade-in', { mode: 'class' });
    }

})();

// ==========================================
// Event Registration Form Handler
// ==========================================
function handleEventRegister(form) {
    var eventName = form.getAttribute('data-event') || 'Event';
    var data = {
        event: eventName,
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        company: form.querySelector('[name="company"]').value,
        role: (form.querySelector('[name="role"]') || {}).value || '',
        phone: (form.querySelector('[name="phone"]') || {}).value || '',
        interest: (form.querySelector('[name="interest"]') || {}).value || ''
    };

    // Log to console for now — replace with actual API endpoint when ready
    console.log('Event Registration:', JSON.stringify(data, null, 2));

    // Show success state
    form.style.display = 'none';
    var success = form.parentElement.querySelector('.event-register-success');
    if (success) {
        success.classList.add('active');
    }

    return false;
}
