export default function LandingSearch() {
    return (
        <div className="filter h-[44.5rem] flex flex-col justify-center items-center text-[#162A41]">
            <h1 className="text-white text-[3rem] font-semibold text-outline mb-10">
                Søg efter din drømmebolig
            </h1>
            <div className="bg-white flex h-[28%] w-[50%]  p-8 flex-col">
                <p className="text-[1.3rem] mb-6 font-semibold">
                    <span className="border-[#162A41] border-b-[0.3rem] pb-2">
                        Søg
                    </span>{" "}
                    blandt 158 boliger til salg i 74 butikker
                </p>
                <form action="/search" method="GET">
                    <label className="flex flex-col">
                        Hvad skal din næste bolig indeholde?
                        <div  className="w-full">
                            <input
                                name="results"
                                className=" media-search border-[#F3F1F1] border-2 w-[86%] h-12 pl-2 mt-2 "
                                type="search"
                                placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                            />
                            <button className="bg-[#162A41] text-white h-[2.9rem] w-[13%] ml-2 rounded-sm hover">
                                Søg
                            </button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    );
}
