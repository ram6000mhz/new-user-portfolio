import { lazy, ErrorBoundary } from 'preact-iso';
import { Intro } from "./Intro";
import { Experience } from './Experience';
import { Footer } from '../../../pages/Footer';
import { ViewHandler } from '../../../providers/ViewHandler';
const Skillchart = lazy(() => import('./Skillchart').then(m => m.Skillchart));

export const Aboutme = ()=>{
    const hr_mode = ViewHandler((state) => state.hr_Mode);
    return(
        <div className="flex w-full h-full flex-row overflow-auto overscroll-none no-scrollbar select-none bg-black">
            <div className="flex-1 flex-col items-center h-full relative">
                <Intro/>
                <ErrorBoundary>
                    <Skillchart/>     
                </ErrorBoundary>  
                <Experience/>
                {hr_mode && (
                    <Footer />
                )}
            </div>    
        </div> 
    )
}