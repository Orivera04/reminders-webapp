
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helper/getEnviroments.js', () => ({
  getEnvironments: () => ({ ...process.env })
}));
