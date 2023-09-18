import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsData } from 'API/API';
import styles from './Reviews.module.css';
import Message from 'components/Message/Message';
import Loader from 'components/Loader/Loader';
export default function Reviews() {
  const [reviewsData, setReviewsData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getReviewsData(movieId);
        setReviewsData(result.results);
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
      ) : reviewsData && reviewsData.length > 0 ? (
        reviewsData.map(item => (
          <div key={item.id} className={styles.review__card}>
            <p className={styles.review__text}>
              {' '}
              <span className={styles.review__span}>Author:</span> {item.author}
            </p>
            <p className={styles.review__text}>
              {' '}
              <span className={styles.review__span}>Date Posted:</span>{' '}
              {item.created_at.slice(0, 10)}
            </p>
            <p className={styles.review__text}>{item.content}</p>
          </div>
        ))
      ) : (
        <Message message="No Reviews yet" />
      )}
    </div>
  );
}
