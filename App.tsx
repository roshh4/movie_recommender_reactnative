import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from './code/screens/HomePage.tsx';
import SearchPage from './code/screens/SearchPage.tsx';
import WishlistPage from './code/screens/WishlistPage.tsx';
import MoviesDetailsPage from './code/screens/MoviesDetailsPage.tsx';
import LoginPage from './code/screens/LoginPage.tsx';
import SignUpPage from './code/screens/SignUpPage.tsx';
import { AuthProvider, useAuth } from './code/components/AuthContext.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator: React.FC = () => (
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeTabs"
            component={TabNavigator}
            options={({ navigation }) => {
              const { user } = useAuth();
              return {
                headerTitle: 'MOVIE REC APP',
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
                headerStyle: { backgroundColor: '#f8f8f8' },
                headerRight: () => (
                  user ? (
                    <Text style={{ marginRight: 10, color: 'blue', fontSize: 16 }}>{user}</Text>
                  ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={{ marginRight: 10, color: 'blue', fontSize: 16 }}>Log In</Text>
                    </TouchableOpacity>
                  )
                ),
                headerRightContainerStyle: { paddingRight: 10 },
              };
            }}
          />
          <Stack.Screen name="MoviesDetails" component={MoviesDetailsPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
