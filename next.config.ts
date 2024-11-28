import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
      SQLSERVER_USER: process.env.SQLSERVER_USER,
      SQLSERVER_PASSWORD: process.env.SQLSERVER_PASSWORD,
      SQLSERVER_HOST: process.env.SQLSERVER_HOST,
      SQLSERVER_DATABASE: process.env.SQLSERVER_DATABASE,
      SQLSERVER_ENCRYPT: process.env.SQLSERVER_ENCRYPT,
      SQLSERVER_TRUST_SERVER_CERTIFICATE: process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE,
      DATABASE_URL: process.env.DATABASE_URL,
  }
};

export default nextConfig;
