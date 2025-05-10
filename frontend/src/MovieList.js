import React, { useEffect, useState } from "react";
import axios from "axios";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/movies/findAllMovies")
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error al obtener películas:", error));
  }, []);

  return (
    <div>
      <h2>Listado de películas</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - ⭐ {movie.rating}
            <br />
            <em>{movie.director}</em> - {movie.genres.join(", ")}
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;