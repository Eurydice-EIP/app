import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
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
        resourceQuery: /url/,
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

export default withNextIntl(nextConfig);
