import { Projectlist } from "./Projectlist";
import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  selectedId: null,
  isOpen: false,
  project: null,
  
  setSelectedProject: (id) => {
    const { isOpen, selectedId } = get();
    if (isOpen && selectedId === id) return;
    if (isOpen) {
      set({ isOpen: false });
      setTimeout(() => {
        set({ 
          selectedId: id, 
          isOpen: true, 
          project: Projectlist.find(p => p.appid === id) 
        });
      }, 300);
      return; 
    }
    set({ 
      selectedId: id, 
      isOpen: true, 
      project: Projectlist.find(p => p.appid === id) 
    });
  },
  
  closeSidebar: () => set({ isOpen: false }),
}));