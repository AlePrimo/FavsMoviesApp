
import React, { useState } from "react";
import MovieList from "./MovieList";
import MovieForm from "./MovieForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleMovieAdded = () => {
    setRefresh(!refresh); // fuerza la recarga del listado
  };

  return (
    <div className="App">
      <h1>🎬 Favs Movies App</h1>
      <MovieForm onMovieAdded={handleMovieAdded} />
      <MovieList key={refresh} />
    </div>
  );
}

export default App;