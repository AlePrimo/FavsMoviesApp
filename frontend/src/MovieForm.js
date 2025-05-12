import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieForm({ movieToEdit, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    director: "",
    year: "",
    genres: "",
    rating: ""
  });

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
      setForm({
        title: "",
        description: "",
        director: "",
        year: "",
        genres: "",
        rating: ""
      });
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
      }

      setForm({
        title: "",
        description: "",
        director: "",
        year: "",
        genres: "",
        rating: ""
      });

      onSuccess();
    } catch (error) {
      console.error("Error al guardar la película:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-sm bg-light">
      <h4 className="mb-3">{movieToEdit ? "Editar película" : "Agregar nueva película"}</h4>

      {["title", "description", "director", "year", "genres", "rating"].map(field => (
        <div className="mb-3" key={field}>
          <input
            type={field === "year" || field === "rating" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="form-control"
            step={field === "rating" ? "0.1" : undefined}
            required
          />
        </div>
      ))}

      <button type="submit" className="btn btn-success">
        {movieToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default MovieForm;