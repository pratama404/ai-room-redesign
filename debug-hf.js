const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: '.env.local' });

const token = process.env.HUGGINGFACE_API_TOKEN;
console.log("Token:", token ? "YES (starts with " + token.substring(0, 3) + ")" : "NO");

async function testRaw() {
    try {
        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bedroom_Mitcham.jpg/640px-Bedroom_Mitcham.jpg";
        console.log("1. Fetching input image...");
        const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        console.log("2. Sending RAW request to HF API...");

        // Direct API Call
        const model = "runwayml/stable-diffusion-v1-5";
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            imageRes.data, // Binary body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/octet-stream",
                    "x-use-cache": "false"
                },
                responseType: 'arraybuffer' // We expect an image back
            }
        );

        console.log("Success! Status:", response.status);
        console.log("Output Size:", response.data.length);

    } catch (e) {
        console.error("❌ FAILED:");
        if (e.response) {
            console.error("Status:", e.response.status);
            // Try to parse the error message from the buffer
            try {
                const errText = Buffer.from(e.response.data).toString('utf8');
                console.error("Body:", errText);
            } catch (parseErr) {
                console.error("Could not parse error body.");
            }
        } else {
            console.error(e.message);
        }
    }
}

testRaw();
