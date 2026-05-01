import { create } from 'zustand';

export const CalendarHandler = create((set,get)=>({
    isCalendarVisible: false,
    isCalendarRendered: false,

    toggleCalendar(){
        if(!get().isCalendarVisible){
            set((state) => ({ isCalendarRendered: true}));
            set((state) => ({ isCalendarVisible: true}));
        }else{
            set((state) => ({ isCalendarVisible: false}));
        }
    },

    setIsCalendarRendered(){
        if(!get().isCalendarVisible) set((state) => ({ isCalendarRendered: false}));
    },

    shutdownCalendar(){
        if(get().isCalendarVisible){
            set({isCalendarVisible:false});
            set({isCalendarRendered:false})
        }
    }
}))