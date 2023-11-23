'use client'

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ctx from '@/app/data/ctx'


function EditVoyage({ params }) {

    const { voyages, setVoyages, stages, setStages, cities, setCities } = useContext(ctx)
    const { id } = params

    const reset = {
        voyageName: '',
        img: '',
        stageIds: []
    }


    const [input, setInput] = useState(reset)

    useEffect(() => {
        const currentVoyage = voyages.find(voyage => voyage._id === id)
        if (currentVoyage) {
            setInput({
                voyageName: currentVoyage.voyageName || '',
                img: currentVoyage.img || '',
                stageIds: currentVoyage.stageIds || []
            })
        }
    }, [id, voyages])



    const [checkedStages, setCheckedStages] = useState([]);

    const checkBox = (ev) => {
        const { value, checked } = ev.target;
        if (checked) {
            setCheckedStages((prev) => [...prev, value]);
        } else {
            setCheckedStages((prev) => prev.filter((id) => id !== value));
        }
    }



    const editVoyageHandler = async () => {
        if (input.voyageName !== '') {
            const form = new FormData()
            form.append('voyageName', input.voyageName)
            if (input.img) {
                form.append('img', input.img)
            }
            if (input.stageIds != undefined) {
                form.append('stageIds', input.stageIds)
            }
            const resp = await axios.patch('/api/voyages/'+ id, form)

            setVoyages(prev => prev.filter(el => el._id !== id))
            setInput({ type: 'reset' })
            setCheckedStages([])

            setTimeout(() => {
                location.replace('/dashboard')
            }, 1000);

        }
        else {
            console.log('not ok');
        }
    }

    const delStageHandler = async (id, nome) => {
        if (confirm(`are you sure to delete ${nome}?`)) {
            const resp = await axios.delete(`/api/stages/${id}`)
            setStages(prev => [...prev.filter(el => el._id !== resp.data.data._id)])
        }
    }




    return (
        <>



            <section>
                <div>

                    <h1 className={'bg-amber-200 p-4 rounded-md'} >Modifica il tuo itinerario</h1>
                </div>
                <div className='flex flex-col gap-2 bg-amber-200 p-2'>

                    <label htmlFor="voyageName">Nome: </label>
                    <input
                        className='border border-slate-500 rounded-xl p-1 bg-amber-100'
                        onChange={(e) => setInput({ type: 'input', e })}
                        name='voyageName'
                        id='voyageName'
                        type="text"
                        value={input.voyageName}
                    />
                    <span>Cover Image</span>
                    <input
                        className='border border-slate-500 rounded-xl p-1 bg-amber-100'
                        onChange={(e) => setInput({ type: 'image', e })}
                        type="file"
                    />
                    <div className='flex flex-col justify-center'>
                        {stages && stages.map(el => (
                            <div className='flex gap-3' key={el._id}>
                                <label>
                                    <input
                                        checked={checkedStages.includes(el._id)}
                                        onChange={(e) => setInput({ type: 'arr', e }, checkBox(e))}
                                        type='checkbox'
                                        key={el._id}
                                        value={el._id}
                                    /> <span>{el.stageName}</span>
                                </label><button onClick={() => delStageHandler(el._id, el.stageName)} className='bg-red-300 p-1 rounded-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button></div>
                        ))}
                    </div>
                    <button onClick={editVoyageHandler}>Modifica Itinerario</button>
                </div>
            </section>
        </>
    )
}

export default EditVoyage