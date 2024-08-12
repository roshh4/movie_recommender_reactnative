import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { searchMovies } from './code/backend/imdbApi';

const SearchPage = ({ navigation }) => {
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
    <View>
      <TextInput
        placeholder="Search for a movie"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Title} ({item.Year})</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('MovieDetailsPage', { imdbID: item.imdbID })}
            />
          </View>
        )}
      />
    </View>
  );
};

export default SearchPage;
