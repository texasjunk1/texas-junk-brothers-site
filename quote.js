const steps = Array.from(document.querySelectorAll('.quote-step[data-step]')).filter(s => s.dataset.step !== '6');
const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const nextButtons = document.querySelectorAll('.next-btn');
const form = document.getElementById('funnelForm');
const confirmation = document.getElementById('confirmation');
let current = 1;

function renderStep() {
  steps.forEach(step => step.classList.toggle('active', Number(step.dataset.step) === current));
  const pct = Math.round((current / 5) * 100);
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `Step ${current} of 5 (${pct}%)`;
}

nextButtons.forEach(btn => btn.addEventListener('click', () => {
  if (current < 5) {
    current += 1;
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

document.querySelectorAll('.select-choice').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.choice-card').forEach(card => card.classList.remove('selected'));
    btn.closest('.choice-card')?.classList.add('selected');
  });
});

const tabs = document.querySelectorAll('[data-tab]');
const bundleOptions = document.getElementById('bundleOptions');
const individualOptions = document.getElementById('individualOptions');

tabs.forEach(tab => tab.addEventListener('click', () => {
  const bundleMode = tab.dataset.tab === 'bundle';
  bundleOptions.style.display = bundleMode ? 'grid' : 'none';
  individualOptions.style.display = bundleMode ? 'none' : 'grid';
  tabs.forEach(t => t.className = 'btn btn-ghost');
  tab.className = bundleMode ? 'btn btn-secondary' : 'btn btn-secondary';
}));

const logoRadios = document.querySelectorAll('input[name="hasLogo"]');
const yesLogo = document.getElementById('yesLogo');
const noLogo = document.getElementById('noLogo');
logoRadios.forEach(r => r.addEventListener('change', () => {
  const yes = document.querySelector('input[name="hasLogo"]:checked')?.value === 'yes';
  yesLogo.style.display = yes ? 'grid' : 'none';
  noLogo.style.display = yes ? 'none' : 'grid';
}));

const noSizesYet = document.getElementById('noSizesYet');
const sizeFields = document.getElementById('sizeFields');
noSizesYet?.addEventListener('change', () => {
  sizeFields.style.display = noSizesYet.checked ? 'none' : 'grid';
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.display = 'none';
  confirmation.classList.add('active');
  progressBar.style.width = '100%';
  progressLabel.textContent = 'Step 5 of 5 (100%)';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderStep();
