import type { NextConfig } from 'next';

const externals: string[] = ['next-mdx-remote-client'];
if (process.env.TURBOPACK) {
    externals.push('rehype-prism-plus');
}

const nextConfig: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: externals,
    transpilePackages: ['@uiw/react-md-editor'],
    webpack: (config, { isServer }) => {
        // 忽略 @standard-community/standard-json 的可选依赖警告
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            {
                module: /node_modules\/@standard-community\/standard-json/,
                message: /Can't resolve 'sury'/,
            },
            {
                module: /node_modules\/@standard-community\/standard-json/,
                message: /Can't resolve '@valibot\/to-json-schema'/,
            },
        ];
        return config;
    },
};

export default nextConfig;
