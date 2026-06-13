import { create } from 'zustand';

export const CalendarHandler = create((set,get)=>({
    isCalendarVisible: false,
    isCalendarPortalRendered: false,

    toggleCalendar(){
        if(!get().isCalendarVisible){
            set((state) => ({ isCalendarPortalRendered: true}));
            set((state) => ({ isCalendarVisible: true}));
        }else{
            set((state) => ({ isCalendarVisible: false}));
        }
    },

    setisCalendarPortalRendered(){
        if(!get().isCalendarVisible) set((state) => ({ isCalendarPortalRendered: false}));
    },

    shutdownCalendar(){
        set({isCalendarVisible:false});
        set({isCalendarPortalRendered:false});
    }
}))