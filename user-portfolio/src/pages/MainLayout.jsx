export const MainLayout = ({children}) => {
  
  return (
    <div className="w-full h-full flex flex-col">
        <nav className="w-full h-[30px] bg-amber-400">
            navbar
        </nav>
        <main className="flex-1 overflow-auto">
            {children}
        </main>
        <footer className="w-full h-[30px] bg-amber-400">
            footer
        </footer>
    </div>
  );
};