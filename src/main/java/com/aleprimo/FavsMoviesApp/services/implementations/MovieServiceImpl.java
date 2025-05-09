package com.aleprimo.FavsMoviesApp.services.implementations;

import com.aleprimo.FavsMoviesApp.entities.Movie;
import com.aleprimo.FavsMoviesApp.persistence.IMovieDAO;
import com.aleprimo.FavsMoviesApp.services.IMovieService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MovieServiceImpl implements IMovieService {

    private final IMovieDAO movieDAO;

    public MovieServiceImpl(IMovieDAO movieDAO) {
        this.movieDAO = movieDAO;
    }

    @Override
    public List<Movie> findAllMovies() {
        return this.movieDAO.findAllMovies();
    }

    @Override
    public Movie findMovieById(Long id) {
        return this.movieDAO.findMovieById(id);
    }

    @Override
    public void saveMovie(Movie movie) {
        if (movie.getTitle() == null || movie.getTitle().isBlank()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }

        this.movieDAO.saveMovie(movie);
    }

    @Override
    public void deleteMovieById(Long id) {
this.movieDAO.deleteMovieById(id);
    }

    @Override
    public Movie findByTitle(String title) {
        Movie movie = this.movieDAO.findByTitle(title);
        if (movie == null) {
            throw new NoSuchElementException("Película con título '" + title + "' no encontrada");
        }
        return movie;
    }
}
