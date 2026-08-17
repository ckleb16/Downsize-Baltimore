import { access, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

export function sites(projectRoot: string): Plugin {
  return {
    name: "sites",
    apply: "build",
    async closeBundle() {
      const publicAssets = resolve(projectRoot, "dist", "public");
      const clientAssets = resolve(projectRoot, "dist", "client");
      const outputDirectory = resolve(projectRoot, "dist", ".openai");
      const hostingConfig = resolve(projectRoot, ".openai", "hosting.json");

      // Sites exposes the Cloudflare ASSETS binding from dist/client. Keep the
      // existing dist/public output for the local Express preview as well.
      await rm(clientAssets, { recursive: true, force: true });
      if (await exists(publicAssets)) {
        await cp(publicAssets, clientAssets, { recursive: true });
      }

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });

      if (await exists(hostingConfig)) {
        await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      }
    },
  };
}
