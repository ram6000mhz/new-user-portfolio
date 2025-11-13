const IconFun = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isWindowed, setIsWindowed] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleClick = () => {
        setIsFullscreen(true);
        setIsOpen(true);
        addTask(appIndex);
        console.log(taskman);
    };

    const killProcess = () => {
        setIsOpen(false);
        setIsFullscreen(false);
        setIsWindowed(false);
        TerminateProcess(appIndex);
    }

    const WindowMode = () => {
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }

    const MinimizeMode = () => {
        console.log("Minimize");
        setIsOpen(!isOpen);
        setIsFullscreen(!isFullscreen);
        setIsWindowed(!isWindowed);
    }


    return (<div>IconFun Component</div>
    );
}