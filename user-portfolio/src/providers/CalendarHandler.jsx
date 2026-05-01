import { create } from 'zustand';

export const CalendarHandler = create((set,get)=>({
    isCalendarVisible: false,
    toggleCalendar(){
        set((state) => ({ isCalendarVisible: !state.isCalendarVisible}));
    },
    shutdownCalendar(){
        if(get().isCalendarVisible){
            set({isCalendarVisible:false});
        }
    }
}))