import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { MainLayout } from './pages/MainLayout';
import { Machineviewport } from './pages/Machineviewport';
import { TaskmanProvider } from './taskman/Taskman';
import { IconFun } from './apps/IconFun';

function HomePage() {
  return (
    <MainLayout>
      <Machineviewport/>
    </MainLayout>
  );
}


export function App() {
  return (
    <TaskmanProvider>
      <IconFun>
        <div className='w-screen h-screen'>
          <LocationProvider>
            <Router>
              <HomePage path="/" />
            </Router>
          </LocationProvider>
        </div>
      </IconFun>
    </TaskmanProvider>
  )
}
