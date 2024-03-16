import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../context/TaskContext';

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const {addTask, types} = useTaskContext();

  const [task, setTask] = useState({
    title: '',
    date: new Date(),
    type: types[0],
    description: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (name: string, value: string) => {
    setTask(prevState => ({...prevState, [name]: value}));
  };

  const handleSubmit = () => {
    if (!task.title || !task.date || !task.type || !task.description) {
      Alert.alert('Error', 'Please fill in all the input fields.');
      return;
    }
    addTask(task);
    navigation.navigate('SeeTask' as never);
  };

  return (
    <ImageBackground
      source={require('../assets/add.jpeg')}
      style={styles.background}>
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          onChangeText={value => handleChange('title', value)}
          value={task.title}
        />
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <TextInput
            style={styles.input}
            placeholder="Type"
            editable={false}
            value={task.type}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Date"
          editable={false}
          value={task.date.toDateString()}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Description"
          multiline
          onChangeText={value => handleChange('description', value)}
          value={task.description}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={[styles.addButton]}>Add Task</Text>
        </TouchableOpacity>
        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={types}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      handleChange('type', item);
                      setShowModal(false);
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    backgroundColor: '#D77260',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  addButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFD4D7',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    minWidth: '80%',
    maxHeight: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddTaskScreen;
