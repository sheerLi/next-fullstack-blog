import type { NextConfig } from 'next';

const externals: string[] = ['next-mdx-remote-client'];
if (process.env.TURBOPACK) {
    externals.push('rehype-prism-plus');
}

const nextConfig: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: externals,
    transpilePackages: ['@uiw/react-md-editor'],
};

export default nextConfig;
