import { lazy, Suspense } from 'preact/compat';
import { useEffect, useRef } from 'react';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/aboutme/Aboutme";
import { DesktopFooter } from './DesktopFooter';
import {Navbar} from './Navbar'
import DesktopBg from "../assets/img/rice.webp"
// text-xs sm:text-sm md:text-base lg:text-lg

const loaddesktop = () => import('./Machineviewport').then(m => m.Machineviewport)
const loadproject = () => import('../apps/appcontent/projects/Project').then(m => m.Project)

const Machineviewport = lazy(loaddesktop);
const Project = lazy(loadproject);

export const MainLayout = () => {
  const hr_mode = ViewHandler((state) => state.hr_Mode);
  const isHome = ViewHandler((state)=> state.isHome)
  const hasPreloaded = useRef(false);

  useEffect(() => {
    if (hr_mode && !hasPreloaded.current) {
      loaddesktop();
      loadproject();
      const img = new Image();
      img.src = DesktopBg;
      hasPreloaded.current = true;
      console.log("Preloaded successfully");
    }
  }, [hr_mode]);

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&(
        <Navbar />
      )}
      <main className="flex-1 min-h-0">
        <Suspense fallback={null}>
          {hr_mode ? 
            isHome ? 
              <Aboutme /> 
              : 
              <div className='pt-[70px] w-full h-full bg-black'>
                <Project /> 
              </div>
            : 
            <Machineviewport />
          }
        </Suspense>
      </main>
      {!hr_mode &&(
        <DesktopFooter/>
      )}
    </div>
  );
};