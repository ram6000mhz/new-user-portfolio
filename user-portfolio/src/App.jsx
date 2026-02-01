import { Router, Route, lazy, prerender, LocationProvider } from 'preact-iso';
import { Suspense } from 'preact/compat';
// import { MainLayout } from './pages/MainLayout';
const MainLayout = lazy(() => import('./pages/MainLayout').then(m => m.MainLayout));

function HomePage() {
  return (
    <Suspense fallback={null}>
      <MainLayout/>
    </Suspense>
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