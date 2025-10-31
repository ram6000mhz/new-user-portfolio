export const MainLayout = ({children}) => {
  
  return (
    <div className="w-full h-full flex flex-col">
        <nav className="w-full h-[60px] border-b border-muted-border flex flex-row items-center px-10">
          navbar
        </nav>
        <main className="flex-1 overflow-auto">
            {children}
        </main>
        <footer className="w-full h-[50px]">
          footer
        </footer>
    </div>
  );
};