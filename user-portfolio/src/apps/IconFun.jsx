import { createContext, useContext, useState } from "react";
import { useTaskman } from "../taskman/Taskman"
const AppContext = createContext();

export const IconFun = ({children}) => {
    const { taskman, addTask, TerminateProcess} = useTaskman();
    const [appStates, setAppStates] = useState({});
    
    const getAppState = (appIndex) => {
        return appStates[appIndex] || {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false,
            isMinimized: false,
        };
    };

    const updateAppState = (appIndex, updates) =>{
        setAppStates(prevStates => {
            const newStates = {
                ...prevStates,
                [appIndex]: {
                    ...prevStates[appIndex],
                    ...updates,
                },
            };
            console.log("Updated app:", appIndex, newStates[appIndex]);
            return newStates;
        });
    }

    const handleClick = (appIndex) => {
        console.log("Icon double clicked:", appIndex);
        updateAppState(appIndex, {
            isOpen: true,
            isFullscreen: true,
            isWindowed: false,
            isMinimized: false,
        });
        console.log("initial")
        console.log("Add to taskman:", appIndex);
        addTask(appIndex);
        console.log(taskman);
    };

    const killProcess = (appIndex) => {
        console.log("Kill process:", appIndex);
        updateAppState(appIndex, {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false,
            isMinimized: false
        });
        TerminateProcess(appIndex);
    }

    const WindowMode = (appIndex) => {
        console.log("Window clicked");
        const currentState = getAppState(appIndex);
        
        updateAppState(appIndex, {
            isOpen: currentState.isOpen,
            isFullscreen: !currentState.isFullscreen,
            isWindowed: !currentState.isWindowed,
            isMinimized: currentState.isMinimized  
        });
    }

    const MinimizeMode = (appIndex) => {
        console.log("Minimize clicked");
        const currentState = getAppState(appIndex);
        updateAppState(appIndex, {
            isOpen: !currentState.isOpen,
            isFullscreen: currentState.isFullscreen,
            isWindowed: currentState.isWindowed,
            isMinimized: currentState.isMinimized
        });
    }

    return (
        <AppContext.Provider value={{ getAppState, handleClick, killProcess, WindowMode, MinimizeMode}}>
            {children}
        </AppContext.Provider>
    );
};

export const IconComponentProvider = () => useContext(AppContext);