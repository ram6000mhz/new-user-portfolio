import { createContext, useContext, useState, useRef, useCallback ,useMemo } from "react";
import { useTaskman } from "../taskman/Taskman";
import { useZIndexShuffler } from "../providers/ZIndexShuffler";

const IconComponentContext = createContext();

export const IconFun = ({children}) => {
    const { addTask, TerminateProcess} = useTaskman();
    const [appStates, setAppStates] = useState({});
    const {bringToFront} = useZIndexShuffler();

    const getAppState = useCallback((appIndex) => {
        return appStates[appIndex] || {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false,
            isMinimized: false,
        };
    }, [appStates]);

    const updateAppState = useCallback((appIndex, updates) =>{
        setAppStates(prevStates => ({
            ...prevStates,
            [appIndex]: {
                ...prevStates[appIndex],
                ...updates,
            },
        }));
    }, []);

    const handleClick = useCallback((appIndex) => {
        updateAppState(appIndex, {
            isOpen: true,
            isFullscreen: true,
            isWindowed: false,
            isMinimized: false,
        });
        addTask(appIndex);
    }, [addTask, updateAppState]);

    const killProcess = useCallback((appIndex) => {
        updateAppState(appIndex, {
            isOpen: false,
            isFullscreen: false,
            isWindowed: false,
            isMinimized: false
        });
        TerminateProcess(appIndex);
    }, [TerminateProcess, updateAppState]);

    const WindowMode = useCallback((appIndex) => {
        const currentState = getAppState(appIndex);
        updateAppState(appIndex, {
            isOpen: currentState.isOpen,
            isFullscreen: !currentState.isFullscreen,
            isWindowed: !currentState.isWindowed,
            isMinimized: currentState.isMinimized  
        });
    }, [getAppState, updateAppState]);

    const MinimizeMode = useCallback((appIndex) => {
        const currentState = getAppState(appIndex);
        updateAppState(appIndex, {
            isOpen: !currentState.isOpen,
            isFullscreen: currentState.isFullscreen,
            isWindowed: currentState.isWindowed,
            isMinimized: !currentState.isMinimized
        });
    }, [getAppState, updateAppState]);

    const taskBarOpenClose = useCallback((appIndex) => {
        const currentState = getAppState(appIndex);

        if (currentState.isOpen) {
            bringToFront(appIndex);
        } else {
            MinimizeMode(appIndex);
        }
    }, [getAppState, MinimizeMode, bringToFront]);

    const contextValue = useMemo(() => ({
        getAppState,
        handleClick,
        killProcess,
        WindowMode,
        MinimizeMode,
        taskBarOpenClose
    }), [getAppState, handleClick, killProcess, WindowMode, MinimizeMode, taskBarOpenClose]);

    return (
        <IconComponentContext.Provider value={contextValue}>
            {children}
        </IconComponentContext.Provider>
    );
};


export const IconComponentProvider = () => {
    return useContext(IconComponentContext);
};

