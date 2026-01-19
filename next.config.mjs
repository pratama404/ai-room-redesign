/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'firebasestorage.googleapis.com'
            },
            {
                hostname: 'replicate.delivery'
            }
        ]
    }
};

export default nextConfig;
