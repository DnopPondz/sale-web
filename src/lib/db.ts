import "dotenv/config"; 
/* eslint-env node */
/// <reference types="node" />
import mongoose from "mongoose";

let connecting: Promise<typeof mongoose> | null = null;
let connectedOnce = false;

export type DbHealth = {
  state: "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "DISCONNECTING";
  readyState: number;
  dbName?: string;
  host?: string;
  ok?: 1 | 0;
  error?: string;
};

const stateMap = ["DISCONNECTED","CONNECTED","CONNECTING","DISCONNECTING"] as const;

function attachOnce() {
  if (connectedOnce) return;
  connectedOnce = true;

  mongoose.connection.on("connected", () => {
    console.log("✅ Mongo connected:", mongoose.connection.name, "@", mongoose.connection.host);
  });
  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongo error:", err?.message || err);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongo disconnected");
  });
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  attachOnce();
  if (mongoose.connection.readyState === 1) return mongoose;

  if (!connecting) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    connecting = mongoose.connect(uri, { dbName: "saleweb" })
      .finally(() => { connecting = null; });
  }
  return connecting;
};

/** ตรวจสุขภาพการเชื่อมต่อแบบเร็ว ๆ (ไม่ยิง DB) */
export const getDbHealth = (): DbHealth => {
  const rs = mongoose.connection.readyState;
  return {
    state: stateMap[rs] ?? "DISCONNECTED",
    readyState: rs,
    dbName: mongoose.connection.name,
    host: (mongoose.connection as { host?: string }).host,
  };
};

/** ตรวจแบบลึก: ping ไปที่เซิร์ฟเวอร์ */
export const pingDb = async (): Promise<DbHealth> => {
  try {
    await connectToDatabase();
    // @ts-expect-error - admin is not typed in mongoose connection
    const ping = await mongoose.connection.db.admin().ping();
    return {
      ...getDbHealth(),
      ok: ping?.ok === 1 ? 1 : 0,
    };
  } catch (e: unknown) {
    return {
      ...getDbHealth(),
      ok: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
