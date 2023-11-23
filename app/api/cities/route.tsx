import { City } from "@/app/db/connection";
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";



export async function POST(req: NextRequest) {

const b = await req.formData()

            const city = new City({
                city: b.get('city'),
                country: b.get('country')
            })

            try {
                 const resp = await city.save()

                return NextResponse.json({success: true, message: 'ok', data: resp})
            }
            catch (err) {
                return NextResponse.json({ success: false, message: 'not ok' })
            }
    }

export async function GET(req: NextRequest,){
    const stages = await City.find()

    return NextResponse.json({success: true, data:stages})

}

