import React, { useState, Suspense, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    const [pokemon, setPokemon] = useState('')
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null)


    console.log(loading, "loading");

    const search = () => {

        if (pokemon === "") return null

        setLoading(true);

        try {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
                .then((response) => {
                    console.log(response);
                    setPokemon("");
                    setSearchResult(response.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
        }

    }

    console.log(pokemon);


    return (
        <>
            <main className='h-screen'>
                <nav className='w-full bg-amber-400 p-2 '>
                    <h1 className='font-bold text-xl'>PokeDEX</h1>
                </nav>

                <div className='p-2 bg-red-200 flex items-center justify-center gap-2 m-auto flex-wrap'>
                    <label className='mr-2' htmlFor="">Find Pokemon</label>
                    <input value={pokemon} onChange={(e) => { setPokemon(e.target.value) }} className='rounded-md p-1 mr-2 placeholder-pink-500' placeholder='Search...' type="text" name="" id="" />
                    <button onClick={search} className='shadow px-2 rounded-md bg-red-400'>Search</button>
                </div>

                <div className='w-full text-center h-full'>
                    {
                        loading ? (
                            <>
                                <div className='w-full h-full flex items-center justify-center '>
                                    <Loader />
                                </div>
                            </>
                        ) : searchResult ? (
                            <div className='h-full w-full flex items-center justify-center'>
                                <Card data={searchResult} />
                            </div>
                        ) : (
                            <h3 className="font-semibold mt-10">Look for your pokemon...</h3>
                        )
                    }
                </div>
            </main>
        </>
    )
}

const Loader = () => {
    return (
        <div className="loader"></div>
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
