import axios from 'axios';

const TRENDING_URL = 'https://api.themoviedb.org/3/trending/all/day';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const MOVIE_DETAILS_URL = 'https://api.themoviedb.org/3/movie/';

const API_KEY = '9a53726f9c5cec2b7f692cae8959d58c';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTUzNzI2ZjljNWNlYzJiN2Y2OTJjYWU4OTU5ZDU4YyIsInN1YiI6IjY0ZmM2Y2ZmZWZlYTdhMDExYWI2MmM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nYiSEEFRJdB_Upus9JnQTZN7wyZg5kxTiQPVbc7tqyY';

axios.defaults.params = {
  api_key: API_KEY,
};

const getTrendingData = async () => {
  try {
    const response = await axios.get(TRENDING_URL, {
      params: {
        api_key: API_KEY,
        access_token: ACCESS_TOKEN,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
const searchMovies = async searchQuerry => {
  try {
    const response = await axios.get(SEARCH_URL, {
      params: {
        api_key: API_KEY,
        access_token: ACCESS_TOKEN,
        query: searchQuerry,
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const getMoviesDetails = async movieId => {
  const url = `${MOVIE_DETAILS_URL}${movieId}`;
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
        access_token: ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getCastData = async movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
        access_token: ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getReviewsData = async movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
  try {
    const response = await axios.get(url, {
      params: {
        api_key: API_KEY,
        access_token: ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getTrendingData,
  searchMovies,
  getMoviesDetails,
  getCastData,
  getReviewsData,
};
