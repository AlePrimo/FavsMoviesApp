package com.aleprimo.FavsMoviesApp.repositories;

import com.aleprimo.FavsMoviesApp.entities.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMovieRepository extends CrudRepository<Movie, Long> {
    Movie findByTitle(String title);
}
