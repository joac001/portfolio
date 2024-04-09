/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    images: {
        loader: 'akamai',
        path: '',
    },
    assetPrefix: './portfolio',
};

export default nextConfig;