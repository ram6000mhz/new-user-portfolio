import { lazy, LocationProvider, ErrorBoundary, Router} from 'preact-iso';
const MainLayout = lazy(() => import('./pages/MainLayout').then(m => m.MainLayout));
const Notfoundpage = lazy(()=>import('./components/Notfoundpage').then(m=>m.Notfoundpage))

function HomePage() {
  return (
    <ErrorBoundary>
      <MainLayout/>
    </ErrorBoundary>
  );
}

function Notfound404() {
  return (
    <ErrorBoundary>
      <Notfoundpage />
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <div className='w-screen h-dvh pb-[env(safe-area-inset-bottom)]'>
      <LocationProvider>
        <Router>
          <HomePage path="/" />
          <Notfound404 default />
        </Router>
      </LocationProvider>
    </div>
  )
}