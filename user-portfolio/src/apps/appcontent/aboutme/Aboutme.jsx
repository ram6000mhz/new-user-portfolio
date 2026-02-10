import { lazy, Suspense } from 'preact/compat';
import { Intro } from "./Intro";

const Skillchart = lazy(() => import('./Skillchart').then(m => m.Skillchart));

export const Aboutme = ()=>{
    return(
        <div className="flex w-full h-full flex-row @container overflow-auto overscroll-none no-scrollbar bg-black">
            <div className="flex-1 flex-col items-center h-full relative">
                <Intro/>
                <Suspense fallback={null}>
                    <Skillchart/>   
                </Suspense>   
            </div>    
        </div> 
    )
}