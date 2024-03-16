import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import SeeTaskScreen from '../Screens/SeeTaskScreen';
import AddTaskScreen from '../Screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SeeTask" component={SeeTaskScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
