const {
  getModuleBuildInfo,
} = require("next/dist/build/webpack/loaders/get-module-build-info");
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});
