// server/accountRoutes.ts — Account deletion + data export (real, working features)
import { Router } from "express";
import { storage } from "./storage.js";
import { authMiddleware, type AuthedRequest } from "./auth.js";

export function registerAccountRoutes(): Router {
  const router = Router();

  // DELETE /api/account — Delete account and all associated data
  router.delete("/", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      await storage.deleteUser(req.userId!);
      res.json({ success: true });
    } catch (err) {
      console.error("[account-delete]", err);
      res.status(500).json({ error: "Failed to delete account" });
    }
  });

  // GET /api/account/export — Export all user data as JSON
  router.get("/export", authMiddleware, async (req: AuthedRequest, res) => {
    try {
      const data = await storage.exportUserData(req.userId!);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", 'attachment; filename="scholarguide-data.json"');
      res.json(data);
    } catch (err) {
      console.error("[account-export]", err);
      res.status(500).json({ error: "Failed to export data" });
    }
  });

  return router;
}
