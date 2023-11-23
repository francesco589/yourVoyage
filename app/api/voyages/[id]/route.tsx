import { Itinerary } from "@/app/db/connection";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function PATCH(req: NextRequest, p: any) {
    const par = p.params.id

    const b = await req.formData()

    const newItin = {
        voyageName: b.get('voyageName'),
        img: b.get('description'),
        stageIds: b.get('cityId')
    }
    
    const uresp = await Itinerary.findByIdAndUpdate(par, newItin, { new: true })
    return NextResponse.json({ success: true, data: uresp })
}


export async function DELETE(req: NextRequest, p: any) {

    const par = p.params.id
    const respon = await Itinerary.findByIdAndDelete(par)

    return NextResponse.json({ success: true, data: respon})

}
