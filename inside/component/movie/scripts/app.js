const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const searchInput = document.querySelector("#movie-search");
const clearSearch = document.querySelector("#clear-search");
const movieCards = document.querySelectorAll(".movie-card");
const trailerModal = document.querySelector("#trailer-modal");
const trailerFrame = document.querySelector("#trailer-frame");
const closeTrailer = document.querySelector(".close-trailer");
const trailerButtons = document.querySelectorAll(".trailer-button");
const globalSearchForm = document.querySelector("#global-search-form");
const globalMovieSearch = document.querySelector("#global-movie-search");
const tmdbSearchLink = document.querySelector("#tmdb-search-link");
const imdbSearchLink = document.querySelector("#imdb-search-link");
const justwatchSearchLink = document.querySelector("#justwatch-search-link");
const youtubeSearchLink = document.querySelector("#youtube-search-link");

function setMenu(open) {
    menu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
}

function filterMovies() {
    const query = searchInput.value.trim().toLowerCase();

    movieCards.forEach((card) => {
        const title = card.dataset.title.toLowerCase();
        card.hidden = query.length > 0 && !title.includes(query);
    });
}

function openTrailer(src) {
    trailerFrame.src = `${src}?autoplay=1`;
    trailerModal.classList.add("active");
    trailerModal.setAttribute("aria-hidden", "false");
}

function closeTrailerModal() {
    trailerFrame.src = "";
    trailerModal.classList.remove("active");
    trailerModal.setAttribute("aria-hidden", "true");
}

function updateGlobalLinks() {
    const query = globalMovieSearch.value.trim() || "latest movies";
    const encodedQuery = encodeURIComponent(query);

    tmdbSearchLink.href = `https://www.themoviedb.org/search?query=${encodedQuery}`;
    imdbSearchLink.href = `https://www.imdb.com/find/?q=${encodedQuery}&s=tt`;
    justwatchSearchLink.href = `https://www.justwatch.com/us/search?q=${encodedQuery}`;
    youtubeSearchLink.href = `https://www.youtube.com/results?search_query=${encodedQuery}+official+trailer`;
}

menuToggle.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
});

searchInput.addEventListener("input", filterMovies);

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    filterMovies();
    searchInput.focus();
});

globalMovieSearch.addEventListener("input", updateGlobalLinks);

globalSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateGlobalLinks();
    window.open(tmdbSearchLink.href, "_blank", "noopener,noreferrer");
});

trailerButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openTrailer(button.dataset.trailer);
    });
});

closeTrailer.addEventListener("click", closeTrailerModal);

trailerModal.addEventListener("click", (event) => {
    if (event.target === trailerModal) {
        closeTrailerModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeTrailerModal();
        setMenu(false);
    }
});

updateGlobalLinks();
