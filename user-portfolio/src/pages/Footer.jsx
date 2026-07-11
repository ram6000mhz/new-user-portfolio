import { useState, useEffect } from "preact/hooks";
export const Footer = () => {
    const [year, setYear] = useState('');

    useEffect(() => {
        setYear(new Date().getFullYear().toString());
    }, []);
    return (
        <div 
            className='flex flex-col w-full h-[100px] bg-black text-white justify-center items-center py-4 gap-4 border-t border-zinc-900'
        >
            <div className="flex flex-row text-white">
                © {year} Ethan-dev.me. All rights reserved.
            </div>
        </div>
    );
};