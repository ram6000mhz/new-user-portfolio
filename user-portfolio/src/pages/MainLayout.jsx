export const MainLayout = ({children}) => {
  
  return (
    <div className="w-full h-full flex flex-col">
        <nav className="w-full h-[60px] border-b border-muted-border flex flex-row items-center px-2 sm:px-4 md:px-6 lg:px-10">
          <div class="text-xs sm:text-sm md:text-base lg:text-lg">Responsive text</div>
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