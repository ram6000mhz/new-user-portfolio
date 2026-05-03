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
      day: 'numeric',
      year: 'numeric'
    }).format(new Date());
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const startDayOfWeek = startOfMonth.getDay();

    const allDaysInGrid = useMemo(() => {
        const days = [];
        for (let i = 0; i < 42; i++) {
            days.push(new Date(currentYear, currentMonth, i - startDayOfWeek + 1));
        }
        return days;
    }, [currentYear, currentMonth, startDayOfWeek]);

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
            <div className="grow bg-background grid grid-cols-7 p-2 auto-rows-fr">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="flex items-center justify-center text-[10px] text-white font-bold text-muted-foreground uppercase">
                        {day}
                    </div>
                ))}

                {allDaysInGrid.map((date, i) => {
                    const isCurrentMonth = date.getMonth() === currentMonth;
                    const isToday = date.toDateString() === new Date().toDateString();

                    return (
                        <div 
                            key={i} 
                            className={`flex items-center justify-center text-xs h-8
                            ${isCurrentMonth ? "text-slate-200" : "text-slate-600"}
                            ${isToday ? "bg-blue-500/20 rounded-full font-bold" : ""}`}
                        >
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}