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
  ]);
  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };
  const deleteTask = (index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };
  const setTaskTypes = (taskTypes: string[]) => {
    setTypes(taskTypes);
  };
  useEffect(() => {
    setTypes(['Personal', 'Work', 'University', 'Medical', 'Other']);
  }, []);
  const contextValue: TaskContextType = {
    tasks,
    addTask,
    types,
    setTypes: setTaskTypes,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
