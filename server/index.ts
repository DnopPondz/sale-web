/* eslint-env node */
import http, { IncomingMessage, ServerResponse } from "http";
import type { Model } from "mongoose";
import { connectToDatabase } from "../src/lib/db";
import { Product } from "./models/Product";
import { Order } from "./models/Order";
import { User } from "./models/User";
import { Promotion } from "./models/Promotion";
import { Coupon } from "./models/Coupon";

const models: Record<string, Model<unknown>> = {
  products: Product,
  orders: Order,
  users: User,
  promotions: Promotion,
  coupons: Coupon,
};

const getBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
  });
};

const sendJson = (res: ServerResponse, data: unknown, status = 200) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, { error: "Invalid request" }, 400);
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const [, api, resource, id] = url.pathname.split("/");

  if (req.method === "OPTIONS") {
    sendJson(res, {});
    return;
  }

  if (api !== "api" || !resource || !models[resource]) {
    sendJson(res, { error: "Not found" }, 404);
    return;
  }

  await connectToDatabase();
  const Model = models[resource];

  try {
    if (req.method === "GET") {
      if (id) {
        const doc = await Model.findById(id).lean();
        sendJson(res, doc);
      } else {
        const docs = await Model.find().lean();
        sendJson(res, docs);
      }
    } else if (req.method === "POST") {
      const body = await getBody(req);
      const created = await Model.create(JSON.parse(body || "{}"));
      sendJson(res, created, 201);
    } else if (req.method === "PUT" && id) {
      const body = await getBody(req);
      const updated = await Model.findByIdAndUpdate(id, JSON.parse(body || "{}"), { new: true }).lean();
      sendJson(res, updated);
    } else if (req.method === "DELETE" && id) {
      await Model.findByIdAndDelete(id);
      sendJson(res, { success: true });
    } else {
      sendJson(res, { error: "Method not allowed" }, 405);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    sendJson(res, { error: message }, 500);
  }
});

server.listen(3000);
