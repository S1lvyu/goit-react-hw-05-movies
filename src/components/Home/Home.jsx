import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import { getTrendingData } from 'API/API';
import styles from './Home.module.css';
import MovieCard from 'components/MovieCard/MovieCard';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTrendingData();
        setData(result.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className={styles.title}>Trending Today</h1>
      <MovieCard data={data} />
    </div>
  );
}
