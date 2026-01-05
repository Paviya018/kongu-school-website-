// Mobile Menu Toggle - Enhanced for Mobile Devices
document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!'); // Debug log

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    console.log('Mobile menu button:', mobileMenuBtn); // Debug log
    console.log('Nav links:', navLinks); // Debug log

    if (mobileMenuBtn && navLinks) {
        // Use both click and touchstart for better mobile support
        const toggleMenu = function (e) {
            e.preventDefault(); // Prevent default behavior
            console.log('Menu toggled!'); // Debug log
            navLinks.classList.toggle('active');

            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuBtn.addEventListener('touchstart', toggleMenu, { passive: false });

        // Close menu when clicking a link
        const menuLinks = document.querySelectorAll('.nav-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                console.log('Link clicked, closing menu'); // Debug log
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        console.log('Mobile menu initialized successfully!'); // Debug log
    } else {
        console.error('Mobile menu elements not found!'); // Debug log
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (topBar) topBar.style.transform = 'translateY(-100%)';
    } else {
        header.classList.remove('scrolled');
        if (topBar) topBar.style.transform = 'translateY(0)';
    }
});

// Accordion Logic
const accHeaders = document.querySelectorAll('.acc-header');
accHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const icon = header.querySelector('i');

        // Close others
        document.querySelectorAll('.acc-item').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('i').className = 'fas fa-chevron-down';
            }
        });

        // Toggle current
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            icon.className = 'fas fa-chevron-up';
        } else {
            icon.className = 'fas fa-chevron-down';
        }
    });
});

// Number Counter Logic
const stats = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const speed = target / 40;
                if (count < target) {
                    count = Math.ceil(count + speed);
                    entry.target.innerText = count + '+';
                    setTimeout(updateCount, 30);
                } else {
                    entry.target.innerText = target + '+';
                }
            };
            updateCount();
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statObserver.observe(stat));

// Intersection Observer for Reveal Animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Handle Counters if the element contains counters
            if (entry.target.classList.contains('stats-gp-grid')) {
                startCounters();
            }

            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal, .stagger-container').forEach(el => {
    revealObserver.observe(el);
});

// Accordion Toggle
document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.acc-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.acc-body').style.display = 'none';
            i.querySelector('i').className = 'fas fa-plus';
        });

        if (!wasActive) {
            item.classList.add('active');
            item.querySelector('.acc-body').style.display = 'block';
            header.querySelector('i').className = 'fas fa-minus';
        }
    });
});

// Counter-up Animation Logic with auto-scroll trigger
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        if (counter.classList.contains('counted')) return;

        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
                counter.classList.add('counted');
            }
        };
        updateCount();
    });
}
