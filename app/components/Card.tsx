import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'


function Card(props) {
    
    const {voyage, stages} = props

  return (
    <motion.article 
          initial={{opacity:0, x:1000}}
          transition={{ duration: 1 }}
          animate={{ opacity: 1, x:0}}
      
          
        
          className='bg-amber-100 p-3 flex flex-col items-center' key={voyage._id}>
            <Link className='flex flex-col items-center' href={`/voyage/${voyage._id}`}>
            <h1 className='font-bold'>{voyage.voyageName}</h1>
              <Image
              className='w-auto'
                src={'/' + voyage.img}
                width={250}
                height={250}
                alt="Voyage Image"
              />
            </Link>
            <ol className='list-decimal '>
              {stages
                .filter(stage => voyage.stageIds[0].split(',').includes(stage._id))
                .map(element => (
                  <li key={element._id}>{element.stageName}</li>
                ))}
            </ol>
            {props.children}
          </motion.article>
  )
}

export default Card