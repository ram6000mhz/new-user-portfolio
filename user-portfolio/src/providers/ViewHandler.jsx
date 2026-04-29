import { create } from 'zustand';
import  {IconFun } from '../apps/IconFun'
import {ZIndexShuffler} from '../providers/ZIndexShuffler'
import { Taskman } from '../taskman/Taskman';
import { CalendarHandler } from './CalendarHandler';

export const ViewHandler = create((set,get) => ({
    hr_Mode: true,
    isHome: true,
    toggleHrMode() {
        set((state) => ({ hr_Mode: !state.hr_Mode }));
        if(!get().hr_Mode){
            const { shutdownIconFun } = IconFun.getState();
            const { shutdownTaskman } = Taskman.getState();
            const { shutdownZIndexShuffler } = ZIndexShuffler.getState();
            const { shutdownCalendar } = CalendarHandler.getState();
            shutdownIconFun();
            shutdownTaskman();
            shutdownZIndexShuffler();
            shutdownCalendar();
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
