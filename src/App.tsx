import React from 'react';
import ListView from './ListView';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeView from "./HomeView";

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
}

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="List" component={ListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
