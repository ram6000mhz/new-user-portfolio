import { useState, useEffect } from "preact/hooks";
import { CalendarHandler } from "../providers/CalendarHandler";
export const Timer = ()=>{
    const [time,setTime] = useState(new Date())
    const toggleCalendar = CalendarHandler((state) => state.toggleCalendar);
    useEffect(() => {
        const timer = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const now = time.toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    const date = time.toLocaleDateString();

    return(
        <div className="flex flex-col items-center justify-center h-full px-1 hover:bg-foreground-highlight cursor-pointer rounded-sm select-none" onClick={toggleCalendar}>
            <time className="text-xs sm:text-sm text-accent-text">{now}</time>
            <time className="text-xs sm:text-sm text-accent-text">{date}</time>
        </div>
    )
}