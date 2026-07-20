import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  source: string;
  details: string | null;
}

const dbPath = path.join(process.cwd(), "leads.json");

// Ensure the local leads JSON file exists on application startup
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

export const db = {
  lead: {
    create: async (args: { data: Omit<Lead, "id" | "createdAt"> }) => {
      // Create directories if they do not exist (defensive design)
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Read existing records
      let leads: Lead[] = [];
      try {
        if (fs.existsSync(dbPath)) {
          const fileData = fs.readFileSync(dbPath, "utf8");
          leads = JSON.parse(fileData || "[]");
        }
      } catch (err) {
        console.error("Error reading leads file, resetting database:", err);
      }

      // Create new record
      const newLead: Lead = {
        id: "lead_" + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        ...args.data,
      };

      leads.push(newLead);

      // Persist to file
      fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2), "utf8");
      return newLead;
    },

    findMany: async (args?: { orderBy?: { createdAt: "desc" | "asc" } }) => {
      let leads: Lead[] = [];
      try {
        if (fs.existsSync(dbPath)) {
          const fileData = fs.readFileSync(dbPath, "utf8");
          leads = JSON.parse(fileData || "[]");
        }
      } catch (err) {
        console.error("Error reading leads file:", err);
      }

      // Order records
      if (args?.orderBy?.createdAt === "desc") {
        return [...leads].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return leads;
    },
  },
};
