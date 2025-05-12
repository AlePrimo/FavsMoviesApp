import React from "react";
import MovieList from "./MovieList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🎬 Favs Movies App</h1>
      <MovieList />
    </div>
  );
}

export default App;