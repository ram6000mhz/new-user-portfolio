import { create } from "zustand";
import {ZIndexShuffler} from '../providers/ZIndexShuffler.jsx';

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
    console.log(`Setting app ID ${appId} isDragging to ${dragging}`);
    get().setAppState(appId, { isDragging: dragging });
    console.log(`print all states:`, get().appStates);
  },
  
  open: (appId) => {
    get().setAppState(appId, {
      isOpen: true,
      isFullscreen: true,
      isWindowed: false,
      isMinimized: false,
    });
  },

  kill: (appId) =>
    get().setAppState(appId,{
      isOpen: false,
      isFullscreen: false,
      isWindowed: false,
      isMinimized: false,
  }),

  toggleWindow: (appId) =>
    get().setAppState(appId,{
      isFullscreen: !appId.isFullscreen,
      isWindowed: !appId.isWindowed,
    }),

  toggleMinimize: (appId) =>
    get().setAppState(appId,{
      isOpen: !appId.isOpen,
      isMinimized: !appId.isMinimized,
    }),

  taskBarOpenClose: (appIndex) => {
      const { bringToFront } = ZIndexShuffler.getState()
      const state = get().appStates[appIndex];
      console.log("bring app to front")
      if (!state) return;
      if (state.isOpen) {
          bringToFront(appIndex); 
      } else {
          get().toggleMinimize(appIndex);
      }
  }
      
}));