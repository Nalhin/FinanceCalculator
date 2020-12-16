module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },

  reporters: ['default', 'jest-sonar'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFilesAfterEnv: ['./test/setup.ts'],
};
