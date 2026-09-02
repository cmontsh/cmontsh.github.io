const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = 'true';
    const target = Number(entry.target.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 28));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      entry.target.textContent = current;
    }, 35);
  });
}, { threshold: .7 });
counters.forEach(c => counterObserver.observe(c));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const projects = {
  agriwue: {
    kicker: 'OPEN-SOURCE RESEARCH TOOL',
    title: 'AgriWUE-SA',
    body: 'A proposed Python toolkit for analysing plant water-use efficiency, stomatal conductance, soil moisture and weather data. The long-term vision is a lightweight dashboard that helps researchers compare plant stress responses across Southern African environments.',
    tags: ['Python', 'Statistics', 'Plant Physiology', 'Climate Data']
  },
  agribiosync: {
    kicker: 'AGRI-TECH PLATFORM CONCEPT',
    title: 'AgriBioSync',
    body: 'A platform concept connecting farmers with agricultural laboratories and researchers. The workflow could support sample submission, test tracking, laboratory results, interpretation and practical recommendations in one place.',
    tags: ['Agri-Tech', 'Farmer Services', 'Laboratories', 'Platform Design']
  },
  climate: {
    kicker: 'FUTURE RESEARCH DIRECTION',
    title: 'Climate-Resilient Crop Systems',
    body: 'A research direction focused on South African crop genetic resources, integrating agronomic performance, nutritional quality and climate-resilience traits to support food security and adaptation.',
    tags: ['Food Security', 'Crop Science', 'Genetic Resources', 'Climate Resilience']
  }
};
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalBody = document.getElementById('modalBody');
const modalTags = document.getElementById('modalTags');
function openProject(key){
  const p = projects[key]; if(!p) return;
  modalTitle.textContent = p.title; modalKicker.textContent = p.kicker; modalBody.textContent = p.body;
  modalTags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
document.querySelectorAll('.project-card').forEach(card => card.querySelector('.project-open').addEventListener('click', () => openProject(card.dataset.project)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

document.getElementById('year').textContent = new Date().getFullYear();
