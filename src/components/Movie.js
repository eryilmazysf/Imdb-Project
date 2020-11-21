import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

const IMG_API = "https://image.tmdb.org/t/p/w500/";

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

const Movie = ({ title, poster_path, overview, vote_average, id }) => {
  const [isOpen, setOpen] = useState(false);
  const [key, setKey] = useState("");

  const video = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=38e32fcf23591c10099c8dbec80a0217&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setKey(data.results[0] ? data.results[0]["key"] : "P2nJV6j5a7Q");
      });
    setOpen(true);
  };

  return (
    <>
      <div>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={key}
          onClose={() => setOpen(false)}
        />
      </div>
      <div className="movie">
        <img
          src={
            poster_path
              ? IMG_API + poster_path
              : "https://i.pinimg.com/originals/cf/66/bb/cf66bb159c0c4b97a07bcae2c40d6ea4.jpg"
          }
          alt={title}
          onClick={() => video()}
        />
        <div className="movie-info">
          <h3>{title}</h3>
          <span className={`tag ${setVoteClass(vote_average)}`}>
            {vote_average}
          </span>
        </div>
        <div className="movie-over">
          <h2>Overview :</h2>
          <p>{overview}</p>
        </div>
      </div>
    </>
  );
};
export default Movie;
