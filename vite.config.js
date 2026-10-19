//import { defineConfig } from "vite";

//export default defineConfig({
//  base: "/",
//});

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        details: resolve(__dirname, "details.html"),
        favorite: resolve(__dirname, "favorite.html"),
      },
    },
  },
});

