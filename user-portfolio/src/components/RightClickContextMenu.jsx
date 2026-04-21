export const RightClickContextMenu = ({ x, y }) => {
    return(
        <div 
            style={{ 
                position: 'absolute', 
                top: `${y}px`, 
                left: `${x}px`, 
                zIndex: 100
            }}
            className="bg-foreground border-muted-border border rounded-md p-2 min-w-[120px]"
        >
            <ul className="text-white text-sm">
                <li className="hover:bg-foreground-highlight cursor-pointer p-1">wip controls</li>
                <li className="hover:bg-foreground-highlight cursor-pointer p-1">wip controls 2</li>
            </ul>
        </div>
    )
}