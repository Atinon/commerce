import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",

    "^#config$": "<rootDir>/src/config/index.ts",
    "^#controllers$": "<rootDir>/src/controllers/index.ts",
    "^#middlewares$": "<rootDir>/src/middlewares/index.ts",
    "^#routes$": "<rootDir>/src/routes/index.ts",
    "^#services$": "<rootDir>/src/services/index.ts",

    "^#errors/(.*)\\.js$": "<rootDir>/src/errors/$1",
    "^#schemas/(.*)\\.js$": "<rootDir>/src/schemas/$1",
    "^#utils/(.*)\\.js$": "<rootDir>/src/utils/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  clearMocks: true,

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
};

export default config;
