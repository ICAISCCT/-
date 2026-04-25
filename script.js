document.addEventListener('DOMContentLoaded', () => {

    // --- Countdown Timer ---
    const conferenceDate = new Date('July 4, 2026 09:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = conferenceDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML = "<h3>Conference Started!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Gooey Nav Animation ---
    const navLinks = document.querySelectorAll('.nav-links li');
    const gooeyDot = document.querySelector('.gooey-dot');

    const moveDot = (target) => {
        const linkRect = target.getBoundingClientRect();
        const parentRect = target.parentElement.getBoundingClientRect();

        // Calculate position relative to the UL
        const left = linkRect.left - parentRect.left;
        const width = linkRect.width;

        gooeyDot.style.width = `${width}px`;
        gooeyDot.style.transform = `translateX(${left}px)`;
    };

    // Initialize position on active link
    const activeLink = document.querySelector('.nav-links li.active');
    if (activeLink) {
        moveDot(activeLink);
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            moveDot(e.currentTarget);
        });
    });

    const navContainer = document.querySelector('.nav-links');
    navContainer.addEventListener('mouseleave', () => {
        // Return to active link
        const currentActive = document.querySelector('.nav-links li.active');
        if (currentActive) {
            moveDot(currentActive);
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    // Close menu when clicking any navigable link and handle smooth scroll
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only close if it's a link to a section (not the dropdown toggle)
            if (href.startsWith('#') && href !== '#') {
                nav.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // Update active state on scroll
    // --- Active Link Highlighting (Intersection Observer) ---
    const connectionSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all items
                navLinks.forEach(link => link.classList.remove('active'));

                // Find the link pointing to this section
                let targetLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (targetLink) {
                    // Find the main parent LI (handles both direct and dropdown links)
                    let activeItem = targetLink.closest('li');

                    if (activeItem) {
                        activeItem.classList.add('active');
                        moveDot(activeItem);
                    }
                }
            }
        });
    }, {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is near the top
        threshold: 0
    });

    document.querySelectorAll('section').forEach(section => {
        connectionSectionObserver.observe(section);
    });
    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    // --- Reveal Elements on Scroll ---
    revealElements.forEach(el => revealObserver.observe(el));

});


