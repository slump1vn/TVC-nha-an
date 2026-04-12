import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "schedule.json");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  await ensureDataDir();

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || "nu.ttb";
    const adminPass = process.env.ADMIN_PASSWORD || "VietinBank2026$";

    if (username === adminUser && password === adminPass) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  });

  app.get("/api/schedule/latest", async (req, res) => {
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(404).json({ error: "No schedule found" });
    }
  });

  app.post("/api/schedule/latest", async (req, res) => {
    try {
      const data = req.body;
      await fs.writeFile(DATA_FILE, JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString()
      }, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save schedule" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    
    // Serve the logo from root if it exists (for on-premise deployment)
    app.get("/vietinbank-school-logo.png", (req, res) => {
      res.sendFile(path.join(__dirname, "vietinbank-school-logo.png"));
    });

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
