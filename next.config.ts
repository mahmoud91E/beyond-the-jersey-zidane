import type { NextConfig } from 'next';
const config: NextConfig = {
  devIndicators: false,
  // Keep production build artifacts separate from a running development preview.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};
export default config;
