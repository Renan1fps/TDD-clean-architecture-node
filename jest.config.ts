export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/.*ts'], // coletar cobertura de teste desses arquivos
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  transform: { '.+\\.ts$': 'ts-jest' },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8'
}
