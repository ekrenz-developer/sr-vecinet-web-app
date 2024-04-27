import { EnvironmentPlugin } from 'webpack';
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  output: {
    crossOriginLoading: 'anonymous',
  },
  plugins: [
    new EnvironmentPlugin([
      'VECINET_AUTH_SERVICE_BASE_URL',
      'VECINET_POST_SERVICE_BASE_URL',
    ]),
  ],
};
