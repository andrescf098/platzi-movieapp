const URI = "https://api.themoviedb.org/3";
const apiKey = "?api_key=69544131f5e8831ff8d5a6f3321f0a15";


const imgList = document.querySelector(".trendingPreview-movieList");
const categoriesList = document.querySelector(".categoriesPreview-list");

async function getTrendingMoviesPreview() {
  const res = await fetch(URI + "/trending/movie/day" + apiKey);
  const data = await res.json();
  const movies = data.results;
  let imgCard = "";
  movies.forEach((movie) => {
    imgCard += `        
    <div class="movie-container">
    <img
      src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
      class="movie-img"
      alt="${movie.title}"
    />`;
    imgList.innerHTML = imgCard;
  });
}
async function getCategoriesPreview() {
  const res = await fetch(URI + "/genre/movie/list" + apiKey);
  const data = await res.json();
  const genres = data.genres;
  let category = "";
  genres.forEach((genre) => {
    category += `        
      <div class="category-container">
      <h3 id="id${genre.id}" class="category-title">${genre.name}</h3>
    </div>`;
    categoriesList.innerHTML = category;
  });
}
getTrendingMoviesPreview();
getCategoriesPreview();
