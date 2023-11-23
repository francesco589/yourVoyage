import React from 'react'

function EditStage() {


    const addStageHandler = async () => {
        if (input.stageName !== '' && input.description !== '' && input.cityId !== '') {
            const form = new FormData()
            form.append('stageName', input.stageName)
            form.append('description', input.description)
            form.append('cityId', input.cityId)
            const resp = await axios.post('/api/stages', form)
            setStages(prev => [...prev, resp.data.data])
            setInput({ type: 'reset' })
            console.log(resp);
        }
        else {
            console.log('not ok');
        }
    }

  return (
    <div>

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

    </div>
  )
}

export default EditStage