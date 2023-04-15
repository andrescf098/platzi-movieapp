const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "aplication/json;charset=utf-8",
  },
  params: {
    api_key: "69544131f5e8831ff8d5a6f3321f0a15",
  },
});

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  contentHtml(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const genres = data.genres;
  let category = "";
  genres.forEach((genre) => {
    category += `        
      <div class="category-container">
      <h3 id="id${genre.id}" class="category-title" onclick='viewCategory("${genre.id}", "${genre.name}")'>${genre.name}</h3>
    </div>`;
    categoriesPreviewList.innerHTML = category;
  });
}
function contentHtml(data, html) {
  let content = "";
  data.forEach((item) => {
    content += `        
    <div class="movie-container">
    <img
      src="https://image.tmdb.org/t/p/w300${item.poster_path}"
      class="movie-img"
      onclick="viewMovie(${item.id})"
      alt="${item.title}" />
    </div>`;
    html.innerHTML = content;
  });
}

const viewCategory = (id, name) => {
  location.hash = "#category=" + id + "-" + name;
};
const viewMovie = (id) => {
  location.hash = "#movie=" + id;
};
