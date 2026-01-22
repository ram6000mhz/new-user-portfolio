import { Machineviewport } from './Machineviewport';
import { ViewHandler } from "../providers/ViewHandler";
import { Aboutme } from "../apps/appcontent/Aboutme";
import { DesktopFooter } from './DesktopFooter';
import {Navbar} from './Navbar'
// text-xs sm:text-sm md:text-base lg:text-lg
export const MainLayout = () => {
  console.log("MainLayout rendered");
  const hr_mode = ViewHandler((state) => state.hr_Mode);

  return (
    <div className="w-full h-full flex flex-col">
      {hr_mode &&(
        <Navbar/>
      )}
      <main className="grow">
        {hr_mode ? <Aboutme/>:<Machineviewport/>}
      </main>
      {!hr_mode &&(
        <DesktopFooter/>
      )}
    </div>
  );
};