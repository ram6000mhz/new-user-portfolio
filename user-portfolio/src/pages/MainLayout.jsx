import { lazy, Suspense } from 'preact/compat';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/aboutme/Aboutme";
import { DesktopFooter } from './DesktopFooter';
import {Navbar} from './Navbar'
// text-xs sm:text-sm md:text-base lg:text-lg

const loaddesktop = () => import('./Machineviewport').then(m => m.Machineviewport)

const Machineviewport = lazy(loaddesktop);

export const MainLayout = () => {
  const hr_mode = ViewHandler((state) => state.hr_Mode);

  if (hr_mode) {
    loaddesktop();
  }

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&(
        <Navbar/>
      )}
      <main className="flex-1 min-h-0">
        <Suspense fallback={null}>
          {hr_mode ? <Aboutme /> : <Machineviewport />}
        </Suspense>
      </main>
      {!hr_mode &&(
        <DesktopFooter/>
      )}
    </div>
  );
};