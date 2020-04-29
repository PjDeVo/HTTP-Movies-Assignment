import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMovie(props) {
  const initialMovie = [
    {
      id: 0,
      title: "",
      director: "",
      metascore: "",
      stars: [],
    },
  ];

  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const selectedMovie = props.movies.find((movie) => {
      return `${movie.id}` === props.match.params.id;
    });
    if (selectedMovie) {
      setMovie(selectedMovie);
      console.log(movie);
    }
  }, [props.items, props.match.params.id]);

  const handleChanges = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        props.setMovies(res.data);
        props.history.push("/");
        console.log("props.movies", props.movies);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <label> Title</label>
      <input
        type="text"
        name="title"
        value={movie.title}
        placeholder="name"
        onChange={handleChanges}
      />
      <label> Director</label>
      <input
        type="text"
        name="director"
        value={movie.director}
        placeholder="director"
        onChange={handleChanges}
      />
      <label> Metascore</label>
      <input
        type="text"
        name="metascore"
        value={movie.metascore}
        placeholder="metascore"
        onChange={handleChanges}
      />
      <label> Stars</label>
      <input
        type="text"
        name="director"
        value={movie.stars}
        placeholder="Stars"
        onChange={handleChanges}
      />
      <button> Update</button>
    </form>
  );
}

export default UpdateMovie;
