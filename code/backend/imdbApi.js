import axios from 'axios';

const omdb_api = 'dedb1911';
const baseURL = 'http://www.omdbapi.com/';

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${baseURL}?s=${query}&apikey=${omdb_api}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
