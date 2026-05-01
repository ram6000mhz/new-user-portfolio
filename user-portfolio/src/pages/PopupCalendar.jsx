import { useMemo } from 'preact/hooks';
import { CalendarHandler } from '../providers/CalendarHandler';

export const PopupCalendar = () => {
    const isCalendarVisible = CalendarHandler((state)=> state.isCalendarVisible)
    const isCalendarRendered = CalendarHandler((state)=> state.isCalendarRendered)
    const handleAnimationEnd = CalendarHandler((state) => state.handleAnimationEnd);
    const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
    }, []);

    return(
        <div 
            onAnimationEnd={handleAnimationEnd}
            className={`flex flex-col w-[250px] h-[300px] bg-foreground 
            border-muted-border border-2 rounded-xl absolute bottom-0 
            right-0 z-50 m-2 overflow-hidden
            ${isCalendarVisible ? "animate-window-in-from-right" : "animate-window-out-to-right"}
            `}
            >
            <div className="flex w-full h-[50px] bg-foreground items-center justify-start text-white pl-2 text-sm">
                {formattedDate}
            </div>
            <div className="grow bg-background">

            </div>
        </div>
    )
}