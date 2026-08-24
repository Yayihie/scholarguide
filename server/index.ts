// server/index.ts — Express app entry point
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, try again in 15 minutes" },
});

// Routes
import { registerAuthRoutes } from "./routes.js";
import { registerAccountRoutes } from "./accountRoutes.js";
import { registerBillingRoutes } from "./billing.js";
import { registerIntegrationRoutes } from "./integrationRoutes.js";

app.use("/api/auth", authLimiter, registerAuthRoutes());
app.use("/api/account", registerAccountRoutes());
app.use("/api/billing", registerBillingRoutes());
app.use("/api", registerIntegrationRoutes());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(clientDist, "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`ScholarGuide server running on port ${port}`);
});

export { app };
