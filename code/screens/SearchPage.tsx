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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 16,
    flexShrink: 1,
  },
});

export default SearchPage;
