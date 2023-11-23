import mongoose from "mongoose";

const psw = 's40T3bCetfpJ6O0A'
const database = 'yourVoyages'
const url = `mongodb+srv://fra89:${psw}@cluster0.6ctbtkw.mongodb.net/${database}`

//connessione a a Atlas
mongoose.connect(url)
    .then(() => {
        console.log(`db ${database} connected`)
    })
    .catch(err => console.log(err))

//creazione degli Schemas
const itinerarySchema = new mongoose.Schema({
    voyageName: { type: String, required: true },
    img: {type: String, required: true},
    stageIds:{type: Array, required:true}
})

const stageSchema = new mongoose.Schema({
    stageName: { type: String, required: true },
    description: { type: String, required: true },
    cityId: { type: String, required: true },
})

const citySchema = new mongoose.Schema({
    city: {type: String, required: true},
    country: { type: String, required: true}
})


//grazie a || evito che next mi ricrea il modello ogni volta.
const Itinerary = mongoose.models['itinerary'] || mongoose.model('itinerary', itinerarySchema, 'itineraries')
const Stage = mongoose.models['stage'] || mongoose.model('stage', stageSchema , 'stages')
const City = mongoose.models['city'] || mongoose.model('city', citySchema, 'cities')

export {Itinerary, Stage, City}
