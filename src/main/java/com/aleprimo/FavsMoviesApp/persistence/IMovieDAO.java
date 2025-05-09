package com.aleprimo.FavsMoviesApp.persistence;

import com.aleprimo.FavsMoviesApp.entities.Movie;

import java.util.List;
import java.util.Optional;

public interface IMovieDAO {

    List<Movie> findAllMovies();
    Movie findMovieById(Long id);
    Movie findByTitle(String title);
    void saveMovie(Movie movie);
    void deleteMovieById(Long id);

}
