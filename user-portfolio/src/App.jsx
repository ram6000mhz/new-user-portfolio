import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { MainLayout } from './pages/MainLayout';
import { Machineviewport } from './pages/Machineviewport';
import { TaskmanProvider } from './taskman/Taskman';
import { ZIndexShufflerProvider } from './providers/ZIndexShuffler';

function HomePage() {
  return (
    <MainLayout>
      <Machineviewport/>
    </MainLayout>
  );
}

export function App() {
  console.log("App rendered");
  return (
    <TaskmanProvider>
      <ZIndexShufflerProvider>
          <div className='w-screen h-screen'>
            <LocationProvider>
                <HomePage path="/" />
            </LocationProvider>
          </div>
      </ZIndexShufflerProvider>
    </TaskmanProvider>
  )
}