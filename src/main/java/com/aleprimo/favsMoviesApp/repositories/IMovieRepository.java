package com.aleprimo.favsMoviesApp.repositories;

import com.aleprimo.favsMoviesApp.entities.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMovieRepository extends CrudRepository<Movie, Long> {
    Movie findByTitle(String title);
    List<Movie> findByYear(int year);
}
