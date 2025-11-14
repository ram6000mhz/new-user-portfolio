import { createContext, useContext, useState } from "react";
import { useTaskman } from "../taskman/taskman";
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
        setAppStates(prevStates => ({
            ...prevStates,
            [appIndex]: {
                ...getAppState(appIndex),
                ...updates,
            },
        }));
    }

    const handleClick = (appIndex) => {
        updateAppState(appIndex, {
            isFullscreen: true,
            isOpen: true
        });
        console.log("Add to taskman:", appIndex);
        addTask(appIndex);
        console.log(taskman);
    };

    const killProcess = (appIndex) => {
        updateAppState(appIndex, {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false
        });
        TerminateProcess(appIndex);
    }

    const WindowMode = (appIndex) => {
        const currentState = getAppState(appIndex);
        updateAppState(appIndex, {
            isFullscreen: !currentState.isFullscreen,
            isWindowed: !currentState.isWindowed
        });
    }

    const MinimizeMode = (appIndex) => {
        const currentState = getAppState(appIndex);
        updateAppState(appIndex, {
            isOpen: !currentState.isOpen,
            isFullscreen: !currentState.isFullscreen,
            isWindowed: !currentState.isWindowed
        });
    }

    return (
        <AppContext.Provider value={{ getAppState, handleClick, killProcess, WindowMode, MinimizeMode}}>
            {children}
        </AppContext.Provider>
    );
};

export const IconComponentProvider = () => useContext(AppContext);