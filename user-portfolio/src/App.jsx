import { lazy, LocationProvider, ErrorBoundary} from 'preact-iso';
const MainLayout = lazy(() => import('./pages/MainLayout'));

function HomePage() {
  return (
    <ErrorBoundary>
      <MainLayout/>
    </ErrorBoundary>
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