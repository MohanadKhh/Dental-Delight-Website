// ── Menu Toggle ──
document.querySelector('[data-menu-toggle]').addEventListener('click', function () {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
});

// ── Init AOS ──
AOS.init({
    once: true,
    offset: 80,
    easing: 'ease-out-quart',
});

// ── Floating particles ──
(function spawnParticles() {
    const host = document.getElementById('particles-host');
    const section = document.getElementById('doctor-profile');
    const count = 18;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        const size = 3 + Math.random() * 5;
        const left = 5 + Math.random() * 90;
        const bottom = Math.random() * 60;
        const dur = 8 + Math.random() * 10;
        const delay = Math.random() * 12;

        Object.assign(el.style, {
            width: size + 'px',
            height: size + 'px',
            left: left + '%',
            bottom: bottom + '%',
            position: 'absolute',
            animationDuration: dur + 's',
            animationDelay: delay + 's',
            opacity: 0,
        });
        section.appendChild(el);
    }
})();

// ── Lightbox ──
function openLightbox(src) {
    document.getElementById('lb-img').src = src;
    document.getElementById('cert-lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('cert-lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('cert-lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
});
