const steps = [...document.querySelectorAll('.step')];
let current = 1;

const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');

function renderStep() {
  steps.forEach((step) => step.classList.toggle('active', Number(step.dataset.step) === current));
  const pct = Math.round((current / 5) * 100);
  progressText.textContent = `Step ${current} of 5 (${pct}%)`;
  progressBar.value = pct;
}

document.querySelectorAll('.next-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (current < 5) current += 1;
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.querySelectorAll('.prev-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (current > 1) current -= 1;
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

const products = ['T-Shirt','Hoodie','Polo','Hat','Jacket','Safety Vest','Beanie','Tote Bag'];
const productList = document.getElementById('productList');
const addItemBtn = document.getElementById('addItem');

function addProductRow(name = products[0]) {
  const row = document.createElement('div');
  row.className = 'inline';
  row.style.marginBottom = '.6rem';
  row.innerHTML = `
    <select>${products.map((p) => `<option ${p===name?'selected':''}>${p}</option>`).join('')}</select>
    <input type="number" min="0" placeholder="Quantity" />
  `;
  productList.appendChild(row);
}

if (productList) {
  addProductRow();
  addItemBtn.addEventListener('click', () => addProductRow(products[(productList.children.length) % products.length]));
}

const modeBtns = document.querySelectorAll('.mode-btn');
const bundleMode = document.getElementById('bundleMode');
const individualMode = document.getElementById('individualMode');
modeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modeBtns.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    const isBundle = btn.dataset.mode === 'bundle';
    bundleMode.style.display = isBundle ? 'grid' : 'none';
    individualMode.style.display = isBundle ? 'none' : 'block';
  });
});

const logoBtns = document.querySelectorAll('.logo-btn');
const logoYes = document.getElementById('logoYes');
const logoNo = document.getElementById('logoNo');
logoBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    logoBtns.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    const hasLogo = btn.dataset.logo === 'yes';
    logoYes.style.display = hasLogo ? 'block' : 'none';
    logoNo.style.display = hasLogo ? 'none' : 'block';
  });
});

const noSizes = document.getElementById('noSizes');
const sizesWrap = document.getElementById('sizesWrap');
if (noSizes) {
  noSizes.addEventListener('change', () => {
    sizesWrap.style.display = noSizes.checked ? 'none' : 'grid';
  });
}
