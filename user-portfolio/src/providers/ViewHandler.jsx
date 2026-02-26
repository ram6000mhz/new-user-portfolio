import { create } from 'zustand';
import  {IconFun } from '../apps/IconFun'
import {ZIndexShuffler} from '../providers/ZIndexShuffler'
import { Taskman } from '../taskman/Taskman';

export const ViewHandler = create((set,get) => ({
    hr_Mode: true,
    isHome: true,
    toggleHrMode() {
        set((state) => ({ hr_Mode: !state.hr_Mode }));
        if(!get().hr_Mode){
            const { shutdownIconFun } = IconFun.getState();
            const { shutdownTaskman } = Taskman.getState();
            const { shutdownZIndexShuffler } = ZIndexShuffler.getState();
            shutdownIconFun();
            shutdownTaskman();
            shutdownZIndexShuffler();
        }
    },

    toggleisHome() {
        if (get().isHome) return;
        set({ isHome: true });
    },

    toggleisProject() {
        if (!get().isHome) return;
        set({ isHome: false });
    },
}))
