import * as React from 'react';
import Navigation from './src/Navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {TaskProvider} from './src/context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
