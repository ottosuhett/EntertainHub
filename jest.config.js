const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom', 
  moduleNameMapper: {
    // Mock para arquivos CSS/SCSS
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Mapear os aliases definidos no tsconfig.json
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['/node_modules/'], 
};

module.exports = createJestConfig(customJestConfig);
