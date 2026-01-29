import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { MainLayout } from './pages/MainLayout';
import { Machineviewport } from './pages/Machineviewport';

function HomePage() {
  return (
    <MainLayout/>
  );
}

export function App() {
  return (
    <div className='w-screen h-screen'>
      <LocationProvider>
          <HomePage path="/" />
      </LocationProvider>
    </div>
  )
}