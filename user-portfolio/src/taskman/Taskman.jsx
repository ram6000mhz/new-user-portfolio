
import { createContext, useState, useContext } from "react";

const TaskmanContext = createContext();

export const TaskmanProvider = ( {children} ) => {
    const [taskman, setTaskman] = useState([]);

    const addTask = (taskIndex) => {
        setTaskman((prevTasks) => [...prevTasks, taskIndex]);
    }

    const TerminateProcess = (taskIndex) => {
        setTaskman((prevTasks) => prevTasks.filter((task => task.id !== taskIndex)))
    }

    return(
        <TaskmanContext.Provider value={{taskman, addTask, TerminateProcess}}>
            {children}
        </TaskmanContext.Provider>
    );
}

export const useTaskman = () =>{
    const context = useContext(TaskmanContext);
    if(!context){
        throw new Error("useTaskman must be used within a TaskmanProvider");
    }
    return context;
}