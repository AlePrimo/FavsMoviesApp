package com.aleprimo.favsMoviesApp.repositories;

import com.aleprimo.favsMoviesApp.entities.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMovieRepository extends CrudRepository<Movie, Long> {
    Movie findByTitle(String title);
}
