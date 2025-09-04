import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.freshoz.app',
  appName: 'Freshoz',
  webDir: 'out', // ✅ YES, 'out' ही रहने दें
  bundledWebRuntime: false,
  server: {
  androidScheme: 'https',
  url: 'http://localhost:3000', // ये add करें
  cleartext: true // ये add करें
}

};

export default config;