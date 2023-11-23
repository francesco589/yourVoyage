'use client'
import useFetchApi from '@/app/hooks/useFetchApi'
import React from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

function Voyage({ params }) {

  const [voyages, setVoyages, stages, setStages, cities, setCities] = useFetchApi()

  const filtered = voyages.filter(el => (el._id === params.id))

  return (
    <div className='p-5 bg-amber-50'>
     
        {filtered.map(ele => (
          <motion.article
            initial={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            animate={{ opacity: 1 }}
            className='flex flex-col gap-3 items-center'
            key={ele._id}
          >
            <h1 className='font-bold text-xl'>{ele.voyageName}</h1>
            <Image
              src={'/' + ele.img}
              height={500}
              width={500}
              alt={ele.voyageName}
            >

            </Image>
            <h2 className=' self-start font-semibold'>Tappe: </h2>
            <ol className=' list-decimal p-3 flex flex-col gap-3'>
              {stages.filter(stage => ele.stageIds[0].split(',').includes(stage._id)).map(element => (
                <li key={element._id}>
                  <h1 className='font-bold'>{element.stageName}</h1>
                  <p>{element.description}</p>
                   <p className='p-1 font-semibold'>{cities.filter(city => city._id === element.cityId).map(c =>(
                    <span key={c._id}>Città: {c.city} | {c.country}</span>
                  ))}</p>
                  </li>
              ))}
            </ol>
          </motion.article>
        ))}

    </div>
  )
}

export default Voyage