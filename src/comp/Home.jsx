import React, { useState, Suspense, useEffect, useCallback } from 'react'
import axios from 'axios'
import Info from './Info';

const Home = () => {

    const [pokemon, setPokemon] = useState('')
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null)
    const [types, setTypes] = useState(null)
    const [allfilter, setFilter] = useState(null)
    const [result, setResult] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const search = () => {

        if (pokemon === "") return null

        setLoading(true);

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
            .then((response) => {
                // console.log(response);
                setPokemon("");
                setSearchResult(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const alltypes = useCallback(() => {

        axios.get('https://pokeapi.co/api/v2/type')
            .then((response) => {
                setTypes(response.data.results)
                // console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [types])

    const filterRes = (type) => {
        setFilter(null)
        setSearchResult(null)
        if (type === "") {
            return;
        }
        const url = types.find((e) => e.name === type).url
        setLoading(true)

        axios.get(url)
            .then((response) => {
                setFilter(response.data.pokemon);
                setCurrentPage(1);
                // console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const lastIdx = currentPage * itemsPerPage;
    const firstIdx = lastIdx - itemsPerPage;

    useEffect(() => {

        console.log(firstIdx, "frstindex", lastIdx, "lastindex", currentPage, "inside effect");

        setResult(allfilter && allfilter.slice(firstIdx, lastIdx));

    }, [allfilter, currentPage]);

    const goToNextPage = () => {
        if (currentPage < Math.ceil(allfilter.length / itemsPerPage)) {

            console.log(firstIdx, "frstindex", lastIdx, "lastindex", currentPage, "inside fun");

            setCurrentPage((prev) => prev + 1);
        }
    };

    console.log(firstIdx, "frstindex", lastIdx, "lastindex", currentPage, "GLOBAL");

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        alltypes()
    }, [])


    console.log(allfilter, "AllFilter");


    return (
        <>
            <main className='min-h-screen h-fit bg-slate-500'>
                <nav className='w-full bg-amber-400 p-2 '>
                    <h1 className='font-bold text-xl'>PokeDEX</h1>
                </nav>

                <div className='hero p-2 h-40 flex-col flex items-center justify-center gap-2 m-auto flex-wrap'>

                    <div className='flex gap-2 items-center'>
                        <label className='text-white' htmlFor="">Filter</label>
                        <select className='rounded-md' onChange={(e) => { filterRes(e.target.value) }} name="" id="">
                            <option value="">Select a type</option>
                            {
                                types?.map((e) => {
                                    return (
                                        <>
                                            <option value={e.name}>{e.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className=''>
                        <input value={pokemon} onChange={(e) => { setPokemon(e.target.value) }} className='rounded-md p-1 mr-2 placeholder-pink-500' placeholder='Search...' type="text" name="" id="" />
                        <button onClick={search} className='shadow px-2 rounded-md bg-red-400'>Search</button>
                    </div>

                </div>

                <div className='w-full'>
                    {
                        loading ? (
                            <>
                                <Loader />
                            </>
                        ) : searchResult ? (
                            <div className='h-full w-full flex items-center justify-center'>
                                <Card data={searchResult} />
                            </div>
                        ) : result ? (
                            <>
                                <div className='w-full p-2'>
                                    <div className='flex gap-2 w-full flex-wrap justify-around items-center'>
                                        {
                                            result.map((e) => {
                                                return (
                                                    <>

                                                        <Info
                                                            url={e.pokemon.url}
                                                            page={currentPage}
                                                        />

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='w-full mt-7 flex items-center justify-center gap-5'>
                                        <button className='shadow-lg px-3 py-1 bg-slate-700 rounded-md text-yellow-100' onClick={goToPreviousPage}>Back</button>
                                        <p className='text-2xl'>{currentPage}</p>
                                        <button className='shadow-lg px-3 py-1 bg-slate-700 rounded-md text-yellow-100' onClick={goToNextPage}>Next</button>
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                </div>
            </main>
        </>
    )
}

{/* <h3 className="font-semibold mt-10">Look for your pokemon...</h3> */ }


const Loader = () => {
    return (
        <>
            <div className='flex items-center flex-col'>
                <p className='text-white'>Loading....</p>
                <div className="loader">
                </div>
            </div>
        </>
    )
}

const Card = ({ data }) => {

    return (
        <>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className='h-72 flex gap-1 flex-col'>
                            <img src={data.sprites.front_default} className='h-full w-full' alt="" />
                            <p className='capitalize'>{data.name}</p>
                        </div>
                    </div>
                    <div className="card-back">
                        <div className='w-full h-full'>
                            <h2 className='capitalize text-fuchsia-50 text-3xl'>{data.name}</h2>
                            <div className='text-base flex gap-2'>
                                {
                                    data.types.map((e) => {
                                        return (<>
                                            <p className='capitalize shadow px-1 py-0 bg-amber-800 rounded-xl'>
                                                {e.type.name}
                                            </p>
                                        </>)
                                    })
                                }</div>
                            <div className='flex flex-wrap items-center gap-2 mt-2'>
                                <p className='text-base'>Abilities :</p>
                                <div className='flex gap-2 flex-wrap'>
                                    {
                                        data.abilities.map((e) => {
                                            return (
                                                <p className='text-xs'>{e.ability.name},</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='text-left'>
                                <h2>Stats</h2>
                                {
                                    data.stats.map((e) => {
                                        return (
                                            <>
                                                <div className='flex gap-1 items-center'>
                                                    <h3 className='text-base capitalize'>{e.stat.name} :</h3>
                                                    <p className='text-base'>
                                                        {e.base_stat}
                                                    </p>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
