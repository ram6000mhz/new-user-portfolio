import { Projectlist } from "./Projectlist";
import { create } from "zustand";

export const useProjectStore = create((set, get) => ({
  selectedId: null,
  isOpen: false,
  project: null,
  
  setSelectedProject: (id) => {
    // if(get().isOpen){
    //   get().closeSidebar()
    //   set({ isOpen: false})
    //   return
    // }
    set({ 
      selectedId: id, 
      isOpen: true,
      project: Projectlist.find(p => p.appid === id) 
    })
  },
  
  closeSidebar: () => set({ isOpen: false, selectedId: null, project: null }),
}));