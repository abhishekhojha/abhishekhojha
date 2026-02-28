/// <reference types="astro/client" />

interface Env {
  MONGODB_URI: string;
  API_SECRET: string;
  RESEND_API_KEY: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
