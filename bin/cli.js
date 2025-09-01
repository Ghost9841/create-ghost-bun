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

console.log("🚀 All done! Get started with:");
console.log(`cd ${repoName} && bun run dev`);
