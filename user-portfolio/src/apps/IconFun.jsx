import { createContext, useContext, useState } from "react";
import { useTaskman } from "../taskman/Taskman";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";
const IconComponentContext = createContext();

export const IconFun = ({children}) => {
    const { taskman, addTask, TerminateProcess} = useTaskman();
    const [appStates, setAppStates] = useState({});
    const {bringToFront} = useZIndexShuffler();

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
    
    const CreateInstance = (appIndex) => {
        // create new app instance when opened from desktop icon
    }

    const handleClick = (appIndex) => {
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

    const taskBarOpenClose = (appIndex) => {
        const currentState = getAppState(appIndex);
        if (currentState.isOpen) {
            updateAppState(appIndex, {
                isOpen: currentState.isOpen,
                isFullscreen: currentState.isFullscreen,
                isWindowed: currentState.isWindowed,
                isMinimized: currentState.isMinimized
            });
            bringToFront(appIndex);
        } else {
            MinimizeMode(appIndex);
        }
    }

    return (
        <IconComponentContext.Provider value={{ getAppState, handleClick, killProcess, WindowMode, MinimizeMode, taskBarOpenClose}}>
            {children}
        </IconComponentContext.Provider>
    );
};

export const IconComponentProvider = () => {
    return useContext(IconComponentContext);
};
