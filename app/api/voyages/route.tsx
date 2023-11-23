import { Itinerary } from "@/app/db/connection";
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";




export async function POST(req: NextRequest) {

const b = await req.formData()


            const itin = new Itinerary({
                voyageName: b.get('voyageName'),
                img: b.get('img').name,
                stageIds: b.get('stageIds')
            })
        
            try {
                 const resp = await itin.save();
                
                return NextResponse.json({success: true, message: 'ok', data: resp})
            }
            catch (err) {
                return NextResponse.json({ success: false, message: 'not ok', err })
            }
    }

export async function GET(req: NextRequest,){
    const itin = await Itinerary.find()

    return NextResponse.json({success: true, data: itin})

}