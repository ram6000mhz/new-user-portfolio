import { create } from "zustand";
import {ZIndexShuffler} from '../providers/ZIndexShuffler.jsx';
import { Taskman } from "../taskman/Taskman.jsx";

export const IconFun = create((set, get) => ({
  appStates: {}, 

  initializeApp: (appId, initialState) =>
    set(s => ({
      appStates: {
        ...s.appStates,
        [appId]: initialState || {
          isDragging: false,
          isOpen: false,
          isFullscreen: false,
          isWindowed: false,
          isMinimized: false,
          wasFullscreen: false,
          wasWindowed: false,
          wasMinimized: false,
        },
      },
    })),

  setAppState: (appId, newState) => {
  if (!get().appStates[appId]) return; 

    set(s => ({
      appStates: {
        ...s.appStates,
        [appId]: {
          ...s.appStates[appId],
          ...newState,
        },
      },
    }));
  },

  setDragging: (appId, dragging) => {
    get().setAppState(appId, { isDragging: dragging });
  },

  open: (appId) => {
    const { addTask } = Taskman.getState()
    const { bringToFront } = ZIndexShuffler.getState()
    get().setAppState(appId, {
      isOpen: true,
      isFullscreen: true,
      isWindowed: false,
      isMinimized: false,
      wasFullscreen: get().appStates[appId].isFullscreen,
      wasWindowed: get().appStates[appId].isWindowed,
      wasMinimized: get().appStates[appId].isMinimized
    });
    addTask(appId);
    bringToFront(appId);
  },

  kill: (appId) => {
    const {terminateTask} = Taskman.getState()
    const {removeAppZmap} = ZIndexShuffler.getState()
    get().setAppState(appId,{
      isOpen: false,
      isFullscreen: false,
      isWindowed: false,
      isMinimized: false,
      wasFullscreen: false,
      wasWindowed: false,
    });
    terminateTask(appId);
    removeAppZmap(appId);
  },

  toggleWindow: (appId) => {
      const currentState = get().appStates[appId];
      if (!currentState) return; 
      get().setAppState(appId, {
        wasFullscreen: currentState.isFullscreen,
        wasWindowed: currentState.isWindowed,
        wasMinimized: currentState.isMinimized,
        isFullscreen: !currentState.isFullscreen,
        isWindowed: !currentState.isWindowed,
      });
  },

  toggleMinimize: (appId) =>{
    const currentState = get().appStates[appId];
    if(!currentState) return;
    get().setAppState(appId, {
      isOpen: !currentState.isOpen,
      isMinimized: !currentState.isMinimized, 
      wasMinimized: get().appStates[appId].isMinimized,
    });
  },

  taskBarOpenClose: (appIndex) => {
      const { bringToFront } = ZIndexShuffler.getState()
      const state = get().appStates[appIndex];
      if (!state) return;
      if (state.isOpen) {
          bringToFront(appIndex); 
      } else {
          get().toggleMinimize(appIndex);
      }
  }
      
}));