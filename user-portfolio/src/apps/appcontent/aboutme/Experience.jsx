export const Experience = () => {
    return(
        <div className="w-full items-center flex flex-col gap-2 px-4 max-w-4xl bg-black mx-auto pb-4">
            <div className="w-full flex  items-start">
                <h1 className="font-semibold text-xl text-white text-start">
                    My Experiences
                </h1>
            </div>
            <div className="flex flex-col items-start w-full border border-zinc-900 rounded-2xl p-2">
                <h1 className="font-semibold text-xl text-white text-start">
                    Coding Expert Data Annotator
                </h1>
                <a 
                    href="https://dataannotation.tech/coding"
                    aria-label="DataAnnotationsTech"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <h2 className="text-md text-white text-start">
                        DataAnnotationsTech
                    </h2>
                </a>
                
                <h3 className=" text-sm text-zinc-400 text-start cursor-pointer">
                    2026 - Current
                </h3>
                <p className="text-sm text-white text-start pt-2">
                    Currently contributing in improving frontier AI models.
                </p>
            </div>
            <div className="flex flex-col items-start w-full border border-zinc-900 rounded-2xl p-2">
                <h1 className="font-semibold text-xl text-white text-start">
                    Intern Web Programmer
                </h1>
                <a 
                        href="https://www.moodlearning.com/"
                        aria-label="Moodlearning"
                        target="_blank" 
                        rel="noopener noreferrer"
                >
                    <h2 className="text-md text-white text-start cursor-pointer">
                        Moodlearning
                    </h2>
                </a>
                <h3 className=" text-sm text-zinc-400 text-start">
                    2025
                </h3>
                <p className="text-sm text-white text-start pt-2">
                    Successfuly implemented new features for a nationwide spanning application.
                </p>
            </div>
        </div>
    )
}