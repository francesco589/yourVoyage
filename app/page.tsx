'use client'
import Card from './components/Card'
import useFetchApi from './hooks/useFetchApi'
import Image from 'next/image'

export default function Home() {

  const [voyages, setVoyages, stages, setStages, cities, setCities] = useFetchApi()


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
