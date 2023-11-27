import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeView from "./HomeView";
import ListView from './ListView';
import {TodoListsStore, TodoListsStoreProvider} from "./shared/stores/todoListsStore";

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
}

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const todoListsStore = TodoListsStore.create()
  return (
    <TodoListsStoreProvider value={todoListsStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" component={HomeView}/>
          <Stack.Screen name="List" component={ListView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TodoListsStoreProvider>
  );
};

export default App;
