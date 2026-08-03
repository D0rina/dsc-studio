import { Redis } from "@upstash/redis";

// Postavi ova dva u Vercel → Settings → Environment Variables
// (dobiješ ih kad napraviš besplatnu Upstash Redis bazu — vidi README).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const BOOKINGS_KEY = "nova-znanja:bookings";
