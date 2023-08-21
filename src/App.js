import React, { useState } from "react";
import "./App.css";
import "h8k-components";

import { Movieform, Movieslist, Search } from "./components";

const title = "Favorite Movie Directory";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleAddMovie = (movieName, rating, duration) => {
    setMovies((movies) => [
      ...movies,
      {
        name: movieName,
        rating,
        duration,
      },
    ]);
  };

  let filteredMovies = movies;

  if (searchText.length >= 2) {
    filteredMovies = movies.filter((movie) =>
      movie.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
  }

  const sortedArray = filteredMovies.sort((a, b) => b.duration - a.duration);

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-row justify-content-center mt-100">
        <div className="w-30 mr-75">
          <Movieform handleAddMovie={handleAddMovie} />
        </div>
        <div className="layout-column w-30">
          <Search searchText={searchText} setSearchText={setSearchText} />
          {sortedArray.length !== 0 && <Movieslist movies={sortedArray} />}
          {sortedArray.length === 0 && movies.length !== 0 && (
            <div data-testid="noResult">
              <h3 className="text-center">No Results Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
