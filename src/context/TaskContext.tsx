import React, {createContext, useContext, useState, useEffect} from 'react';
interface Task {
  title: string;
  date: Date;
  type: string;
  description: string;
}
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  types: string[];
  setTypes: (types: string[]) => void;
  deleteTask: (index: number) => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  types: [],
  setTypes: () => {},
  deleteTask: () => {},
});
export const useTaskContext = () => useContext(TaskContext);
export const TaskProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [types, setTypes] = useState<string[]>([
    'Personal',
    'Work',
    'University',
    'Medical',
    'Other',
  ]); // Initialize types with specified values

  // Function to add a task
  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  // Function to delete a task
  const deleteTask = (index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  // Add a function to set the types in the context
  const setTaskTypes = (taskTypes: string[]) => {
    setTypes(taskTypes);
  };

  // Load types on component mount (you can fetch types from an API or use local storage)
  useEffect(() => {
    // Simulated fetch from an API or local storage
    // Replace with actual implementation
    setTypes(['Personal', 'Work', 'University', 'Medical', 'Other']);
  }, []);

  // Provide context value
  const contextValue: TaskContextType = {
    tasks,
    addTask,
    types,
    setTypes: setTaskTypes,
    deleteTask, // Provide deleteTask function
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
