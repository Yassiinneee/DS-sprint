// Mock movie data
const movies = [
  { id: 1, title: 'Avengers Endgame', poster: 'https://via.placeholder.com/200x300?text=Avengers+Endgame' },
  { id: 2, title: 'Spider-Man No Way Home', poster: 'https://via.placeholder.com/200x300?text=Spider-Man+No+Way+Home' },
  { id: 3, title: 'Oppenheimer', poster: 'https://via.placeholder.com/200x300?text=Oppenheimer' },
  { id: 4, title: 'The Dark Knight', poster: 'https://via.placeholder.com/200x300?text=The+Dark+Knight' },
  { id: 5, title: 'Inception', poster: 'https://via.placeholder.com/200x300?text=Inception' },
  { id: 6, title: 'Interstellar', poster: 'https://via.placeholder.com/200x300?text=Interstellar' },
  { id: 7, title: 'The Shawshank Redemption', poster: 'https://via.placeholder.com/200x300?text=The+Shawshank+Redemption' },
  { id: 8, title: 'Pulp Fiction', poster: 'https://via.placeholder.com/200x300?text=Pulp+Fiction' },
  { id: 9, title: 'The Godfather', poster: 'https://via.placeholder.com/200x300?text=The+Godfather' },
  { id: 10, title: 'Fight Club', poster: 'https://via.placeholder.com/200x300?text=Fight+Club' },
  { id: 11, title: 'Forrest Gump', poster: 'https://via.placeholder.com/200x300?text=Forrest+Gump' },
  { id: 12, title: 'The Matrix', poster: 'https://via.placeholder.com/200x300?text=The+Matrix' },
  { id: 13, title: 'Goodfellas', poster: 'https://via.placeholder.com/200x300?text=Goodfellas' },
  { id: 14, title: 'The Silence of the Lambs', poster: 'https://via.placeholder.com/200x300?text=The+Silence+of+the+Lambs' },
  { id: 5, title: 'Se7en', poster: 'https://via.placeholder.com/200x300?text=Se7en' },
  { id: 16, title: 'The Social Network', poster: 'https://via.placeholder.com/200x300?text=The+Social+Network' },
  { id: 17, title: 'Parasite', poster: 'https://via.placeholder.com/200x300?text=Parasite' },
  { id: 18, title: 'Whiplash', poster: 'https://via.placeholder.com/200x300?text=Whiplash' },
  { id: 19, title: 'La La Land', poster: 'https://via.placeholder.com/200x300?text=La+La+Land' },
  { id: 20, title: 'The Irishman', poster: 'https://via.placeholder.com/200x300?text=The+Irishman' },
];

// Pagination settings
const moviesPerPage = 5;
let currentPage = 0;

// DOM elements
const gallery = document.getElementById('movie-gallery');
const loadMoreBtn = document.getElementById('load-more');

// Get a slice of movies for the current page
function getMoviesPage() {
  const start = currentPage * moviesPerPage;
  const end = start + moviesPerPage;
  return movies.slice(start, end);
}

// Render movie cards to the DOM
function renderMovies(moviesChunk) {
  moviesChunk.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    gallery.appendChild(card);
  });
}

// Debounce function to throttle scroll events
function debounce(func, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

// Initial load
renderMovies(getMoviesPage());

// Load more on button click
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  renderMovies(getMoviesPage());
  if (currentPage * moviesPerPage >= movies.length) {
    loadMoreBtn.style.display = 'none'; // Hide button if all movies are loaded
  }
});

// Infinite scroll: Load more on scroll
window.addEventListener('scroll', debounce(() => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    currentPage++;
    renderMovies(getMoviesPage());
    if (currentPage * moviesPerPage >= movies.length) {
      window.removeEventListener('scroll', debounce); // Stop listening if all movies are loaded
    }
  }
}, 300));
