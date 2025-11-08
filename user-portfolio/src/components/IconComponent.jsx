export const IconComponent = ({Children, Title}) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60px] w-[75px] p-1 rounded-md hover:bg-foreground-highlight">
            {Children}
            <p className="text-center text-xs text-accent-text">{Title}</p>
        </div>
    )
};