import { lazy, ErrorBoundary } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/aboutme/Aboutme";
import { DesktopFooter } from './DesktopFooter';
import { Footer } from './Footer';
import {Navbar} from './Navbar';
import DesktopBg from "../assets/img/rice.webp"
import { WIPBanner } from '../components/WIPBanner';
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
    }
  }, [hr_mode]);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);
  console.log("render")
  
  const handleScroll = (e) => {
    const target = e.target;
    const isBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    setIsAtBottom((prev) => {
      if (prev !== isBottom) return isBottom;
      return prev;
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&(
        <Navbar />
      )}
      <main className="flex-1 min-h-0">
        <WIPBanner duration={3000} />
        <ErrorBoundary>
          {hr_mode ? 
            isHome ? 
              <Aboutme ref={scrollRef} onScroll={handleScroll} /> 
              : 
              <div className='pt-[70px] w-full h-full bg-black'>
                <Project /> 
              </div>
            : 
            <Machineviewport />
          }
        </ErrorBoundary>
      </main>

      {hr_mode && (
        <div 
            className={`w-full overflow-hidden transition-all duration-100 ease-in-out ${
            isAtBottom ? 'max-h-[500px] opacity-100' : 'max-h-0 pointer-events-none'
          }`}
        >  
        <Footer />
        </div>
      )}
      
      {!hr_mode && <DesktopFooter />}
    </div>
  );
};