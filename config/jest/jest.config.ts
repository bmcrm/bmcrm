import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  rootDir: '../../',
  testMatch: [
    '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],
  modulePaths: [
    '<rootDir>src',
  ],
  setupFilesAfterEnv: [
    '<rootDir>config/jest/setupTests.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^entities/(.*)$': '<rootDir>src/entities/$1',
    '^features/(.*)$': '<rootDir>src/features/$1',
    '^pages/(.*)$': '<rootDir>src/pages/$1',
    '^shared/(.*)$': '<rootDir>src/shared/$1',
    '^widgets/(.*)$': '<rootDir>src/widgets/$1',
    '^app/(.*)$': '<rootDir>src/app/$1',
  },
};

export default config;
