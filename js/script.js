const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const slideInterval = 5000;
let activeSlide = 0;
let heroTimer;
const sloganTrack = document.querySelector('[data-loop="slogan"]');
const sloganGroup = sloganTrack.firstElementChild;
const sloganItem = sloganGroup.firstElementChild;
const momentTrack = document.querySelector('[data-loop="moment"]');
const momentSpeedPixelsPerSecond = 16;

function showNextSlide() {
  const nextIndex = (activeSlide + 1) % heroSlides.length;
  const nextSlide = heroSlides[nextIndex];
  if (!nextSlide.complete || !nextSlide.naturalWidth) return;

  heroSlides[activeSlide].removeAttribute('data-active');
  heroSlides[activeSlide].setAttribute('aria-hidden', 'true');
  nextSlide.setAttribute('data-active', '');
  nextSlide.removeAttribute('aria-hidden');
  activeSlide = nextIndex;
}

function updateHeroTimer() {
  window.clearInterval(heroTimer);
  if (heroSlides.length > 1 && !reducedMotion.matches && !document.hidden) {
    heroTimer = window.setInterval(showNextSlide, slideInterval);
  }
}

function duplicateGroup(track, group) {
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  track.append(duplicate);
  track.setAttribute('data-ready', '');
}

function sizeSlogan() {
  const viewportWidth = sloganTrack.parentElement.clientWidth;
  const itemWidth = sloganItem.getBoundingClientRect().width;
  const copies = Math.max(2, Math.ceil(viewportWidth / itemWidth) + 1);

  sloganTrack.style.setProperty('--loop-duration', `${copies * itemWidth / 96}s`);
  if (sloganGroup.children.length === copies && sloganTrack.children.length === 2) return;

  sloganTrack.removeAttribute('data-ready');
  sloganGroup.replaceChildren(sloganItem);
  for (let index = 1; index < copies; index += 1) {
    sloganGroup.append(sloganItem.cloneNode(true));
  }
  sloganTrack.replaceChildren(sloganGroup);
  duplicateGroup(sloganTrack, sloganGroup);
}

function sizeMoments() {
  const groupWidth = momentTrack.firstElementChild.getBoundingClientRect().width;
  momentTrack.style.setProperty('--loop-duration', `${groupWidth / momentSpeedPixelsPerSecond}s`);
}

sizeSlogan();
duplicateGroup(momentTrack, momentTrack.firstElementChild);
sizeMoments();

window.addEventListener('resize', () => {
  sizeSlogan();
  sizeMoments();
});

updateHeroTimer();
reducedMotion.addEventListener('change', updateHeroTimer);
document.addEventListener('visibilitychange', updateHeroTimer);

document.addEventListener('click', (event) => {
  event.target.closest('.action')?.setAttribute('data-activated', '');
});

const details = document.querySelector('.details');
const detailsTitle = document.querySelector('#details-title');
const detailsContent = details.querySelector('.details-content');

document.querySelectorAll('[data-panel]').forEach((button) => {
  button.addEventListener('click', () => {
    const template = document.getElementById(button.dataset.panel);
    detailsTitle.textContent = template.dataset.title;
    detailsContent.replaceChildren(template.content.cloneNode(true));
    details.showModal();
  });
});

details.addEventListener('click', (event) => {
  if (event.target === details) details.close();
});
