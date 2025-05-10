import React, { useState } from "react";
import axios from "axios";

function MovieForm({ onMovieAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    director: "",
    year: "",
    genres: "",
    rating: ""
  });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      // Convertir los géneros separados por coma en array
      const newMovie = {
        ...form,
        year: parseInt(form.year),
        rating: parseFloat(form.rating),
        genres: form.genres.split(",").map(g => g.trim())
      };

      axios.post("http://localhost:8080/api/movies/saveMovie", newMovie)
        .then(() => {
          alert("Película agregada con éxito");
          setForm({ title: "", description: "", director: "", year: "", genres: "", rating: "" });
          onMovieAdded(); // Para refrescar la lista
        })
        .catch(err => {
          console.error(err);
          alert("Error al agregar película");
        });
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Agregar nueva película</h2>
        <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <input type="text" name="director" placeholder="Director" value={form.director} onChange={handleChange} />
        <input type="number" name="year" placeholder="Año" value={form.year} onChange={handleChange} />
        <input type="text" name="genres" placeholder="Géneros (separados por coma)" value={form.genres} onChange={handleChange} />
        <input type="number" step="0.1" name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} />
        <button type="submit">Agregar</button>
      </form>
    );
  }

  export default MovieForm;