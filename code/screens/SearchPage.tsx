import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { searchMovies } from '../backend/imdbApi';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Search error:', error);
    }
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
        keyExtractor={(item) => item.imdbID}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: item.Poster }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle}>{item.Title}</Text>
          </View>
        )}
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
    flex: 1,  /* Ensure items take up equal space */
    margin: 10,  /* Add some margin between items */
    alignItems: 'center',  /* Center items horizontally */
  },
  poster: {
    width: 150,
    height: 225,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: 'center',  /* Center text under the image */
    marginTop: 10,
  },
});

export default SearchPage;
