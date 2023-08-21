import React, { useState, useEffect } from "react";

function Movieform({ handleAddMovie }) {
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(false);

  const sublimitData = () => {
    if (movieName == "" || rating == "" || duration == "") {
      return;
    }
    const t = duration.slice(-1);

    if (t == "m" || t == "h") {
      const getDuration = Number(duration.slice(0, duration.length - 1));
      setError(false);
      if (t === "m") {
        const TimeInHrs = getDuration / 60;
        const finalHors =TimeInHrs.toFixed(1)
        handleAddMovie(movieName, rating, finalHors);
      } else {
        handleAddMovie(movieName, rating, getDuration);
      }
    } else {
      setMovieName("");
      setDuration("");
      setRating("");
      setError(true);
    }
  };
  useEffect(() => {
    if (movieName !== "" || rating !== "" || duration !== "") {
      setError(false);
    }
  }, [movieName, rating, duration]);
  return (
    <section>
      <form onSubmit={(e) => e.preventDefault(e)}>
        <div className="layout-column mb-15">
          <label htmlFor="nameInput" className="mb-3">
            Movie Name
          </label>
          <input
            className=""
            data-testid="nameInput"
            id="nameInput"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
        </div>
        <div className="layout-column mb-15">
          <label htmlFor="ratingsInput" className="mb-3">
            Rating
          </label>
          <input
            className=""
            data-testid="ratingsInput"
            id="ratingsInput"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="layout-column  mb-15">
          <label htmlFor="durationInput" className="mb-3">
            Duration
          </label>
          <input
            className=""
            data-testid="durationInput"
            id="durationInput"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        {error && (
          <div className="alert error mb-30" data-testid="alert">
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>
        )}
        <div className="flex justify-content-end ">
          <button type="submit" data-testid='addButton' onClick={sublimitData}>
            AddMovie
          </button>
        </div>
      </form>
    </section>
  );
}

export default Movieform;
