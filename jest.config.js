const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/app/server.ts",
    "!<rootDir>/src/config/*.ts",
    "!<rootDir>/src/interfaces/*.ts",
    "!<rootDir>/src/utils/logger.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  moduleNameMapper: pathsToModuleNameMapper({
    "@app/*": ["app/*"],
    "@config/*": ["config/*"],
    "@controllers/*": ["controllers/*"],
    "@errors/*": ["errors/*"],
    "@interfaces/*": ["interfaces/*"],
    "@middlewares/*": ["middlewares/*"],
    "@providers/*": ["providers/*"],
    "@routes/*": ["routes/*"],
    "@services/*": ["services/*"],
    "@utils/*": ["utils/*"],
  }, {
    prefix: '<rootDir>/src/',
  })
};
