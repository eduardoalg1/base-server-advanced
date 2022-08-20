export default {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  roots: ['<rootDir>/src'],

  testMatch: ['**/**spec.[tj]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
