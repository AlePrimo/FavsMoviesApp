package com.aleprimo.favsMoviesApp.persistence;

import com.aleprimo.favsMoviesApp.entities.Movie;

import java.util.List;


public interface IMovieDAO {

    List<Movie> findAllMovies();
    Movie findMovieById(Long id);
    Movie findByTitle(String title);
    List<Movie> findByYear(int year);
    void saveMovie(Movie movie);
    void deleteMovieById(Long id);

}
