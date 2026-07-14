import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    "intro",
    "organization",
    {
      type: "category",
      label: "Architecture",
      items: ["architecture/backend", "architecture/frontend"],
    },
    {
      type: "category",
      label: "Development",
      items: [
        "development/local-setup",
        "development/testing",
        "development/deployment",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: ["reference/api", "reference/git-workflow"],
    },
  ],
};

export default sidebars;
