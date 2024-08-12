import axios from 'axios';

const imdb_api = 'dedb1911';
const url = "http://www.omdbapi.com/?apikey=[dedb1911]&";

export const searchMovies = async(query) => {
    try{

  const response = await axios.get(`${url}&s=${query}`)
  return response.data;
    }catch (error){
        console.log("error")
    }
}

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${url}&i=${imdbID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
