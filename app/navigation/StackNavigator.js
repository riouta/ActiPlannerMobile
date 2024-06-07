//Gère navigation entr écrans en fct de présence dun token user
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ObjectDetailScreen from '../screens/ObjectDetailScreen';
import AddObjectScreen from '../screens/AddObjectScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ObjectDetail" component={ObjectDetailScreen} />
          <Stack.Screen name="AddObject" component={AddObjectScreen} />
          <Stack.Screen name="EditObject" component={AddObjectScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
