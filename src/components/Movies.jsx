const ListOfMovies = ({ movies }) => {
  return (
    <ul className='results'>
      {movies?.map((movie) => {
        return (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </li>
        )
      })}
    </ul>
  )
}

const NoMoviesResults = () => {
  return (
    <div className='results'>
      <h3>No se encontraron resultados</h3>
    </div>
  )
}

export const Movies = ({ movies }) => {
  if (movies?.length === 0) {
    return <NoMoviesResults />
  }
  return <ListOfMovies movies={movies} />
}
