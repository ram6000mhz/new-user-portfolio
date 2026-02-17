
export const Skillchart = ()=>{

    const langs = {
        "PHP": { rating: 2 },
        "MongoDB": { rating: 3 },
        "Express": { rating: 4 },
        "JavaScript": { rating: 5 },
        "CSS": { rating: 6 },
        "Python": { rating: 6 },
        "Java": { rating: 7 },
        "Flutter": { rating: 7 },
        "HTML": { rating: 7 },
        "React": { rating: 7 },
        "Tailwind CSS": { rating: 6 },
        "Firebase": { rating: 5 },
        "PostgreSQL": { rating: 4 },
        "MySQL": { rating: 3 },
        "Laravel": { rating: 2 },
        "Oracle Database": { rating: 1 },
        "Cloudflare": { rating:1 } 
    };

    const language_entries=Object.entries(langs);
    const maxRating = 10

    return(
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-4xl px-4 flex flex-col items-center">       
                <div className="text-center">
                    <h2 className="font-semibold text-xl text-white text-start">Skills</h2>
                        <h3 className="font-extralight text-justify text-md indent-12 text-white">
                            Here is the distribution of my skill across multiple technologies.
                            This chart is based on the article {' '}
                            <a 
                                href="https://thetshaped.dev/p/the-t-shaped-software-developer"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <span className="font-semibold text-md underline"> 
                                    the t-shaped developer.
                                </span>
                            </a>
                            {' '} Where the point is to have depth in expertise in some skills while also having base understanding in many areas.
                        </h3>
                </div>
                <div className="flex items-center w-full justify-center">
                    <div className="hidden @2xl:grid py-15" 
                        style={{ gridTemplateColumns: `auto auto` }}>
                        <div></div>
                        <div className="flex items-center gap-2">
                            {language_entries.map(([name]) => (
                                <div 
                                    key={`name-${name}`} 
                                    className="flex-1 flex items-center w-full"
                                    style={{ width: 'clamp(20px, 4cqw, 40px)'}}
                                >
                                    <span 
                                    className="origin-top-left -rotate-45 whitespace-nowrap text-white"
                                        style={{ 
                                            fontSize: 'clamp(12px, 1.5cqw, 14px)'
                                        }}
                                    >
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 pr-4">
                            {[...Array(maxRating)].map((_, i) => (
                                <span key={i} className="flex items-center justify-end text-xs text-muted-text"
                                    style={{
                                        height: 'clamp(1px, 4cqw, 40px)'
                                    }}
                                >
                                    {i + 1}
                                </span>
                            ))}
                        </div>
                        <div className="flex">
                            {language_entries.map(([name, { rating }]) => (
                                <div key={`col-${name}`} className="flex-1 flex flex-col gap-2">
                                    {[...Array(maxRating)].map((_, i) => (
                                        <div
                                            key={i + 1}
                                            className={` overflow-hidden rounded-md ${i + 1 <= rating ? 'bg-background-muted' : 'bg-white'}`}
                                            style={{
                                                width: 'clamp(20px, 4cqw, 40px)',
                                                height: 'clamp(20px, 4cqw, 40px)'
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>  

                    <div className="@2xl:hidden grid w-full h-full items-center justify-tems-center" 
                        style={{ 
                            gridTemplateColumns: `auto auto`,
                        }}>
                        <div></div>
                        <div className="flex gap-1">
                            {[...Array(maxRating)].map((_, i) => (
                                <span key={i} className="w-5 flex items-center justify-center text-xs text-muted-text"
                                    style={{ width: 'clamp(1px, 4cqw, 20px)' }}
                                >
                                    {i + 1}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            {language_entries.map(([name]) => (
                                <div key={`name-mob-${name}`} 
                                    className=" flex items-center justify-end pr-2"
                                    style={{ height: 'clamp(1px, 4cqw, 20px)' }}
                                >
                                    <span className="text-xs font-medium truncate text-white">{name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            {language_entries.map(([name, { rating }]) => (
                                <div key={`row-${name}`} className="flex gap-1">
                                    {[...Array(maxRating)].map((_, i) => (
                                        <div key={i + 1} 
                                            className={`rounded-xs ${i + 1 <= rating ? 'bg-background-muted' : 'bg-white'}`} 
                                            style={{
                                                width: 'clamp(1px, 4cqw, 20px)',
                                                height: 'clamp(1px, 4cqw, 20px)'
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}