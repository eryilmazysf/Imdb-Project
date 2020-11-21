import React, { useEffect, useState, useRef } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38e32fcf23591c10099c8dbec80a0217&page=1";

const IMG_API = "https://image.tmdb.org/t/p/w500/";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=38e32fcf23591c10099c8dbec80a0217&query=";

function App() {
  const [movies, setMovies] = useState([]);
  //const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();
  //console.log("inputref:", inputRef?.current?.value);

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getMovies(SEARCH_API + inputRef?.current?.value);
  };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();

  //   if (inputRef?.current?.value) {
  //     getMovies(SEARCH_API + inputRef?.current?.value);
  //     //setSearchTerm("");
  //   }
  // };
  //const handleOnChange = (e) => {
  //setSearchTerm(e.target.value);
  //};

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search.."
            ref={inputRef}
            //value={searchTerm}
            //onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
