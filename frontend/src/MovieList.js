import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);

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
    setMovieToEdit(null); // Limpiar formulario
  };

  return (
    <div>
      <MovieForm movieToEdit={movieToEdit} onSuccess={handleSuccess} />

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