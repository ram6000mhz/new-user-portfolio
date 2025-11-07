export const IconComponent = ({Children, Title}) => {
    return (
        <div className="flex flex-col items-center p-2">
            {Children}
            <p className="text-center text-xs text-accent-text">{Title}</p>
        </div>
    )
};