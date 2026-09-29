

// Counter animation
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            counter.textContent = target;
        }
    };

    requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

