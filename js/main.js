const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const toggleMenu = (open) => {
  document.body.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  mobileMenu?.setAttribute('aria-hidden', String(!open));
};

menuToggle?.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-service]').forEach((service) => {
  const trigger = service.querySelector('.service-trigger');
  trigger?.addEventListener('click', () => {
    const wasActive = service.classList.contains('is-active');
    document.querySelectorAll('[data-service]').forEach((item) => {
      item.classList.remove('is-active');
      item.querySelector('.service-trigger')?.setAttribute('aria-expanded', 'false');
    });
    if (!wasActive) {
      service.classList.add('is-active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
  }, { passive: true });
}

const testimonials = [
  { quote: 'They created a perfect logo for our academy and provided excellent guidance on our business ideas and design.', name: 'Neha Nihal', role: 'Founder, Learn It — Oman' },
  { quote: 'I love their designing skills. Wyte Studio brings a clear point of view to every part of the business.', name: 'Mohsin Moza', role: 'Founder, client partner' },
  { quote: 'Our logo re-design was good and they handle social media consistently.', name: 'Steve', role: 'CEO, Pro Studios' },
  { quote: 'They created a brand identity that reflects our business in a way we could not articulate ourselves.', name: 'Marzouk Afiel', role: 'Dubai Corporative Hub' },
  { quote: 'Their work feels thoughtful, ambitious and genuinely connected to the audience we want to reach.', name: 'Abu Becker', role: 'Civi-tech' }
];
let testimonialIndex = 0;
const quote = document.querySelector('.testimonial-main .heading-xl');
const byline = document.querySelector('.testimonial-byline');
const count = document.querySelector('[data-testimonial-count]');
const renderTestimonial = () => {
  const item = testimonials[testimonialIndex];
  if (quote) quote.textContent = `“${item.quote}”`;
  if (byline) {
    const content = byline.querySelector('div:not(.testimonial-controls)');
    if (content) content.innerHTML = `<strong>${item.name}</strong><span>${item.role}</span>`;
  }
  if (count) count.textContent = `${String(testimonialIndex + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}`;
};
document.querySelector('[data-testimonial-next]')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % testimonials.length; renderTestimonial(); });
document.querySelector('[data-testimonial-prev]')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length; renderTestimonial(); });

if (!prefersReducedMotion) {
  document.querySelectorAll('.case-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--pointer-x', `${x}%`);
      card.style.setProperty('--pointer-y', `${y}%`);
    });
  });
}

const caseStudies = {
  hane: { kicker: 'F&B / 01', title: 'Hane Patisserie', description: 'A refined identity for a premium dessert brand specialising in indulgent, high-quality tiramisu. We shaped a visual world that reflects craftsmanship, richness and the fine details of the product.', industry: 'Food & Beverage', services: 'Branding · Art direction' },
  learnit: { kicker: 'Education / 02', title: 'Learnit', description: 'A modern, approachable identity for an e-learning platform dedicated to helping learners improve their English language skills through accessible and engaging digital education.', industry: 'Education', services: 'Logo design · Branding' },
  truetrader: { kicker: 'Trading / 03', title: 'TrueTrader', description: 'A seamless and intuitive trading experience designed around clear navigation, usability and confidence. We created the product UI/UX and the visual system that supports the journey across the platform.', industry: 'Trading', services: 'Application UI/UX design' },
  dreamgold: { kicker: 'Sporting / 04', title: 'Dream Gold', description: 'A distinctive visual identity and social media direction for a sports-focused brand building a stronger presence in the sporting industry and a more engaging connection with its audience.', industry: 'Sporting', services: 'Branding · Social media management' }
};
const caseModal = document.querySelector('[data-case-modal]');
const caseModalTitle = document.querySelector('[data-case-modal-title]');
const caseModalKicker = document.querySelector('[data-case-modal-kicker]');
const caseModalDescription = document.querySelector('[data-case-modal-description]');
const caseModalIndustry = document.querySelector('[data-case-modal-industry]');
const caseModalServices = document.querySelector('[data-case-modal-services]');
const openCase = (key) => {
  const item = caseStudies[key];
  if (!item || !caseModal) return;
  caseModalTitle.textContent = item.title;
  caseModalKicker.textContent = item.kicker;
  caseModalDescription.textContent = item.description;
  caseModalIndustry.textContent = item.industry;
  caseModalServices.textContent = item.services;
  caseModal.classList.add('is-open');
  caseModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  caseModal.querySelector('[data-case-close]')?.focus();
};
const closeCase = () => { caseModal?.classList.remove('is-open'); caseModal?.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); };
document.querySelectorAll('[data-case]').forEach((card) => {
  card.addEventListener('click', () => openCase(card.dataset.case));
  card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCase(card.dataset.case); } });
});
document.querySelectorAll('[data-case-close]').forEach((element) => element.addEventListener('click', closeCase));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCase(); });
/* Change hero background only while Explore the work is hovered */
(() => {
  const hero = document.querySelector(".hero");
  const explore = hero?.querySelector(".circle-link");

  if (!hero || !explore) return;

  explore.addEventListener("mouseenter", () => {
    hero.classList.add("is-work-hover");
  });

  explore.addEventListener("mouseleave", () => {
    hero.classList.remove("is-work-hover");
  });
})();