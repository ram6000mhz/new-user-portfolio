import {Power, Linkedin, Mail, Github, MapPin} from "lucide-react";

export const Aboutme = ()=>{
    const lang = ["JS", "Py", "Rust", "Go", "C++", "Java", "Swift", "TS", "PHP", "Ruby"];  

    const langs = {
        "JS": { rating: 1 },
        "Flutter": { rating: 1 },
        "Python": { rating: 9 },
        "Rust": { rating: 4 },
        "Go": { rating: 7 },
        "C++": { rating: 10 },
        "Java": { rating: 3 },
        "Swift": { rating: 6 },
        "TS": { rating: 8 },
        "PHP": { rating: 2 }
    };

    const langKeys = Object.keys(langs)

    return(
        <div className="flex flex-col items-start w-full h-full bg-white relative px-80 pt-5 @container gap-3 overflow-y-auto">
            <h1 className="font-bold text-5xl">
                Ethan Sancho Yap
            </h1>
            <h2 className="font-semibold text-xl text-muted-text">
                Software developer
            </h2>
            <h3 className="font-extralight text-md">
                I enjoy building interesting projects.
            </h3>
            <div className="w-full h-px bg-muted-text my-5" />
            <div className="w-full">
                <div className="flex flex-row items-center justify-center w-full gap-5 px-3">
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
                            <h4 className="font-sm text-sm text-black">
                                linkedin.com/in/ethan-sancho-yap-2439a2297/
                            </h4>
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
            <div className="w-full h-px bg-muted-text my-5" />
            <div className="w-full flex flex-col items-start">
                <h2 className="font-semibold text-xl text-muted-text">
                    Skills
                </h2>
                <div className="flex bg-red items-center w-full justify-center">
                    <div className="grid grid-cols-10 grid-rows-[auto_repeat(10,minmax(0,1fr))] gap-1">
                        {langKeys.map(name => (
                            <div key={name} className="text-center font-bold text-xs">{name}</div>
                        ))}

                        {Array.from({ length: 10 }, (_, i) => {
                            const currentRow = i + 1; 
                            
                            return langKeys.map(name => (
                                <div 
                                    key={`${name}-${currentRow}`}
                                    className={`h-6 w-full ${langs[name].rating >= currentRow ? 'bg-blue-500' : 'bg-gray-200'}`}
                                />
                            ));
                        })}
                    </div>
                </div>
            </div>
        </div>         
    )
}