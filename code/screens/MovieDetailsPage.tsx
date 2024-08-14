import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getMovieDetails } from '../backend/imdbApi.js';

const MovieDetailsPage = ({ route }) => {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(imdbID);
      setMovie(data);
      setLoading(false);
    };
    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>{movie.Title}</Text>
      <Text>{movie.Year}</Text>
      <Text>{movie.Plot}</Text>
      {/* Add more movie details as needed */}
    </View>
  );
};

export default MovieDetailsPage;
