// vite.config.js
import * as path from "path";

export default {
  // config options


  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  server: {
    port: 8888,
  },
};

