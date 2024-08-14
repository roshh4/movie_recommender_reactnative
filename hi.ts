import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './code/screens/HomePage';
import SearchPage from './code/screens/SearchPage';
import WishlistPage from './code/screens/WishlistPage';
import MoviesDetailsPage from './code/screens/MovieDetailsPage';
import LoginPage from './code/screens/LoginPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Search" component={SearchPage} />
        <Tab.Screen name="Wishlist" component={WishlistPage} />
      </Tab.Navigator>
      <Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
