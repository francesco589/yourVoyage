'use client'
import ctx from "@/app/data/ctx"
import axios from "axios"
import { useContext, useEffect, useState } from "react"






function EditStage({ params }) {

    

    const { voyages, setVoyages, stages, setStages, cities, setCities } = useContext(ctx)

    const { id } = params



    const reset = {
        voyageName: '',
        img: '',
        stageIds: []
    }


    const [input, setInput] = useState(reset)

    useEffect(() => {
        const currentStage = stages.find(stage => stage._id === id)
        if (currentStage) {
            setInput({
                stageName: currentStage.stageName || '',
                description: currentStage.description || '',
                cityId: currentStage.cityId || []
            })
        }
    }, [id, stages])


    const addStageHandler = async () => {

        if (input.stageName !== '' && input.description !== '' && input.cityId !== '') {
            const form = new FormData()
            form.append('stageName', input.stageName)
            form.append('description', input.description)
            form.append('cityId', input.cityId)
            const resp = await axios.patch('/api/stages/' + id, form)
            setStages(prev => prev.filter(el => el._id !== id))
            setInput({ type: 'reset' })

            setTimeout(() => {
                location.replace('/dashboard')
            }, 1000);

        }
        else {
            console.log('not ok');
        }
    }

    const changehHandler = (ev) => {
        setInput(pre => ({ ...pre, [ev.target.name]: ev.target.value }))
    }

    return (
        <div>

            <section>

                <h1 className={'bg-amber-200 p-4 rounded-md'}>Modifica la tue tappa</h1>

                <div className='flex flex-col gap-2 bg-amber-200 p-2'>
                    <label htmlFor="stageName">Nome tappa: </label>
                    <input className='border border-slate-500 rounded-xl p-1 bg-amber-100' onChange={(e) => changehHandler(e)} id='stageName' type="text" name='stageName' value={input.stageName} />
                    <label htmlFor="description" >descrivi la tappa</label>
                    <textarea className='border border-slate-500 rounded-xl p-1 bg-amber-100' onChange={(e) => changehHandler(e)} name='description' id='description' value={input.description} />
                    <label htmlFor="city">Città: </label>
                    <select className='border border-slate-500 rounded-xl p-1 bg-amber-100' name="cityId" id="city" onChange={(e) => changehHandler(e)}>
                        {cities.map(el => (
                            <option key={el._id} value={el._id}>{el.city}/{el.country}</option>
                        ))}
                    </select>
                    <button className='' onClick={addStageHandler}>Modifica Tappa</button>
                </div>
            </section>

        </div>
    )
}

export default EditStage