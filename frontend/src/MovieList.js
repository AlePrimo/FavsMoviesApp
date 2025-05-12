import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [titleQuery, setTitleQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (titleQuery.trim() === "") {
      fetchMovies();
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(`http://localhost:8080/api/movies/movieByTitle?value=${titleQuery}`)
        .then((response) => {
          // Si el back devuelve una lista:
          setMovies(Array.isArray(response.data) ? response.data : [response.data]);
        })
        .catch(() => setMovies([]));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [titleQuery]);

  const fetchMovies = () => {
    axios
      .get("http://localhost:8080/api/movies/findAllMovies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error al obtener películas:", error));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/deleteMovieById/${id}`);
      setMovies(movies.filter((movie) => movie.id !== id));
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

  const handleReset = () => {
    setTitleQuery("");
    setYearQuery("");
    fetchMovies();
  };

  const handleSearchByYear = async () => {
    if (yearQuery.trim() === "") return;
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/movieByYear?value=${yearQuery}`);
      setMovies(response.data); // se asume que devuelve una lista
    } catch (error) {
      console.error("Error al buscar por año:", error);
      setMovies([]);
    }
  };

  return (
    <div>
      <MovieForm movieToEdit={movieToEdit} onSuccess={handleSuccess} />

      <h2>🎬 Listado de películas</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Buscar por año..."
          value={yearQuery}
          onChange={(e) => setYearQuery(e.target.value)}
        />
        <button onClick={handleSearchByYear}>Buscar</button>
      </div>

      <button onClick={handleReset}>Mostrar todas</button>

      {movies.length === 0 ? (
        <p>No se encontraron películas.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
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
      )}
    </div>
  );
}

export default MovieList;