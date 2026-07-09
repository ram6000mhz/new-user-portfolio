import { lazy, ErrorBoundary } from 'preact-iso';
import { Intro } from "./Intro";
import { Experience } from './Experience';
import { forwardRef } from 'preact/compat';
const Skillchart = lazy(() => import('./Skillchart').then(m => m.Skillchart));

export const Aboutme = forwardRef(({ onScroll }, ref)=>{
    return(
        <div onScroll={onScroll} ref={ref} className="flex w-full h-full flex-row overflow-auto overscroll-none no-scrollbar select-none bg-black">
            <div className="flex-1 flex-col items-center h-full relative">
                <Intro/>
                {/* <ErrorBoundary>
                    <Skillchart/>     
                </ErrorBoundary>   */}
                <Experience/>
            </div>    
        </div> 
    )
})