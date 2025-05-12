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

  const handleSearchByTitle = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/movieByTitle`, {
        params: { value: searchTitle }
      });
      setMovies([response.data]); // se espera una sola película
    } catch (error) {
      console.error("Error al buscar por título:", error);
      setMovies([]);
    }
  };

  const handleSearchByYear = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/movieByYear`, {
        params: { value: searchYear }
      });
      setMovies(response.data); // se espera una lista
    } catch (error) {
      console.error("Error al buscar por año:", error);
      setMovies([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTitle("");
    setSearchYear("");
    fetchMovies();
  };

  return (
    <div>
      <MovieForm movieToEdit={movieToEdit} onSuccess={handleSuccess} />

      <h2>Buscar películas</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button onClick={handleSearchByTitle}>Buscar por título</button>
      </div>

      <div>
        <input
          type="number"
          placeholder="Buscar por año"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <button onClick={handleSearchByYear}>Buscar por año</button>
      </div>

      <div>
        <button onClick={handleClearSearch}>Limpiar búsqueda</button>
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