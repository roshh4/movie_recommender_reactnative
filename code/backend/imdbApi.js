import axios from 'axios';

const tmdb_api_key = '4e7379a42eb65fae330e75c6a228d5cc';
const baseURL = 'https://api.themoviedb.org/3';

// Function to search for movies using the TMDb API
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${baseURL}/search/movie`, {
      params: {
        api_key: tmdb_api_key,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

// Function to get popular movies
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/popular`, {
      params: {
        api_key: tmdb_api_key,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Function to get top-rated movies
export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/top_rated`, {
      params: {
        api_key: tmdb_api_key,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};
