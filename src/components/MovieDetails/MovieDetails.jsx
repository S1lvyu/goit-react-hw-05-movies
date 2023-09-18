import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMoviesDetails } from 'API/API';
import Message from 'components/Message/Message';
import MovieImage from '../../assets/movie.png';
import styles from './MovieDetails.module.css';
export default function MovieDetails() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };
  let { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getMoviesDetails(movieId);
        setMovieDetails(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={styles.main__container}>
      <button onClick={handleGoBack} className={styles.button}>
        Back
      </button>
      <NavLink to="cast" className={styles.link}>
        Cast
      </NavLink>
      <NavLink to="reviews" className={styles.link}>
        Reviews
      </NavLink>
      {isLoading ? (
        <Loader />
      ) : movieDetails ? (
        <div>
          <div className={styles.movie__container}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : MovieImage
              }
              alt={movieDetails.title}
              className={styles.movie__image}
            />
            <div className={styles.info__block}>
              <p className={styles.info__text}>
                <span className={styles.info__span}>Release Date: </span>
                {movieDetails.release_date}
              </p>
              <p className={styles.info__text}>
                <span className={styles.info__span}> Rating: </span>
                {movieDetails.vote_average.toFixed(2)}
              </p>
              <p className={styles.info__text}>
                <span className={styles.info__span}> Genres: </span>
                {movieDetails.genres.map(item => item.name).join(' , ')}
              </p>
              <p className={styles.info__text}>
                <span className={styles.info__span}>Description: </span>
                {movieDetails.overview}
              </p>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <Message message="Ooops!... Something went wrong!" />
      )}
    </div>
  );
}
