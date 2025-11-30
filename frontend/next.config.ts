// ...existing code...
import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config: Configuration) {
    // ensure a concrete module object exists and use a local ref so TS won't complain
    const moduleRef =
      (config as any).module ?? ((config as any).module = { rules: [] });
    const moduleRules = (moduleRef as any).rules ?? [];

    const fileLoaderRule = moduleRules.find((rule: any) =>
      rule.test?.test?.(".svg")
    ) as any;

    if (!fileLoaderRule) {
      return config;
    }

    moduleRef.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/],
        },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
// ...existing code...
