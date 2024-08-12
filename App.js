import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from './code/backend/imdbApi';
import SearchPage from './code/screens/searchpage.js'

const App = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <SearchPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});


export default App;
