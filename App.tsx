import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other icon set

import HomePage from './code/screens/HomePage';
import SearchPage from './code/screens/SearchPage';
import WishlistPage from './code/screens/WishlistPage';
import MoviesDetailsPage from './code/screens/MoviesDetailsPage';
import LoginPage from './code/screens/LoginPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Wishlist') {
          iconName = focused ? 'heart' : 'heart-outline';
        }

        // Return the appropriate icon component
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Search" component={SearchPage} />
    <Tab.Screen name="Wishlist" component={WishlistPage} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MoviesDetails" component={MoviesDetailsPage} />
        {/* You can add more screens here that shouldn't be in the tab navigator */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
