

"use client";

import PropertyCard from "@/components/PropertyCard/PropertyCard";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/debounce";

export default function Properties() {
    const maxValue = 12000000;
    
    const [homes, setHomes] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [selectedValue, setSelectedValue] = useState("all");
    const [rangeValue, setRangeValue] = useState(maxValue);
    const [visibleCount, setVisibleCount] = useState(4);
    const debouncedRangeValue = useDebounce(rangeValue, 2000);
    const token = getCookie("dm_token");

    function handleRangeValue(event) {
        setRangeValue(event.target.value);
    }

    useEffect(() => {
        const option = `?price_gte=0&price_lte=${debouncedRangeValue}`;
        async function fetchHomes() {
            const getProperties = await fetch(
                `https://dinmaegler.onrender.com/homes${option}` + 
                (selectedValue === "all" ? "" : `&type_eq=${selectedValue}`)
            );
            const homes = await getProperties.json();
            setHomes(homes);
        }
        fetchHomes();
    }, [debouncedRangeValue, selectedValue]);

    useEffect(() => {
        async function fetchFavorites() {
            const getFavorites = await fetch("https://dinmaegler.onrender.com/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const favResponse = await getFavorites.json();
            setFavorites(favResponse);
        }
        fetchFavorites();
    }, []);

    function handleOptions(event) {
        setSelectedValue(event.target.value);
    }

    function loadMore() {
        setVisibleCount((prevState) => prevState + 4);
    }

    return (
        <main className="flex flex-col items-center mb-16 bg-white pb-20">
            <div className="tilsalgFilter bg-[#F8F8FB] flex items-center justify-center w-full mb-12">
                <h2 className="text-white text-[4rem] font-bold">Boliger til salg</h2>
            </div>
            <section className="w-[75rem] flex mb-16">
                <div className="pl-6">
                    <h2 className="text-[1.3rem] mb-6 font-semibold">
                        <span className="border-[#162A41] border-b-[0.3rem] pb-2">Søg</span> efter dit drømmehus
                    </h2>
                    <div className="flex">
                        <label className="flex flex-col">
                            Ejendomstype
                            <select 
                                value={selectedValue} 
                                onChange={handleOptions} 
                                className="border-[#F3F1F1] border-2 h-12 mt-2 bg-white w-[20rem] pl-2 text-[#333333]"
                            >
                                <option value="all">Ejendomstype</option>
                                <option value="Villa">Villa</option>
                                <option value="Landejendom">Landejendom</option>
                                <option value="Ejerlejlighed">Ejerlejlighed</option>
                                <option value="Byhus">Byhus</option>
                            </select>
                        </label>

                        <label className="flex flex-col w-[40rem] ml-4 justify-center pt-4">
                            Pris-interval
                            <input 
                                className="w-full bg-gray-100 my-2 w-full h-[0.15rem] bg-gray-300 appearance-none rounded-full focus:outline-none focus:ring-2 focus:ring-gray-100" 
                                onChange={handleRangeValue} 
                                value={rangeValue} 
                                type="range" 
                                min="0" 
                                max={maxValue} 
                            />
                            <div className="flex justify-between">
                                <span>{rangeValue}</span>
                                <span>{maxValue}</span>
                            </div>     
                        </label>
                    </div>
                </div>
            </section>

            {homes.length === 0 ? (
                <span className="text-2xl font-semibold">Ingen boliger opfylder disse søge kriterier.</span>
            ) : (
                <>
                    <div className="grid grid-cols-2 justify-items-center w-[74rem]">
                        {homes.slice(0, visibleCount).map((items) => (
                            <PropertyCard items={items} key={items.id} fav={favorites?.homes} token={token} />
                        ))}
                    </div>
                    {visibleCount < homes.length && (
                        <button 
                            onClick={loadMore} 
                            className="mt-6 px-6 py-3 bg-[#162A41] text-white rounded-lg hover:bg-[#162A41]"
                        >
                            Vis flere
                        </button>
                    )}
                </>
            )}
        </main>
    );
}


