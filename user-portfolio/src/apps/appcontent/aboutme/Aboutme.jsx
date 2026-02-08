import { Skillchart } from "./Skillchart";
import { Contacables } from "./Contacables";
import { Intro } from "./Intro";

export const Aboutme = ()=>{
    return(
        <div className="flex w-full h-full flex-row @container overflow-auto overscroll-none no-scrollbar bg-black">
            <div className="flex-1 flex-col items-center h-full relative">
                <Intro/>
                <Contacables/>
                <Skillchart/>      
            </div>    
        </div> 
    )
}