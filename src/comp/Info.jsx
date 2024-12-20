import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Info = ({ url, page }) => {

    const [data, setData] = useState(null)

    const getIfno = () => {

        axios.get(url)
            .then((response) => {
                setData(response.data);
                // console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getIfno();
        return (() => {
            setData(null)
        })
    }, [page])

    return (
        <>
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <div className='h-72 flex gap-1 flex-col'>
                            <img src={data?.sprites.front_default} className='h-full w-full' alt="" />
                            <p className='capitalize'>{data?.name}</p>
                        </div>
                    </div>
                    <div className="card-back">
                        <div className='w-full h-full'>
                            <h2 className='capitalize text-fuchsia-50 text-3xl'>{data?.name}</h2>
                            <div className='text-base flex gap-2'>
                                {
                                    data?.types.map((e) => {
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
                                        data?.abilities.map((e) => {
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
                                    data?.stats.map((e) => {
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

export default Info
