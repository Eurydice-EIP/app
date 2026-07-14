import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Eurydice Docs",
  tagline: "Frontend and backend architecture for the current Eurydice stack.",
  favicon: "img/eurydice.png",
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",
  organizationName: "facebook",
  projectName: "docusaurus",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          exclude: [
            "**/Code Maintenance/**",
            "**/FrontEnd/**",
            "**/Git Usage/**",
            "**/Technical Documentation/**",
          ],
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Eurydice Docs",
      logo: {
        alt: "Eurydice logo",
        src: "img/eurydice.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Overview",
          items: [
            {
              label: "Start here",
              to: "/docs/intro",
            },
            {
              label: "Frontend architecture",
              to: "/docs/architecture/frontend",
            },
          ],
        },
        {
          title: "Development",
          items: [
            {
              label: "Local setup",
              to: "/docs/development/local-setup",
            },
            {
              label: "Testing",
              to: "/docs/development/testing",
            },
            {
              label: "Deployment",
              to: "/docs/development/deployment",
            },
          ],
        },
        {
          title: "Reference",
          items: [
            {
              label: "API",
              to: "/docs/reference/api",
            },
            {
              label: "Git workflow",
              to: "/docs/reference/git-workflow",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Eurydice. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
