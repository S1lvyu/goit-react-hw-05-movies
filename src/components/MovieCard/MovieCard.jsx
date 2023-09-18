import React from 'react';
import { Link } from 'react-router-dom';
import movieImage from '../../assets/movie.png';
import styles from './MovieCard.module.css';
export default function MovieCard({ data }) {
  return (
    <ul className={styles.movies__list}>
      {data.map(item => (
        <li key={item.id} className={styles.movie__card}>
          <Link to={`/movies/${item.id}`}>
            <img
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                  : movieImage
              }
              alt={item.title}
              width="400px"
              className={styles.movie__image}
            />
            <p className={styles.movie__name}>
              {item.name} {item.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
