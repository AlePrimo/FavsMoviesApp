import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieForm({ movieToEdit, onSuccess }) {
  const initialForm = {
    title: "",
    description: "",
    director: "",
    year: "",
    genres: "",
    rating: ""
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (movieToEdit) {
      setForm({
        title: movieToEdit.title || "",
        description: movieToEdit.description || "",
        director: movieToEdit.director || "",
        year: movieToEdit.year || "",
        genres: movieToEdit.genres.join(", ") || "",
        rating: movieToEdit.rating || ""
      });
    } else {
      setForm(initialForm); // Asegura que se limpie al salir del modo edición
    }
  }, [movieToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title: form.title,
      description: form.description,
      director: form.director,
      year: parseInt(form.year),
      genres: form.genres.split(",").map(g => g.trim()),
      rating: parseFloat(form.rating)
    };

    try {
      if (movieToEdit) {
        await axios.put(`http://localhost:8080/api/movies/updateMovie/${movieToEdit.id}`, movieData);
      } else {
        await axios.post("http://localhost:8080/api/movies/saveMovie", movieData);
        setForm(initialForm); // ✔ Vaciar el formulario si se guardó una nueva
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al guardar la película:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{movieToEdit ? "Editar película" : "Agregar nueva película"}</h2>

      <input type="text" name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
      <input type="text" name="director" placeholder="Director" value={form.director} onChange={handleChange} required />
      <input type="number" name="year" placeholder="Año" value={form.year} onChange={handleChange} required />
      <input type="text" name="genres" placeholder="Géneros (separados por coma)" value={form.genres} onChange={handleChange} required />
      <input type="number" step="0.1" name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} required />

      <button type="submit">{movieToEdit ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}

export default MovieForm;
