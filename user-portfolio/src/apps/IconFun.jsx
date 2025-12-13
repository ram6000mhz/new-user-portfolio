import { create } from "zustand";

export const useIconStore = () =>
  create(set => ({
    isOpen: false,
    isFullscreen: false,
    isWindowed: false,
    isMinimized: false,

    open: () =>
      set({
        isOpen: true,
        isFullscreen: true,
        isWindowed: false,
        isMinimized: false,
      }),

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
