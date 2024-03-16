import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToTask = () => {
    navigation.navigate('SeeTask' as never);
  };

  return (
    <ImageBackground
      source={require('../assets/checklist-icon-3d-clipboard-with-survey-pen.jpg')}
      style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.text}>To-Do List</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToTask} style={styles.button}>
          <Text style={styles.buttonText}>Get Started {'\u2794'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  text: {
    color: '#D77260',
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Madimi One',
    marginTop: '10%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFD4D7',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default HomeScreen;
