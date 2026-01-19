import { Machineviewport } from './Machineviewport';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/Aboutme";
import { DesktopFooter } from './DesktopFooter';
// text-xs sm:text-sm md:text-base lg:text-lg
export const MainLayout = () => {
  console.log("MainLayout rendered");
  const toggleHrMode = ViewHandler((state) => state.toggleHrMode);
  const hr_mode = ViewHandler((state) => state.hr_Mode);

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&( 
        <nav 
            className="h-[40px] w-full bg-amber-200" 
            onClick={toggleHrMode}>
        </nav> 
      )}
      <main className="grow">
        {hr_mode ? <Aboutme/>:<Machineviewport/>}
      </main>
      <DesktopFooter/>
    </div>
  );
};