import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import axios from 'axios';
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

async function generateAIImage(imageUrl, roomType, designType, additionalReq, conditionScale) {
    try {
        if (!process.env.HUGGINGFACE_API_TOKEN) {
            throw new Error("Missing HUGGINGFACE_API_TOKEN in environment variables.");
        }

        // 1. Fetch the image as ArrayBuffer
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        // const imageBlob = new Blob([imageResponse.data]); // Blob can be flaky in some Node envs, passing buffer directly if supported

        const prompt = `Create a cinematic, photorealistic medium shot. The focus is a ${roomType} with ${designType} style interior. ${additionalReq || ''}. The lighting is soft, golden hour sunlight. Natural film grain, warm color palette, sharp focus.`;

        // Calculate strength (Denoising Strength for Img2Img)
        const strength = 1.0 - (conditionScale || 0.5);
        const clampedStrength = Math.max(0.1, Math.min(0.9, strength));

        console.log("Sending to Hugging Face (SD v1.5)...");

        // Use SD v1.5 as it's lighter and more reliable on free tier than SDXL
        const resultBlob = await hf.imageToImage({
            model: 'runwayml/stable-diffusion-v1-5',
            inputs: imageResponse.data, // Passing ArrayBuffer directly
            parameters: {
                prompt: prompt,
                negative_prompt: "blurry, low quality, distorted, ugly, bad anatomy",
                strength: clampedStrength,
            }
        });

        // Convert the resulting Blob to a Base64 string
        const buffer = Buffer.from(await resultBlob.arrayBuffer());
        const base64String = "data:image/png;base64," + buffer.toString('base64');

        return { output: base64String };

    } catch (error) {
        console.error("Error generating AI image (HF):", error);
        throw error;
    }
}

export async function POST(req) {
    try {
        const { imageUrl, roomType, designType, additionalReq, userEmail, condition_scale } = await req.json();

        if (!imageUrl || !roomType || !designType || !userEmail) {
            return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });
        }

        const aiResponse = await generateAIImage(imageUrl, roomType, designType, additionalReq, condition_scale);

        // Ensure we got a valid output
        if (!aiResponse.output) {
            throw new Error("No output received from AI model.");
        }

        // HF returns base64 directly, so we use it as is.
        const base64Image = aiResponse.output;

        const downloadUrl = await uploadImageToFirebase(base64Image);
        const dbResult = await saveToDatabase(roomType, designType, imageUrl, downloadUrl, userEmail);

        return new Response(JSON.stringify({ result: downloadUrl }), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        const status = error.status || 500;
        return new Response(JSON.stringify({ error: error.message || error.toString() }), { status: status });
    }
}

async function uploadImageToFirebase(base64Image) {
    const fileName = Date.now() + '.png';
    const storageRef = ref(storage, 'room-redesign/' + fileName);

    await uploadString(storageRef, base64Image, 'data_url');
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
}

async function saveToDatabase(roomType, designType, orgImage, aiImage, userEmail) {
    const result = await db.insert(AiGeneratedImage).values({
        roomType: roomType,
        designType: designType,
        orgImage: orgImage,
        aiImage: aiImage,
        userEmail: userEmail
    }).returning({ id: AiGeneratedImage.id });

    return result;
}
