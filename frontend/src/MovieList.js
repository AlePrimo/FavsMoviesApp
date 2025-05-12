import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");

  const fetchMovies = () => {
    axios.get("http://localhost:8080/api/movies/findAllMovies")
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error al obtener películas:", error));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTitle.trim() === "") return;

    const delayDebounce = setTimeout(() => {
      axios.get(`http://localhost:8080/api/movies/movieByTitle?value=${searchTitle}`)
        .then(response => setMovies([response.data]))
        .catch(() => setMovies([])); // Vaciar si no hay coincidencias
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTitle]);

  const handleSearchByYear = () => {
    if (!searchYear.trim()) return;
    axios.get(`http://localhost:8080/api/movies/movieByYear?value=${searchYear}`)
      .then(response => setMovies(response.data))
      .catch(() => setMovies([]));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/deleteMovieById/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  const handleEdit = (movie) => {
    setMovieToEdit(movie);
  };

  const handleSuccess = () => {
    fetchMovies();
    setMovieToEdit(null);
  };

  const handleShowAll = () => {
    setSearchTitle("");
    setSearchYear("");
    fetchMovies();
  };

  return (
    <div>
      <MovieForm movieToEdit={movieToEdit} onSuccess={handleSuccess} />

      <div>
        <h2>Buscar películas</h2>

        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <input
            type="number"
            placeholder="Buscar por año"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
          />
          <button onClick={handleSearchByYear}>Buscar</button>
        </div>

        <button onClick={handleShowAll} style={{ marginTop: "10px" }}>
          Mostrar todas las películas
        </button>
      </div>

      <h2>Listado de películas</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - ⭐ {movie.rating}
            <br />
            <em>{movie.director}</em> - {movie.genres.join(", ")}
            <p>{movie.description}</p>
            <button onClick={() => handleEdit(movie)}>Editar</button>
            <button onClick={() => handleDelete(movie.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;