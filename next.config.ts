import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/hidden-mount-airy";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath: githubPagesBasePath,
      assetPrefix: githubPagesBasePath,
      trailingSlash: true,
      images: {
        unoptimized: true,
      },
      typescript: {
        tsconfigPath: "tsconfig.github-pages.json",
      },
    }
  : {};

export default nextConfig;
