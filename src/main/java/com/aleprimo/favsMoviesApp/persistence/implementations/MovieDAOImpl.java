package com.aleprimo.favsMoviesApp.persistence.implementations;

import com.aleprimo.favsMoviesApp.entities.Movie;
import com.aleprimo.favsMoviesApp.persistence.IMovieDAO;
import com.aleprimo.favsMoviesApp.repositories.IMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.NoSuchElementException;

@Repository
public class MovieDAOImpl implements IMovieDAO {

    @Autowired
    private IMovieRepository movieRepository;

    @Override
    public List<Movie> findAllMovies() {
        return (List<Movie>) this.movieRepository.findAll();
    }

    @Override
    public Movie findMovieById(Long id) {
        return this.movieRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Película con ID " + id + " no encontrada"));
    }

    @Override
    public Movie findByTitle(String title) {
        return this.movieRepository.findByTitle(title);
    }

    @Override
    public List<Movie> findByYear(int year) {
        return this.movieRepository.findByYear(year);
    }

    @Override
    public void saveMovie(Movie movie) {
       this.movieRepository.save(movie);
    }

    @Override
    public void deleteMovieById(Long id) {
      this.movieRepository.deleteById(id);
    }
}
