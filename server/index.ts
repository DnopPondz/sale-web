/* eslint-env node */
import http, { IncomingMessage, ServerResponse } from "http";
import { Model, isValidObjectId } from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { Product } from "./models/Product";
import { Order } from "./models/Order";
import { User } from "./models/User";
import { Promotion } from "./models/Promotion";
import { Coupon } from "./models/Coupon";

// ---------------------- Config ----------------------
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "*";

const models: Record<string, Model<unknown>> = {
  products: Product,
  orders: Order,
  users: User,
  promotions: Promotion,
  coupons: Coupon,
};

// ---------------------- Utils ----------------------
const setCors = (res: ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

const sendJson = (res: ServerResponse, data: unknown, status = 200) => {
  setCors(res);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
};

const getBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      // ป้องกัน body ใหญ่ผิดปกติ (ปรับได้ตามต้องการ)
      if (data.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
};

// ---------------------- Server ----------------------
const server = http.createServer(async (req, res) => {
  try {
    // CORS preflight
    if (req.method === "OPTIONS") {
      setCors(res);
      res.statusCode = 204;
      return res.end();
    }

    if (!req.url || !req.headers.host) {
      return sendJson(res, { error: "Invalid request" }, 400);
    }

    const url = new URL(req.url, `http://${req.headers.host}`);

    // Health check
    if (url.pathname === "/healthz" && req.method === "GET") {
      return sendJson(res, { ok: true });
    }

    // Expect: /api/:resource or /api/:resource/:id
    const parts = url.pathname.split("/").filter(Boolean); // removes empty
    const [api, resource, id] = parts;

    if (api !== "api" || !resource) {
      return sendJson(res, { error: "Not found" }, 404);
    }

    const Model = models[resource];
    if (!Model) {
      return sendJson(res, { error: `Unknown resource: ${resource}` }, 404);
    }

    // connect DB (จะ cache connection ใน connectToDatabase อยู่แล้ว)
    await connectToDatabase();

    // Routing
    switch (req.method) {
      case "GET": {
        // /api/:resource/:id
        if (id) {
          if (!isValidObjectId(id)) {
            return sendJson(res, { error: "Invalid id" }, 400);
          }
          const doc = await Model.findById(id).lean();
          if (!doc) return sendJson(res, { error: "Not found" }, 404);
          return sendJson(res, doc);
        }

        // /api/:resource?limit=&page=
        const limit = Math.min(Number(url.searchParams.get("limit")) || 50, 200);
        const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
          Model.find().skip(skip).limit(limit).lean(),
          Model.countDocuments(),
        ]);

        // ส่งจำนวนรวมผ่าน header เพื่อรองรับการทำ pagination ฝั่ง client
        res.setHeader("X-Total-Count", String(total));
        return sendJson(res, items);
      }

      case "POST": {
        const raw = await getBody(req).catch((e: unknown) => {
          const msg = e instanceof Error ? e.message : String(e);
          throw new Error(msg || "Read body failed");
        });
        let payload: Record<string, unknown> = {};
        try {
          payload = raw ? JSON.parse(raw) : {};
        } catch {
          return sendJson(res, { error: "Invalid JSON" }, 400);
        }
        const created = await Model.create(payload);
        return sendJson(res, created, 201);
      }

      case "PUT": {
        if (!id) return sendJson(res, { error: "Missing id" }, 400);
        if (!isValidObjectId(id)) return sendJson(res, { error: "Invalid id" }, 400);

        const raw = await getBody(req).catch((e: unknown) => {
          const msg = e instanceof Error ? e.message : String(e);
          throw new Error(msg || "Read body failed");
        });
        let payload: Record<string, unknown> = {};
        try {
          payload = raw ? JSON.parse(raw) : {};
        } catch {
          return sendJson(res, { error: "Invalid JSON" }, 400);
        }

        const updated = await Model.findByIdAndUpdate(id, payload, { new: true }).lean();
        if (!updated) return sendJson(res, { error: "Not found" }, 404);
        return sendJson(res, updated);
      }

      case "DELETE": {
        if (!id) return sendJson(res, { error: "Missing id" }, 400);
        if (!isValidObjectId(id)) return sendJson(res, { error: "Invalid id" }, 400);

        const deleted = await Model.findByIdAndDelete(id).lean();
        if (!deleted) return sendJson(res, { error: "Not found" }, 404);
        return sendJson(res, { success: true });
      }

      default:
        res.setHeader("Allow", "GET,POST,PUT,DELETE,OPTIONS");
        return sendJson(res, { error: "Method not allowed" }, 405);
    }
  } catch (err: unknown) {
    // แยก error พบบ่อยให้เข้าใจง่าย
    if (err instanceof Error && err.message.includes("Payload too large")) {
      return sendJson(res, { error: "Payload too large" }, 413);
    }
    return sendJson(res, { error: err instanceof Error ? err.message : "Internal server error" }, 500);
  }
});

server.listen(PORT, () => {
  // log ยืนยันพอร์ต + ให้รู้ว่า Vite ยังรันที่ 8080
  console.log(`🧩 API server listening on http://localhost:${PORT}`);
});
