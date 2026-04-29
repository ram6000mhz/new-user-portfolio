import { create } from 'zustand';

export const CalendarHandler = create((set,get)=>({
    enableCalendar: false,
    toggleCalendar(){
        set((state) => ({ enableCalendar: !state.enableCalendar}));
    },
    shutdownCalendar(){
        if(get().enableCalendar){
            set({enableCalendar:false});
        }
    }
}))