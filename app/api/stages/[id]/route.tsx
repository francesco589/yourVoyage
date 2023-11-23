import { Stage } from "@/app/db/connection";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function PATCH(req: NextRequest, p: any) {
    const par = p.params.id
    const b = await req.formData()
    const newSta = {
        stageName: b.get('stageName'),
        description: b.get('description'),
        cityId: b.get('cityId')
    }
    
    const uresp = await Stage.findByIdAndUpdate(par, newSta, { new: true })
    return NextResponse.json({ success: true, data: uresp })
}


export async function DELETE(req: NextRequest, p: any) {

    const par = p.params.id
    const respon = await Stage.findByIdAndDelete(par)

    return NextResponse.json({ success: true, data: respon})

}
