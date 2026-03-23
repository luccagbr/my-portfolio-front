import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        const fileLoaderRule = config.module.rules.find((rule: any) => {
            rule.test?.test?.(".svg");
        });

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
            },
        );

        fileLoaderRule.exclude = /\,svg$/i;

        return config;
    },
};

export default nextConfig;
