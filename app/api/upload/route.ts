import type { NextApiRequest} from 'next';
import { NextResponse } from 'next/server';
import fs from 'fs'



export async function POST(req: NextApiRequest) {
  const form = await req.formData()
  

   const fileData = form.get('img')
   const filePath = `./public/uploadedFiles/${fileData.name}`;

   const fileBuffer = Buffer.from(fileData);
   
   fs.writeFile(filePath, fileData, 'base64', (err) => {console.log('ok')})

return NextResponse.json({ success: true })
}