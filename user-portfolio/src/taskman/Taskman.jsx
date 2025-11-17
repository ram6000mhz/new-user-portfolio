
import { createContext, useState, useContext, useEffect } from "react";

const TaskmanContext = createContext();

export const TaskmanProvider = ( {children} ) => {
    const [taskman, setTaskman] = useState([]);

    const addTask = (taskIndex) => {
        setTaskman((prevTasks) => [...prevTasks, taskIndex]);
    }
    
    const TerminateProcess = (taskIndex) => {
        setTaskman((prevTasks) => prevTasks.filter((task => task !== taskIndex)))
    }

    return(
        <TaskmanContext.Provider value={{taskman, addTask, TerminateProcess}}>
            {children}
        </TaskmanContext.Provider>
    );
}

export const useTaskman = () =>{
    return useContext(TaskmanContext);
}