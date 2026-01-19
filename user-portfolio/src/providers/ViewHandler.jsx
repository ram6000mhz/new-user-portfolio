import { create } from 'zustand';

export const ViewHandler = create((set) => ({
    hr_Mode: true,
    toggleHrMode() {
        set((state) => ({ hr_Mode: !state.hr_Mode }));
    },
}))
