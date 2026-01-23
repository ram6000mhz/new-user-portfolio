import { useState, useEffect } from "react";

export const Timer = ()=>{
    console.log("time change")
    const [time,setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const now = time.toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    const date = time.toLocaleDateString();

    return(
        <div className="flex flex-col items-center justify-center h-full">
            <time className="text-xs sm:text-sm text-accent-text">{now}</time>
            <time className="text-xs sm:text-sm text-accent-text">{date}</time>
        </div>
    )
}