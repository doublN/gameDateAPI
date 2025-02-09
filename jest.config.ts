import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFilesAfterEnv: ["jest-extended/all"],
  preset: "ts-jest/presets/default-esm",
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
