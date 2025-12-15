import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { MainLayout } from './pages/MainLayout';
import { Machineviewport } from './pages/Machineviewport';
import { TaskmanProvider } from './taskman/Taskman';

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
          <div className='w-screen h-screen'>
            <LocationProvider>
                <HomePage path="/" />
            </LocationProvider>
          </div>
    </TaskmanProvider>
  )
}