module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    setupFilesAfterEnv: ['./test/setup.ts'],
}
