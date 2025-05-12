package com.aleprimo.favsMoviesApp.services;

import com.aleprimo.favsMoviesApp.entities.Movie;

import java.util.List;

public interface IMovieService {

    List<Movie> findAllMovies();
    Movie findMovieById(Long id);
    List<Movie> findByYear(int year);
    void saveMovie(Movie movie);
    void deleteMovieById(Long id);
    List<Movie> findByTitle(String title);



}
