import { Skillchart } from "./Skillchart";
import { Contacables } from "./Contacables";
import { Intro } from "./Intro";

export const Aboutme = ()=>{
    console.log("renderabourme")

    return(
        <div className="flex w-full h-full flex-row @container overflow-auto no-scrollbar bg-white">
            <div class="w-[10%] h-full"/>
            <div className="flex-1 flex-col items-start h-full relative px-5 pt-5 gap-3">
                <Intro/>
                <Contacables/>
                <Skillchart/>
            </div>    
            <div class="w-[10%] h-full"/>
        </div> 
    )
}