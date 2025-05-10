package com.aleprimo.FavsMoviesApp.services;


import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MovieDTO {

    Long id;
    @NotBlank(message = "El título no puede estar vacío")
    String title;
    @Size(max = 500, message = "La descripción no debe superar los 500 caracteres")
    String description;
    String director;
    @Min(value = 1900, message = "El año debe ser válido")
    int year;
    @NotEmpty(message = "Debe incluir al menos un género")
    List<String> genres;
    @DecimalMin(value = "0.0", message = "La puntuación debe ser positiva")
    @DecimalMax(value = "10.0", message = "La puntuación no puede superar 10")
    double rating;

}
