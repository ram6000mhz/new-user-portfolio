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

    const maxRating = 10
    const languages = Object.entries(langs);

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
                    <div className="flex flex-col items-start @md:flex-row @md:items-center w-full gap-5 px-3">
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
                    <div className="flex bg-red items-center w-full justify-center">
                        <div className="hidden @md:grid grid-cols-[auto_repeat(16,minmax(0,1fr))] gap-2">
                        <div className="flex flex-col items-end pr-2">
                            <div className="h-12 mb-4" /> 
                            <div className="flex flex-col gap-1">
                            {[...Array(11)].map((_, i) => (
                                <span key={i} className="h-6 flex items-center text-xs font-medium text-gray-500">{i}</span>
                            ))}
                            </div>
                        </div>
                        {Object.entries(langs).map(([name, { rating }]) => (
                            <div key={name} className="flex flex-col items-center">
                            <span className="mb-4 text-xs font-bold rotate-45 origin-bottom-left whitespace-nowrap h-12 w-6 flex items-end">
                                {name}
                            </span>
                            <div className="flex flex-col gap-1">
                                {[...Array(11)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-6 h-6 border ${i <= rating ? 'bg-blue-600' : 'bg-gray-200'}`}
                                />
                                ))}
                            </div>
                            </div>
                        ))}
                        </div>

                        <div className="flex  @md:hidden flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-24" />
                                <div className="flex gap-1">
                                    {[...Array(11)].map((_, i) => (
                                        <span key={i} className="w-4 text-[10px] text-center font-medium text-gray-500">
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {Object.entries(langs).map(([name, { rating }]) => (
                                <div key={name} className="flex items-center gap-2">
                                    <span className="w-24 text-xs font-bold truncate">{name}</span>
                                    <div className="flex gap-1">
                                        {[...Array(11)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-4 h-4 border ${i <= rating ? 'bg-blue-600' : 'bg-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>    
            <div class="w-[10%] h-full"/>
        </div> 
    )
}