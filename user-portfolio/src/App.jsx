import { lazy, LocationProvider, ErrorBoundary} from 'preact-iso';
const MainLayout = lazy(() => import('./pages/MainLayout').then(m => m.MainLayout));

function HomePage() {
  return (
    <ErrorBoundary>
      <MainLayout/>
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <div className='w-screen h-dvh pb-[env(safe-area-inset-bottom)]'>
      <LocationProvider>
          <HomePage path="/" />
      </LocationProvider>
    </div>
  )
}