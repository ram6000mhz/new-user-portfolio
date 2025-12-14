import { create } from "zustand";

export const IconFun = create((set, get) => ({
  appStates: {}, 

  initializeApp: (id, initialState) =>
    set(s => ({
      appStates: {
        ...s.appStates,
        [id]: initialState || {
          isDragging: false,
          isOpen: false,
          isFullscreen: false,
          isWindowed: false,
          isMinimized: false,
        },
      },
    })),

  setAppState: (id, newState) => {
   if (!get().appStates[id]) return; 

    set(s => ({
      appStates: {
        ...s.appStates,
        [id]: {
          ...s.appStates[id],
          ...newState,
        },
      },
    }));
  },

  setDragging: (id, dragging) => {
    console.log(`Setting app ID ${id} isDragging to ${dragging}`);
    get().setAppState(id, { isDragging: dragging });
  },
  
  open: (id) => {
    get().setAppState(id, {
      isOpen: true,
      isFullscreen: true,
      isWindowed: false,
      isMinimized: false,
    });
  },
  kill: () =>
    set({
      isOpen: false,
      isFullscreen: false,
      isWindowed: false,
      isMinimized: false,
    }),

  toggleWindow: () =>
    set(s => ({
      isFullscreen: !s.isFullscreen,
      isWindowed: !s.isWindowed,
    })),

  toggleMinimize: () =>
    set(s => ({
      isOpen: !s.isOpen,
      isMinimized: !s.isMinimized,
    })),
}));