package com.aleprimo.FavsMoviesApp.controllers;


import com.aleprimo.FavsMoviesApp.entities.Movie;
import com.aleprimo.FavsMoviesApp.services.IMovieService;
import com.aleprimo.FavsMoviesApp.services.MovieDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final IMovieService movieService;

    @GetMapping("/findAllMovies")
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        List<MovieDTO> movieList = movieService.findAllMovies().stream()
                .map(this::mapToDTO)
                .toList();
        return ResponseEntity.ok(movieList);
    }

    @GetMapping("/movieById/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.findMovieById(id);
        return ResponseEntity.ok(mapToDTO(movie));
    }


    @GetMapping("/movieByTitle")
    public ResponseEntity<MovieDTO> getMovieByTitle(@RequestParam("value") String title) {
        Movie movie = movieService.findByTitle(title);
        return ResponseEntity.ok(mapToDTO(movie));
    }

    @PostMapping("/saveMovie")
    public ResponseEntity<Void> createMovie(@RequestBody @Valid MovieDTO movieDTO) throws URISyntaxException {
        Movie movie = mapToEntity(movieDTO);
        movieService.saveMovie(movie);
        return ResponseEntity.created(new URI("/api/movies")).build();
    }

    @PutMapping("/updateMovie/{id}")
    public ResponseEntity<String> updateMovie(@PathVariable Long id, @RequestBody @Valid MovieDTO movieDTO) {
        Movie movie = movieService.findMovieById(id);
        movie.setTitle(movieDTO.getTitle());
        movie.setDescription(movieDTO.getDescription());
        movie.setDirector(movieDTO.getDirector());
        movie.setYear(movieDTO.getYear());
        movie.setGenres(movieDTO.getGenres());
        movie.setRating(movieDTO.getRating());
        movieService.saveMovie(movie);
        return ResponseEntity.ok("Película actualizada");
    }

    @DeleteMapping("/deleteMovieById/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovieById(id);
        return ResponseEntity.ok("Película eliminada");
    }


    private MovieDTO mapToDTO(Movie movie) {
        return MovieDTO.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .description(movie.getDescription())
                .director(movie.getDirector())
                .year(movie.getYear())
                .genres(movie.getGenres())
                .rating(movie.getRating())
                .build();
    }

    private Movie mapToEntity(MovieDTO dto) {
        return Movie.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .director(dto.getDirector())
                .year(dto.getYear())
                .genres(dto.getGenres())
                .rating(dto.getRating())
                .build();
    }


}
