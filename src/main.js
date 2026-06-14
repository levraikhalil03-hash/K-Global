import './styles.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const luckyButton = document.querySelector('#lucky-button');
const clearButton = document.querySelector('#clear-button');
const resultsPanel = document.querySelector('#results-panel');
const resultsTitle = document.querySelector('#results-title');
const resultsList = document.querySelector('#results-list');
const googleLink = document.querySelector('#google-link');
const googleMode = document.querySelector('#google-mode');
const googleFrame = document.querySelector('#google-frame');
const googleModeQuery = document.querySelector('#google-mode-query');
const exitGoogle = document.querySelector('#exit-google');
const fallbackGoogleLink = document.querySelector('#fallback-google-link');

const suggestions = [
  { title: 'Actualités Google', url: 'https://news.google.com/', description: 'Les dernières actualités classées par Google News.' },
  { title: 'Google Images', url: 'https://www.google.com/imghp', description: 'Recherche visuelle pour explorer des images liées à ta requête.' },
  { title: 'Google Maps', url: 'https://www.google.com/maps', description: 'Adresses, lieux et itinéraires depuis Google Maps.' },
  { title: 'YouTube', url: 'https://www.youtube.com/results', description: 'Vidéos et chaînes associées à la recherche.' }
];

function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function youtubeSearchUrl(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function buildResults(query) {
  return [
    {
      title: `Recherche Google pour « ${query} »`,
      url: googleSearchUrl(query),
      description: 'Ouvre la vraie page de résultats Google pour voir tous les sites trouvés.'
    },
    {
      title: `Images Google : ${query}`,
      url: `${googleSearchUrl(query)}&tbm=isch`,
      description: 'Passe en recherche d’images Google pour la même requête.'
    },
    {
      title: `Vidéos YouTube : ${query}`,
      url: youtubeSearchUrl(query),
      description: 'Trouve des vidéos liées à ta recherche.'
    },
    ...suggestions
  ];
}

function showResults(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;

  const searchUrl = googleSearchUrl(cleanQuery);
  resultsTitle.textContent = `Sites Google pour « ${cleanQuery} »`;
  googleLink.href = searchUrl;
  fallbackGoogleLink.href = searchUrl;
  resultsList.innerHTML = '';

  buildResults(cleanQuery).forEach((result) => {
    const card = document.createElement('article');
    card.className = 'result-card';

    const link = document.createElement('a');
    link.href = result.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = result.title;

    const url = document.createElement('p');
    url.className = 'result-url';
    url.textContent = result.url;

    const description = document.createElement('p');
    description.textContent = result.description;

    card.append(link, url, description);
    resultsList.append(card);
  });

  resultsPanel.hidden = false;
}

function enterGoogleMode(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;
  const url = googleSearchUrl(cleanQuery);
  googleModeQuery.textContent = `Recherche : ${cleanQuery}`;
  googleFrame.src = url;
  fallbackGoogleLink.href = url;
  googleMode.hidden = false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  showResults(input.value);
});

luckyButton.addEventListener('click', () => {
  const query = input.value.trim() || 'K-Global navigateur';
  input.value = query;
  showResults(query);
  enterGoogleMode(query);
});

clearButton.addEventListener('click', () => {
  input.value = '';
  resultsPanel.hidden = true;
  resultsList.innerHTML = '';
  input.focus();
});

exitGoogle.addEventListener('click', () => {
  googleMode.hidden = true;
  googleFrame.src = 'about:blank';
  input.focus();
});
