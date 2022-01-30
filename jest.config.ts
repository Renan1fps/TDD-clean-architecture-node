export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/.*ts'], // coletar cobertura de teste desses arquivos
  coverageDirectory: 'coverage',
  transform: { '.+\\.ts$': 'ts-jest' },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8'
}
