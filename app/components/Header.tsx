"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion';

function Header() {

    const [menu, setMenu] = useState(false)

    return (
        <header className=' sticky top-0 left-0 w-screen h-24 bg-amber-600 '>
            <div className='flex justify-between items-center'>
               
                    <h1 className=' font-bold text-3xl text-amber-200 p-4'>Your Voyage</h1>
                <nav className='hidden p-2 md:flex text-amber-200 font-bold'>

                    <ul className='flex gap-2'>
                        <li>
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/voyages"}>All Itineraries</Link>
                        </li>
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </ul>
                </nav>
                
                    <motion.div
                        initial={{ x: 0, y: 50, opacity: 1 }}
                        transition={{ duration: 1 }}
                        animate={menu ? { opacity: 0 } : { opacity: 1 }}
                        className={'md:hidden w-36 p-4 bg-amber-700 text-amber-200 font-bold text-center rounded-md'}

                    >

                        <ul >
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link href={"/voyages"}>All Itineraries</Link>
                            </li>
                            <Link href={"/dashboard"}>Dashboard</Link>
                        </ul>
                    </motion.div>
                    <motion.button 
                    animate={menu ? {} : {rotate:360, color:'red'}}
                    transition={{duration:1}}
                    className='p-4 md:hidden' 
                    onClick={() => setMenu(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </motion.button>
               
            </div>
        </header>
    )
}

export default Header