const searchForm = document.querySelector("#movie-list-search");
const searchInput = document.querySelector("#search");
const movieItems = document.querySelectorAll("[data-title]");
const tmdbLink = document.querySelector("#list-tmdb-link");
const imdbLink = document.querySelector("#list-imdb-link");
const justwatchLink = document.querySelector("#list-justwatch-link");

function updateLinks() {
    const query = searchInput.value.trim() || "latest movies";
    const encodedQuery = encodeURIComponent(query);

    tmdbLink.href = `https://www.themoviedb.org/search?query=${encodedQuery}`;
    imdbLink.href = `https://www.imdb.com/find/?q=${encodedQuery}&s=tt`;
    justwatchLink.href = `https://www.justwatch.com/us/search?q=${encodedQuery}`;
}

function filterLocalMovies() {
    const query = searchInput.value.trim().toLowerCase();

    movieItems.forEach((item) => {
        item.hidden = query.length > 0 && !item.dataset.title.toLowerCase().includes(query);
    });
}

searchInput.addEventListener("input", () => {
    filterLocalMovies();
    updateLinks();
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateLinks();
    window.open(tmdbLink.href, "_blank", "noopener,noreferrer");
});

updateLinks();
