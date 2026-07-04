export const Experience = () => {
    return(
        <div className="w-full items-center flex flex-col gap-2 px-4 max-w-4xl bg-black mx-auto">
            <div className="w-full flex  items-start">
                <h1 className="font-semibold text-xl text-white text-start">
                    My Experiences
                </h1>
            </div>
            <div className="flex flex-col items-start w-full border border-zinc-400 rounded-2xl p-2">
                <h1 className="font-semibold text-xl text-white text-start">
                    Coding Expert Data Annotator
                </h1>
                <h2 className="text-md text-white text-start">
                    DataAnnotationsTech
                </h2>
                <h3 className=" text-sm text-zinc-400 text-start">
                    2026 - Current
                </h3>
                <p className="text-sm text-white text-start pt-2">
                    Contributing in improving frontier AI models.
                </p>
            </div>
            <div className="flex flex-col items-start w-full border">
                <h1>
                    Intern Web programmer
                </h1>
                <h2>
                    Moodlearning
                </h2>
                <h3>
                    2025
                </h3>
                <p>
                    Successfuly implemented new features for a nationwide spanning application.
                </p>
            </div>
        </div>
    )
}