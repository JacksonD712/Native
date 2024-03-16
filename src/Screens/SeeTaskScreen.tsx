import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTaskContext} from '../context/TaskContext';

// Define your component
const SeeTaskScreen = () => {
  // Hooks for navigation and context
  const navigation = useNavigation();
  const {tasks, types, deleteTask} = useTaskContext();

  // State hooks
  const [selectedType, setSelectedType] = useState('Personal');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Effect hook to filter tasks based on selected type
  useEffect(() => {
    setShowDropdown(false); // Reset dropdown visibility when tasks change
    const filtered = tasks.filter(task => task.type === selectedType);
    setFilteredTasks(filtered);
  }, [tasks, selectedType]);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle selecting a task type from dropdown
  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setShowDropdown(false);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (index: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: () => deleteTask(index)},
    ]);
  };

  // Function to navigate to the AddTask page for editing
  const handleEditTask = (task: YourTaskType) => {
    navigation.navigate('AddTask', {task});
  };

  return (
    <ImageBackground
      source={require('../assets/Untitled.jpeg')}
      style={styles.background}>
      <View style={styles.overlay}>
        {/* Task container */}
        <View style={styles.taskContainer}>
          {filteredTasks.length === 0 ? (
            <Text style={styles.noTasksText}>No tasks available</Text>
          ) : (
            filteredTasks.map((task, index) => (
              <View key={index} style={styles.taskItem}>
                {/* Display task details */}
                <Text>Title: {task.title}</Text>
                <Text>Type: {task.type}</Text>
                <Text>Date: {task.date.toDateString()}</Text>
                <Text>Description: {task.description}</Text>
                {/* Button to delete task */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteTask(index)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                {/* Button to edit task */}
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditTask(task)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Add Task button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>

        {/* Dropdown */}
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>{selectedType}</Text>
        </TouchableOpacity>
        {/* Dropdown options */}
        {showDropdown && (
          <View style={styles.dropdown}>
            {types.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownOption}
                onPress={() => handleSelectType(type)}>
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
  },
  taskContainer: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  taskItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#D77260',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  addButtonIcon: {
    color: 'white',
    fontSize: 30,
  },
  dropdownButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 6,
  },
  dropdownOption: {
    paddingVertical: 5,
  },
  noTasksText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SeeTaskScreen;
