import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { MainLayout } from './pages/MainLayout';
import { Machineviewport } from './pages/Machineviewport';
import { OtherLayout } from './pages/OtherLayout';
import { OtherViewport } from './pages/OtherViewport';

function HomePage() {
  return (
    <MainLayout>
      <Machineviewport/>
    </MainLayout>
  );
}

function Testpage() {
  return(
    <MainLayout>
      <OtherViewport/>
    </MainLayout>
  );
}

function OtherPage() {
  return (
    <OtherLayout>
      <OtherViewport />
    </OtherLayout>
  );
}

export function App() {
  return (
    <div className='w-screen h-screen'>
      <LocationProvider>
        <Router>
          <HomePage path="/" />
          <OtherPage path="/other" />
          <Testpage path="/test"/>
        </Router>
      </LocationProvider>
    </div>
  )
}
