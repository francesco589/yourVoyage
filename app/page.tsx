'use client'
import React, { useContext } from 'react'
import Card from './components/Card'
import ctx from './data/ctx'

export default function Home() {

  const { voyages, setVoyages, stages, setStages, cities, setCities } = useContext(ctx)


  return (
    <main className=' bg-amber-50 p-3'>
      <section className='flex flex-wrap gap-3 m-3 justify-center'>
        {voyages && voyages.slice(0, 5).map(voyage => (
          <Card key={voyage._id} voyage={voyage} stages={stages}/>
        ))}
      </section>
    </main>
  )
}
