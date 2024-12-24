import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import { use } from "react";
import Replicate from "replicate";
import {useUser} from "@clerk/nextjs";

const replicate = new Replicate({
    auth:process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});
export async function POST(req) {
    //const {user}=useUser();
    const {imageUrl,roomType,designType,additionalReq,userEmail}=await req.json();

    //convert image to ai
    try{
        const input = {
            image: imageUrl,
            prompt: 'A '+ roomType+' with a '+designType+" style interior "+additionalReq
        };
        const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
        console.log(output)
        //return NextResponse.json({result:output})

        //const output="https://replicate.delivery/xezq/Aw3coWRAQp6uEpEmSZFE6RwFdFdr4alHG1ZnhNBPQFogcQfJA/out.png";
        //convert output url to base64 iamge
        const base64Image=await ConvertImageToBase64(output);
        //save base 64 to firebase 
        const fileName=Date.now()+'.png';
        const storageRef=ref(storage,'room-redesign/'+fileName);
        await uploadString(storageRef,base64Image,'data_url');
        const downloadUrl=await getDownloadURL(storageRef);
        console.log(downloadUrl);
    
        //save all to database
        const dbResult=await db.insert(AiGeneratedImage).values({
            roomType:roomType,
            designType:designType,
            orgImage:imageUrl,
            aiImage:downloadUrl,
            userEmail:userEmail
        }).returning({id:AiGeneratedImage.id});

        console.log(dbResult);
        return NextResponse.json({'result':downloadUrl});
    }catch(e){
        return NextResponse.json({error:e});   
    }
}

async function ConvertImageToBase64(imageUrl) {
    const resp=await axios.get(imageUrl,{responseType:'arraybuffer'});
    const base64ImageRaw=Buffer.from(resp.data).toString('base64');

    return "data:image/png;base64,"+base64ImageRaw;
}





// import { db } from "@/config/db";
// import { storage } from "@/config/firebaseConfig";
// import { AiGeneratedImage } from "@/config/schema";
// import axios from "axios";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { NextResponse } from "next/server";
// import Replicate from "replicate";
// import { getAuth } from "@clerk/nextjs/server"; // Server-side auth function

// const replicate = new Replicate({
//     auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
// });

// export async function POST(req) {
//     try {
//         // Fetch user info from Clerk's server-side auth
//         const { userId } = getAuth(req);

//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         // Parse JSON request body
//         const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

//         // Validate input
//         if (!imageUrl || !roomType || !designType || !userEmail) {
//             return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//         }

//         console.log("Starting image processing...");
//         console.log("Image URL:", imageUrl);
//         console.log("Room Type:", roomType);
//         console.log("Design Type:", designType);
//         console.log("Additional Requirements:", additionalReq);
//         console.log("User Email:", userEmail);

//         // Convert original image URL to base64
//         const base64Image = await ConvertImageToBase64(imageUrl);

//         // Generate AI-designed image using Replicate
//         const input = {
//             image: base64Image,
//             prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}`,
//         };
//         const output = await replicate.run(
//             "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
//             { input }
//         );

//         console.log("AI Output URL:", output);

//         // Convert AI-generated image URL to base64
//         const base64Output = await ConvertImageToBase64(output);

//         // Upload AI-generated image to Firebase
//         const fileName = `${Date.now()}.png`;
//         const storageRef = ref(storage, `room-redesign/${fileName}`);
//         await uploadString(storageRef, base64Output, "data_url");
//         const downloadUrl = await getDownloadURL(storageRef);

//         console.log("Firebase Image URL:", downloadUrl);

//         // Save record to the database
//         const dbResult = await db.insert(AiGeneratedImage).values({
//             roomType,
//             designType,
//             orgImage: imageUrl,
//             aiImage: downloadUrl,
//             userEmail,
//         }).returning({ id: AiGeneratedImage.id });

//         console.log("Database Result:", dbResult);

//         // Return the AI-generated image URL
//         return NextResponse.json({ result: downloadUrl });
//     } catch (e) {
//         console.error("Error in POST handler:", e);
//         return NextResponse.json({ error: e.message }, { status: 500 });
//     }
// }

// // Helper function to convert an image URL to base64 format
// async function ConvertImageToBase64(imageUrl) {
//     try {
//         const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
//         const base64ImageRaw = Buffer.from(resp.data).toString("base64");
//         return `data:image/png;base64,${base64ImageRaw}`;
//     } catch (err) {
//         throw new Error(`Failed to convert image to Base64: ${err.message}`);
//     }
// }
