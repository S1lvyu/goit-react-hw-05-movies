import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastData } from 'API/API';
import userImage from '../../assets/user.png';
import styles from './Cast.module.css';
import Message from 'components/Message/Message';
import Loader from 'components/Loader/Loader';
export default function Cast() {
  const [castData, setCastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getCastData(movieId);
        setCastData(result.cast);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className={styles.main__container}>
      {isLoading ? (
        <Loader />
      ) : castData && castData.length > 0 ? (
        castData.map(item => (
          <div key={item.id} className={styles.card}>
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  : userImage
              }
              alt={item.name}
              width="150px"
              className={styles.card__image}
            />
            <p className={styles.card__text}>
              {' '}
              <span className={styles.card__span}>Name:</span> {item.name}
            </p>
            <p className={styles.card__text}>
              {' '}
              <span className={styles.card__span}>Role:</span> {item.character}
            </p>
          </div>
        ))
      ) : (
        <Message message="There are no actors" />
      )}
    </div>
  );
}
