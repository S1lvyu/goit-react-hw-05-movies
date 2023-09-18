import React, { useState, useEffect } from 'react';
import { searchMovies } from 'API/API';

import styles from './Movies.module.css';
import Message from 'components/Message/Message';
import MovieCard from 'components/MovieCard/MovieCard';

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await searchMovies(searchQuery);
        setData(result || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search a movie"
          value={searchQuery}
          onChange={event => {
            setSearchQuery(event.target.value);
          }}
          className={styles.form__input}
        />
        <button type="submit" className={styles.form__button}>
          Search
        </button>
      </form>
      {data && data.length === 0 && searchQuery ? (
        <Message message="There is no data matching your search" />
      ) : (
        <MovieCard data={data} />
      )}
    </div>
  );
}
