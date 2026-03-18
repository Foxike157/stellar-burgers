/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",

  // покрытие
  collectCoverage: true,
  collectCoverageFrom: [
    "src/services/**/*.ts",
    "src/services/**/*.tsx",
    "!src/services/slices/slices-test/**",
  ],
  coverageDirectory: "coverage",

  // ts-jest трансформация
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },

  // aliases
  moduleNameMapper: {
    "^@api$": "<rootDir>/src/utils/burger-api.ts",
    "^@utils-types$": "<rootDir>/src/utils/types.ts",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@ui(.*)$": "<rootDir>/src/components/ui$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1"
  },

  moduleFileExtensions: ["ts", "tsx", "js", "json"]
};
