const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const newTabToggle = document.querySelector('#new-tab-toggle');
const shortcuts = document.querySelectorAll('[data-query]');
const clock = document.querySelector('#clock');
const dateLabel = document.querySelector('#date-label');
const recentSearches = document.querySelector('#recent-searches');
const clearHistory = document.querySelector('#clear-history');

const historyKey = 'k-global-searches';

function readSearches() {
  try {
    return JSON.parse(localStorage.getItem(historyKey)) ?? [];
  } catch {
    return [];
  }
}

function saveSearch(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;

  const searches = readSearches().filter((item) => item.toLowerCase() !== cleanQuery.toLowerCase());
  searches.unshift(cleanQuery);
  localStorage.setItem(historyKey, JSON.stringify(searches.slice(0, 6)));
  renderSearches();
}

function renderSearches() {
  const searches = readSearches();
  recentSearches.innerHTML = '';

  if (searches.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Tes recherches Google apparaîtront ici.';
    recentSearches.append(empty);
    return;
  }

  searches.forEach((query) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = query;
    button.addEventListener('click', () => launchSearch(query));
    recentSearches.append(button);
  });
}

function launchSearch(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;

  input.value = cleanQuery;
  saveSearch(cleanQuery);

  const target = `https://www.google.com/search?q=${encodeURIComponent(cleanQuery)}`;
  if (newTabToggle.checked) {
    window.open(target, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = target;
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  dateLabel.textContent = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  launchSearch(input.value);
});

shortcuts.forEach((button) => {
  button.addEventListener('click', () => launchSearch(button.dataset.query));
});

clearHistory.addEventListener('click', () => {
  localStorage.removeItem(historyKey);
  renderSearches();
  input.focus();
});

renderSearches();
updateClock();
setInterval(updateClock, 30_000);
