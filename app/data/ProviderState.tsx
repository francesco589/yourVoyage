'use client'
import useFetchApi from "../hooks/useFetchApi"
import ctx from "./ctx"




function ProviderState({children} : any){

const [voyages, setVoyages, stages, setStages, cities, setCities] = useFetchApi()

    return (
    <ctx.Provider value={{voyages, setVoyages, stages, setStages, cities, setCities}}>
        {children}
    </ctx.Provider>
    )
  }


export default ProviderState