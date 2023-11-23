'use client'

import React, { useContext, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import ctx from '../data/ctx'



function Add(props) {

    const { voyages, setVoyages, stages, setStages, cities, setCities } = useContext(ctx)

    const [input, setInput] = useReducer((state, action) => {
        switch (action.type) {
            case 'input':
                return {
                    ...state,
                    [action.e.target.name]: action.e.target.value
                }
            case 'image':
                return {
                    ...state,
                    img: action.e.target.files[0]
                }
            case 'arr':
                return {
                    ...state,
                    stageIds: [...state.stageIds, action.e.target.value]
                }
            case 'reset':
                return {
                    stageName: '',
                    description: '',
                    cityId: '',
                    voyageName: '',
                    img: '',
                    stageIds: []
                }
        }
    }, {
        stageName: '',
        description: '',
        cityId: '',
        voyageName: '',
        img: '',
        stageIds: []
    })

    const [animation, setAnimation] = useState(false)

    const refFile = useRef(null)

    const [checkedStages, setCheckedStages] = useState([]);

    const checkReset = (ev) => {
        const { value, checked } = ev.target;
        if (checked) {
            setCheckedStages((prev) => [...prev, value]);
        } else {
            setCheckedStages((prev) => prev.filter((id) => id !== value));
        }
    }


    const addStageHandler = async () => {
        if (input.stageName !== '' && input.description !== '' && input.cityId !== '') {
            const form = new FormData()
            form.append('stageName', input.stageName)
            form.append('description', input.description)
            form.append('cityId', input.cityId)
            const resp = await axios.post('/api/stages', form)
            setStages(prev => [...prev, resp.data.data]),
            setInput({ type: 'reset' })

        }
        else {
            console.log('not ok');
        }
    }

    const addVoyageHandler = async () => {
        if (input.voyageName !== '' && input.img && input.stageIds.length !== 0) {
            const form = new FormData()
            form.append('voyageName', input.voyageName)
            form.append('img', input.img)
            form.append('stageIds', input.stageIds)
            const resp = await axios.post('/api/voyages', form)
                setVoyages(prev => [...prev, resp.data.data])
                setInput({ type: 'reset' })
                setCheckedStages([])
            
            
           

            console.log(resp.data.data);



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

            <section className={animation ? 'hidden' : ''}>
                <div>
                    <button className={'bg-amber-200 p-4 rounded-md'} onClick={() => setAnimation(prev => !prev)}>Definisci le tue tappe</button>
                    <button className={'bg-amber-100 p-4 rounded-md'} onClick={() => setAnimation(prev => !prev)}>crea il tuo itinerario</button>
                </div>
                <motion.div
                    className='flex flex-col gap-2 bg-amber-200 p-2'
                    initial={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    animate={animation ? { y: -500, opacity: 0 } : { x: 0, opacity: 1 }}
                >

                    <label htmlFor="stageName">Nome tappa: </label>
                    <input className='border border-slate-500 rounded-xl p-1 bg-amber-100' onChange={(e) => setInput({ type: 'input', e })} id='stageName' type="text" name='stageName' value={input.stageName} />
                    <label htmlFor="description" >descrivi la tappa</label>
                    <textarea className='border border-slate-500 rounded-xl p-1 bg-amber-100' onChange={(e) => setInput({ type: 'input', e })} name='description' id='description' value={input.description} />
                    <label htmlFor="city">Città: </label>
                    <select className='border border-slate-500 rounded-xl p-1 bg-amber-100' name="cityId" id="city" onChange={(e) => setInput({ type: 'input', e })}>
                        {cities.map(el => (
                            <option key={el._id} value={el._id}>{el.city}/{el.country}</option>
                        ))}
                    </select>
                    <button className='' onClick={addStageHandler}>Aggiungi Tappa</button>
                </motion.div>
            </section>

            <section className={!animation ? 'hidden' : ''}>
                <div>
                    <button className={'bg-amber-100 p-4 rounded-md'} onClick={() => setAnimation(prev => !prev)}>Definisci le tue tappe</button>
                    <button className={'bg-amber-200 p-4 rounded-md'} onClick={() => setAnimation(prev => !prev)}>crea il tuo itinerario</button>
                </div>
                <motion.div
                    className='flex flex-col gap-2 bg-amber-200 p-2'
                    initial={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    animate={animation ? { y: 0, opacity: 1 } : { y: -1000, opacity: 0 }}
                >

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
                        ref={refFile}
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
                                        onChange={(e) => setInput({ type: 'arr', e }, checkReset(e))}
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
                    <button onClick={addVoyageHandler}>Aggiungi Itinerario</button>
                </motion.div>
            </section>
        </>
    )
}

export default Add