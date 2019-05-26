// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   verbose: true,
// };

module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    testMatch: [
        '**/tests/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node',
    preset: 'ts-jest',
    verbose: true,
};