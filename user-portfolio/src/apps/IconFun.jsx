import { createContext, useContext, useState } from "react";
import { useTaskman } from "../taskman/Taskman";

const AppContext = createContext();

export const IconFun = ({children}) => {
    const { taskman, addTask, TerminateProcess} = useTaskman();
    const [appStates, setAppStates] = useState({});
    
    const initialAppState = (appIndex) => {
        if (!appStates[appIndex]) {
            updateAppState(appIndex, { ...initialAppState });
        }
    };

    const getAppState = (appIndex) => {
        return appStates[appIndex]||{
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
            return newStates;
        });
    }

    const handleClick = (appIndex) => {
        initialAppState(appIndex);
        updateAppState(appIndex, {
            isOpen: true,
            isFullscreen: true,
            isWindowed: false,
            isMinimized: false,
        });
        addTask(appIndex);
    };

    const killProcess = (appIndex) => {
        updateAppState(appIndex, {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false,
            isMinimized: false
        });
        TerminateProcess(appIndex);
    }

    const WindowMode = (appIndex) => {
        const currentState = getAppState(appIndex);
        
        updateAppState(appIndex, {
            isOpen: currentState.isOpen,
            isFullscreen: !currentState.isFullscreen,
            isWindowed: !currentState.isWindowed,
            isMinimized: currentState.isMinimized  
        });
    }

    const MinimizeMode = (appIndex) => {
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