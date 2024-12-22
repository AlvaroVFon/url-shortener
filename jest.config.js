// jest.config.js
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Usa babel-jest para archivos .ts y .tsx
  },
  setupFilesAfterEnv: ['<rootDir>/tests/config/jest.setup.ts'], // Ruta a tu archivo de configuración
};
