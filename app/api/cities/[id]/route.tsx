import { City } from "@/app/db/connection";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



export async function PATCH(req: NextRequest, p: any) {
    const par = p.params.id
    const b = await req.formData()
    const newCity = {
        city: b.get('city'),
        country: b.get('country')
    }

    
    const uresp = await City.findByIdAndUpdate(par, newCity, { new: true })
    return NextResponse.json({ success: true, data: uresp })
}


export async function DELETE(req: NextRequest, p: any) {

    const par = p.params.id
    const respon = await City.findByIdAndDelete(par)

    return NextResponse.json({ success: true, data: respon})

}
