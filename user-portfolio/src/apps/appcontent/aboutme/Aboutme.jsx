import { Skillchart } from "./Skillchart";
import { Contacables } from "./Contacables";
import { Intro } from "./Intro";

export const Aboutme = ()=>{
    return(
        <div className="flex w-full h-full flex-row @container overflow-auto no-scrollbar bg-white">
            <div class="w-[10%] h-full"/>
            <div className="flex-1 flex-col items-center h-full relative pt-5 gap-3">
                <Intro/>
                <Contacables/>
                <Skillchart/>
            </div>    
            <div class="w-[10%] h-full"/>
        </div> 
    )
}