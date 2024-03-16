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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../context/TaskContext';

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const {addTask, types} = useTaskContext(); // Get types from the context

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
    // Validate input fields
    if (task.title && task.date && task.type && task.description) {
      // Add task only if all inputs are filled
      addTask(task);
      navigation.navigate('SeeTask' as never); // Navigate back or to any other screen
    }
  };

  const isButtonDisabled =
    !task.title || !task.date || !task.type || !task.description;

  return (
    <ImageBackground
      source={require('../assets/Untitled.jpeg')}
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
            editable={false} // Disable editing directly
            value={task.type}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Date"
          editable={false} // Disable editing directly
          value={task.date.toDateString()} // Convert date to string
        />
        <TextInput
          style={[styles.input]}
          placeholder="Description"
          multiline
          onChangeText={value => handleChange('description', value)}
          value={task.description}
        />
        <TouchableOpacity onPress={handleSubmit} disabled={isButtonDisabled}>
          <Text style={[styles.addButton]}>Add Task</Text>
        </TouchableOpacity>

        {/* Modal for selecting task type */}
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
    backgroundColor: '#D77260',
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
