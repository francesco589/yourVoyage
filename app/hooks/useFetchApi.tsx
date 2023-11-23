import axios from "axios";
import { useEffect, useState } from "react";
import { voyageType } from "../types.ts/types";


function useFetchApi(){
const [voyages, setVoyages] = useState([])
const [stages, setStages] = useState([])
const [cities, setCities] = useState([])

useEffect(()=>{
    const fetchFn = async () =>{
        const itin = await axios.get('/api/voyages')
        const stgs = await axios.get('/api/stages')
        const cts = await axios.get('/api/cities')
        setVoyages(itin.data.data)
        setStages(stgs.data.data)
        setCities(cts.data.data)
    }

    fetchFn()

},[])

return [voyages, setVoyages, stages, setStages, cities, setCities]

}

export default useFetchApi