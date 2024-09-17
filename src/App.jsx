import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar por vacío')
      return
    }

    if (search.length < 3) {
      setError('Debe escribir minimo 3 letras')
      return
    }

    setError('')
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log('debouncedGetMovies')

      getMovies({ search })
    }, 500),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    // const fields = Object.fromEntries(new FormData(event.target))
    // const { query } = fields
    // console.log(query)
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setSearch(newQuery)
    debouncedGetMovies(newQuery)
  }

  return (
    <div className='page'>
      <h2>Buscador de peliculas</h2>
      <header>
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            id='query'
            placeholder='Avengers, Matrix, Titanic...'
            value={search}
            onChange={handleChange}
          />
          <button type='submit'>Buscar</button>
          <input type='checkbox' name='sort' id='sort' onChange={handleSort} />
          <label htmlFor='sort'>Ordenar por título</label>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <h2>Resultados</h2>
        <div>{<Movies movies={movies} />}</div>
      </main>
    </div>
  )
}

export default App
