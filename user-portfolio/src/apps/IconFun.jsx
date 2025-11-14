import { createContext, useContext, useState } from "react";
import { useTaskman } from "../taskman/taskman";
const AppContext = createContext();

export const IconFun = ({children}) => {
    const { taskman, addTask, TerminateProcess} = useTaskman();
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWindowed, setIsWindowed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleClick = (appIndex) => {
        setIsFullscreen(true);
        setIsOpen(true);
        console.log("Add to taskman:", appIndex);
        addTask(appIndex);
        console.log(taskman);
    };

    const killProcess = (appIndex) => {
        setIsOpen(false);
        setIsFullscreen(false);
        setIsWindowed(false);
        TerminateProcess(appIndex);
    }

    const WindowMode = () => {
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }

    const MinimizeMode = () => {
        console.log("Minimize");
        setIsOpen(!isOpen);
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }


    return (
        <AppContext.Provider value={{isOpen, isFullscreen, isWindowed, isMinimized, handleClick, killProcess, WindowMode, MinimizeMode}}>
            {children}
        </AppContext.Provider>
    );
};

export const IconComponentProvider = () => useContext(AppContext);