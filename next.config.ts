import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [['rehype-prism-plus', { showLineNumbers: true }] as any],
    },
});

const externals: string[] = ['next-mdx-remote-client'];
if (process.env.TURBOPACK) {
    externals.push('rehype-prism-plus');
}

const nextConfig: NextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    serverExternalPackages: externals,
};

export default withMDX(nextConfig);
