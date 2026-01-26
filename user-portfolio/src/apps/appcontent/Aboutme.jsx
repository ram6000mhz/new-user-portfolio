import {Power, Linkedin, Mail, Github, MapPin} from "lucide-react";

export const Aboutme = ()=>{

// possible ranking
// 1	Exposed	
// 2	Acquainted
// 3	Familiar
// 4	Functional
// 5	Practiced
// 6	Capable
// 7	Adept
// 8	Proficient
// 9	In-depth
// 10	Knowledgeable


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
        "Oracle Database": { rating: 1 }
    };

    const language_entries=Object.entries(langs);
    const language_count=Object.keys(langs).length;
    const maxRating = 10

    return(
        <div className="flex w-full h-full flex-row @container overflow-y-auto bg-white no-scrollbar">
            <div class="w-[10%] h-full"/>
            <div className="flex-1 flex-col items-start h-full relative px-5 pt-5 gap-3">
                <h1 className="font-bold text-5xl">
                    Ethan Sancho Yap
                </h1>
                <h2 className="font-semibold text-xl text-muted-text">
                    Software developer
                </h2>
                <h3 className="font-extralight text-md">
                    I enjoy building interesting projects.
                </h3>
                <div className="w-full">
                    <div className="flex flex-col items-start @lg:flex-row @lg:items-center w-full gap-5 px-3">
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold text-sm text-muted-text">Email</h2>
                            <div className="flex flex-row gap-1 justify-center items-center">
                                <Mail className="!w-[35px] !h-[35px] text-black"/>
                                <h4 className="font-sm text-sm text-black">
                                    esyworkpro@gmail.com
                                </h4>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold text-sm text-muted-text">Github</h2>
                            <div className="flex flex-row gap-1 justify-center items-center">
                                <Github className="!w-[35px] !h-[35px] text-black"/>
                                <h4 className="font-sm text-sm text-black">
                                    github.com/ram6000mhz
                                </h4>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold text-sm text-muted-text">LinkedIn</h2>
                            <div className="flex flex-row gap-1 justify-center items-center">
                                <Linkedin className="!w-[35px] !h-[35px] text-black"/>
                                <a 
                                    href="http://linkedin.com/in/ethan-sancho-yap-2439a2297/"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <h4 className="font-sm text-sm text-black">
                                        linkedin.com/in/ethan-sancho-yap
                                    </h4>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold text-sm text-muted-text">Location</h2>
                            <div className="flex flex-row gap-1 justify-center items-center">
                                <MapPin className="!w-[35px] !h-[35px] text-black"/>
                                <h4 className="font-sm text-sm text-black"> 
                                    Philippines
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <h2 className="font-semibold text-xl text-muted-text">
                        Skills
                    </h2>
                    <h3 className="font-extralight text-md">
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
                    </h3>
                    <div className="flex items-center w-full justify-center">

                        <div className="hidden @lg:grid w-[800px] h-full py-20" 
                            style={{ gridTemplateColumns: ` repeat(${language_count + 1}, minmax(0, 1fr))` }}>
                            <div></div>
                            {language_entries.map(([name]) => (
                                <div key={`name-${name}`} className="flex">
                                    <span className="text-xs origin-top-left -rotate-45">{name}</span>
                                </div>
                            ))}

                            <div className="flex flex-col gap-1">
                                {[...Array(maxRating)].map((_, i) => (
                                    <span key={i} className="h-8 flex items-center justify-center text-xs text-gray-500">
                                        {i + 1}
                                    </span>
                                ))}
                            </div>

                            {language_entries.map(([name, { rating }]) => (
                                <div key={`col-${name}`} className="flex flex-col gap-1">
                                    {[...Array(maxRating)].map((_, i) => {
                                        const rowLevel = i + 1;
                                        return (
                                            <div
                                                key={rowLevel}
                                                className={`w-8 h-8 border ${rowLevel <= rating ? 'bg-blue-600' : 'bg-gray-200'}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>  

                        <div className="@lg:hidden grid w-full h-full" 
                            style={{ 
                                gridTemplateColumns: `auto 1fr`,
                                gridTemplateRows: `auto 1fr` 
                            }}>
                            <div></div>
                            <div className="flex gap-1">
                                {[...Array(maxRating)].map((_, i) => (
                                    <span key={i} className="w-5 flex items-center justify-center text-xs text-gray-500">
                                        {i + 1}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1">
                                {language_entries.map(([name]) => (
                                    <div key={`name-mob-${name}`} className=" h-5 flex items-center justify-end pr-2">
                                        <span className="text-xs font-medium truncate">{name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-1">
                                {language_entries.map(([name, { rating }]) => (
                                    <div key={`row-${name}`} className="flex gap-1">
                                        {[...Array(maxRating)].map((_, i) => (
                                            <div key={i + 1} 
                                                className={`w-5 h-5 border ${i + 1 <= rating ? 'bg-blue-600' : 'bg-gray-200'}`} 
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            <div class="w-[10%] h-full"/>
        </div> 
    )
}