(function () {
    'use strict';

    // ========================================
    // Intersection Observer for fade-in sections
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade sections
    document.querySelectorAll('.fade-section').forEach((section) => {
        fadeObserver.observe(section);
    });

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, '', targetId);
            }
        });
    });

    // ========================================
    // Reduced motion support
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleReducedMotion() {
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.querySelectorAll('.fade-section').forEach((section) => {
                section.classList.add('visible');
                section.style.transition = 'none';
            });

            document.querySelectorAll('.hero-logo, .hero-title-el, .hero-tagline-el, .hero-cta-el').forEach((el) => {
                el.style.animation = 'none';
                el.style.opacity = '1';
                el.style.transform = 'none';
            });

            document.querySelectorAll('.comet-shimmer').forEach((el) => {
                el.style.animation = 'none';
            });
        }
    }

    handleReducedMotion();
    prefersReducedMotion.addEventListener('change', handleReducedMotion);

})();
