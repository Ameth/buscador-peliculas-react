const API_KEY = '&apikey=caa2c2e8'
const API_URL = 'https://www.omdbapi.com/'

export const searchMovies = async ({ search }) => {
  if (search === '') return

  try {
    const response = await fetch(`${API_URL}?s=${search}${API_KEY}`)
    const json = await response.json()
    const movies = json.Search

    // console.log(movies);
    
    return movies?.map((movie) => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }
    })
  } catch (error) {
    throw new Error('Error al buscar peliculas')
  }
}
