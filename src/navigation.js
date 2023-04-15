window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.scrollTo(0, 0);
searchFormBtn.addEventListener("click", () => {
  query = searchFormInput.value;
  location.hash = "#search=" + searchFormInput.value;
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
arrowBtn.addEventListener("click", () => {
  history.back();
});

function hash() {
  window.scrollTo(0, 0);
  return {
    trends() {
      headerSection.classList.remove("header-container--long");
      headerSection.style.background = "";
      arrowBtn.classList.remove("inactive");
      arrowBtn.classList.remove("header-arrow--white");
      headerTitle.classList.add("inactive");
      headerCategoryTitle.classList.remove("inactive");
      searchForm.classList.add("inactive");
      //Trending section
      trendingPreviewSection.classList.add("inactive");
      categoriesPreviewSection.classList.add("inactive");
      genericSection.classList.remove("inactive");
      movieDetailSection.classList.add("inactive");
      getTrendingMovies("Tendencias");
    },
    search() {
      headerSection.classList.remove("header-container--long");
      headerSection.style.background = "";
      arrowBtn.classList.remove("inactive");
      arrowBtn.classList.remove("header-arrow--white");
      headerTitle.classList.add("inactive");
      headerCategoryTitle.classList.remove("inactive");
      searchForm.classList.remove("inactive");
      //Trending section
      trendingPreviewSection.classList.add("inactive");
      categoriesPreviewSection.classList.add("inactive");
      genericSection.classList.remove("inactive");
      movieDetailSection.classList.add("inactive");
      const [_, query] = location.hash.split('=');
      getMoviesBySearch(query);
    },
    movie() {
      headerSection.classList.add("header-container--long");
      //   headerSection.style.background = "";
      arrowBtn.classList.remove("inactive");
      arrowBtn.classList.add("header-arrow--white");
      headerTitle.classList.add("inactive");
      headerCategoryTitle.classList.add("inactive");
      searchForm.classList.add("inactive");
      //Trending section
      trendingPreviewSection.classList.add("inactive");
      categoriesPreviewSection.classList.add("inactive");
      genericSection.classList.add("inactive");
      movieDetailSection.classList.remove("inactive");
      const [_, movieId] = location.hash.split('=');
      getMovieDetails(movieId);
    },
    category() {
      headerSection.classList.remove("header-container--long");
      headerSection.style.background = "";
      arrowBtn.classList.remove("inactive");
      arrowBtn.classList.remove("header-arrow--white");
      headerTitle.classList.add("inactive");
      headerCategoryTitle.classList.remove("inactive");
      searchForm.classList.add("inactive");

      trendingPreviewSection.classList.add("inactive");
      categoriesPreviewSection.classList.add("inactive");
      genericSection.classList.remove("inactive");
      movieDetailSection.classList.add("inactive");
      const [_, categoryData] = location.hash.split('=');
      const [categoryId, categoryName] = categoryData.split('-');

      headerCategoryTitle.innerHTML = categoryName;
      getMoviesByCategory(categoryId, categoryName);
    },
    home() {
      headerSection.classList.remove("header-container--long");
      headerSection.style.background = "";
      arrowBtn.classList.add("inactive");
      arrowBtn.classList.remove("header-arrow--white");
      headerTitle.classList.remove("inactive");
      headerCategoryTitle.classList.add("inactive");
      searchForm.classList.remove("inactive");
      //Trending section
      trendingPreviewSection.classList.remove("inactive");
      categoriesPreviewSection.classList.remove("inactive");
      genericSection.classList.add("inactive");
      movieDetailSection.classList.add("inactive");

      getTrendingMoviesPreview();
      getCategoriesPreview();
    },
  };
}
async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  contentHtml(movies, genericSection);
}
async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query: query,
    },
  });
  headerCategoryTitle.innerText = query;
  const movies = data.results;
  contentHtml(movies, genericSection);
}
async function getTrendingMovies(name) {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  headerCategoryTitle.innerText = name;
  contentHtml(movies, genericSection);
}
async function getMovieDetails(id) {
  const { data: movie } = await api(`movie/${id}`);
  const movieCategories = movie.genres;
  movieDetailTitle.textContent = movie.original_title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);
  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url('${movieImgUrl}')`;
  let categoriesList = "";
  movieCategories.map((genre) => {
    categoriesList += `
    <div class="category-container">
      <h3 id="id${genre.id}" class="category-title" onclick='viewCategory("${genre.id}", "${genre.name}")'>${genre.name}</h3>
    </div>`;
    movieDetailCategoriesList.innerHTML = categoriesList;
    getSimilarMoves(movie.id)
  });
}
async function getSimilarMoves(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const movies = data.results;
  contentHtml(movies, relatedMoviesContainer);
}

function navigator() {
  const hashResponse = hash();
  if (location.hash.startsWith("#trends")) {
    hashResponse.trends();
  } else if (location.hash.startsWith("#search=")) {
    hashResponse.search();
  } else if (location.hash.startsWith("#movie=")) {
    hashResponse.movie();
  } else if (location.hash.startsWith("#category=")) {
    hashResponse.category();
  } else {
    hashResponse.home();
  }
}
