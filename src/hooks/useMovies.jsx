import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/searchMovies'
// import movieResults from '../Mocks/movieResults.json'

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([])
  const previousSearch = useRef(search)

  //   console.log('useMovies');

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    previousSearch.current = search
    const newMovies = await searchMovies({ search })
    setMovies(newMovies)
  }, [])

  const sortedMovies = useMemo(() => {
    // console.log('Memo executed')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies }
}
