import serverless from "serverless-http";
import app from "../src/app.js";

// Vercel expects a named export (handler)
export const handler = serverless(app);
