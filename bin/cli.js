#!/usr/bin/env node
import { execSync } from "child_process";
import process from "process";

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Failed to execute "${command}"`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
if (!repoName) {
  console.error("❌ Please provide a project name. Example: npx @technest/create-ghost-bun my-app");
  process.exit(1);
}

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Ghost9841/create-ghost-bun ${repoName}`;
const installDepsCommand = `cd ${repoName} && bun install`;

console.log(`📂 Cloning the repo into "${repoName}"...`);
if (!runCommand(gitCheckoutCommand)) process.exit(-1);

console.log(`📦 Installing dependencies in "${repoName}"...`);
if (!runCommand(installDepsCommand)) process.exit(-1);

console.log(" All done! Here's how to get started:\n");

console.log("📂 Frontend:");
console.log(`  cd ${repoName}/packages/client && bun run dev`);
console.log("  (This will start the frontend)\n");

console.log("📂 Backend:");
console.log(`  cd ${repoName}/packages/server && bun run dev`);
console.log("  (This will start the backend)\n");

console.log("🌐 Both together:");
console.log(`  cd ${repoName} && bun run dev`);
console.log("  (This will start both frontend and backend at once)\n");

console.log("🚀 Enjoy your development!");
