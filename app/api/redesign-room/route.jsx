import axios from 'axios';
import { db } from "@/config/db";  // Database configuration
import { storage } from "@/config/firebaseConfig";  // Firebase configuration
import { AiGeneratedImage } from "@/config/schema";  // Schema for the database
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// Function to generate AI image
async function generateAIImage(imageUrl, roomType, designType, additionalReq) {
    try {
        if (!imageUrl || !roomType || !designType || !additionalReq) {
            throw new Error("Missing required fields.");
        }

        const input = {
            image: imageUrl,
            prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}`
        };

        const response = await axios.post(
            "https://api.replicate.com/v1/predictions", 
            {
                version: "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", // Model version
                input: input,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`, // API Token for Replicate
                    'Content-Type': 'application/json',
                    'Prefer': 'wait',
                }
            }
        );

        if (!response.data || !response.data.output) {
            throw new Error("AI generation failed.");
        }

        return response.data;
    } catch (error) {
        console.error("Error during API call:", error.message);
        throw error;
    }
}

// Function to convert image URL to base64
async function ConvertImageToBase64(imageUrl) {
    const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64ImageRaw = Buffer.from(resp.data).toString('base64');
    return `data:image/png;base64,${base64ImageRaw}`;
}

// Function to upload image to Firebase and get the URL
async function uploadImageToFirebase(base64Image) {
    const fileName = `${Date.now()}.png`;
    const storageRef = ref(storage, `room-redesign/${fileName}`);
    await uploadString(storageRef, base64Image, 'data_url');
    return await getDownloadURL(storageRef);
}

// Function to save to the database
async function saveToDatabase(roomType, designType, imageUrl, aiImageUrl, userEmail) {
    return await db.insert(AiGeneratedImage).values({
        roomType: roomType,
        designType: designType,
        orgImage: imageUrl,
        aiImage: aiImageUrl,
        userEmail: userEmail
    }).returning({ id: AiGeneratedImage.id });
}

// Exported POST method for the API route
export async function POST(req) {
    try {
        const { imageUrl, roomType, designType, additionalReq, userEmail } = await req.json();

        if (!imageUrl || !roomType || !designType || !additionalReq || !userEmail) {
            return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });
        }

        // Generate AI Image
        const aiResponse = await generateAIImage(imageUrl, roomType, designType, additionalReq);

        // Convert the result to base64 and upload to Firebase
        const base64Image = await ConvertImageToBase64(aiResponse.output);
        const downloadUrl = await uploadImageToFirebase(base64Image);

        // Save to database
        const dbResult = await saveToDatabase(roomType, designType, imageUrl, downloadUrl, userEmail);

        // Return response with download URL
        return new Response(JSON.stringify({ result: downloadUrl }), { status: 200 });
    } catch (error) {
        console.error("Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
