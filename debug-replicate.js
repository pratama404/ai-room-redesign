const Replicate = require("replicate");
const dotenv = require("dotenv");
dotenv.config({ path: '.env.local' });

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

async function testReplicate() {
    console.log("Testing Replicate API connection...");
    console.log("Token exists:", !!process.env.REPLICATE_API_TOKEN);

    // Using a reliable public image for testing
    const testImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bedroom_Mitcham.jpg/640px-Bedroom_Mitcham.jpg";

    // Test parameters WITHOUT aspect_ratio
    const input = {
        prompt: "A modern minimalist bedroom redesign",
        image: testImage,
        promax_strength: 0.5,
        depth_strength: 0.5
    };

    console.log("Input params:", JSON.stringify(input, null, 2));

    try {
        console.log("Sending request to rocketdigitalai/interior-design-sdxl-lightning...");
        const output = await replicate.run("rocketdigitalai/interior-design-sdxl-lightning", { input });
        console.log("Success! Output:", output);
    } catch (error) {
        console.error("❌ Replicate Error:");
        console.error(error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

testReplicate();
