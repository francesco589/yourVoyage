import { Stage } from "@/app/db/connection";
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";



export async function POST(req: NextRequest) {

const b = await req.formData()

            const stage = new Stage({
                stageName: b.get('stageName'),
                description: b.get('description'),
                cityId: b.get('cityId')
            })

            try {
                 const resp = await stage.save()

                return NextResponse.json({success: true, message: 'ok', data: resp})
            }
            catch (err) {
                return NextResponse.json({ success: false, message: 'not ok', err })
            }
    }

export async function GET(req: NextRequest,){
    const stages = await Stage.find()

    return NextResponse.json({success: true, data:stages})

}

