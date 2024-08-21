import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { searchMovies } from '../backend/imdbApi';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await searchMovies(query);
      setMovies(response);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MoviesDetails', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a movie"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item)} style={styles.movieItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No movies found.</Text>}
        contentContainerStyle={movies.length === 0 ? styles.emptyList : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SearchPage;