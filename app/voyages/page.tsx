'use client'
import React from 'react'
import useFetchApi from '../hooks/useFetchApi'
import Card from '../components/Card'


function Voyages() {

  const [voyages, setVoyages, stages, setStages, cities, setCities] = useFetchApi()

  return (
    <main className='bg-amber-50 p-3'>
      
      <section className='flex flex-wrap gap-3 m-3 justify-center'>
        {voyages && voyages.map(voyage => (
          <Card key={voyage._id} voyage={voyage} stages={stages} />
        ))}
      </section>
      
    </main>
  )

}

export default Voyages