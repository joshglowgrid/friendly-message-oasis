
import { defineConfig } from "tinacms";

// This is only used for the local admin, the actual config is in config.js
export default defineConfig({
  contentApiUrlOverride: "/api/tina",
  admin: {
    path: "/admin",
  },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [],
  },
});
