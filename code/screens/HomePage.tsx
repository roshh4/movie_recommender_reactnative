import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getPopularMovies, getTopRatedMovies } from '../backend/imdbApi';

const HomePage = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await getPopularMovies();
        setPopularMovies(popularData);

        const topRatedData = await getTopRatedMovies();
        setTopRatedMovies(topRatedData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MoviesDetails', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        data={popularMovies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.header}>Top Rated Movies</Text>
      <FlatList
        data={topRatedMovies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomePage;
