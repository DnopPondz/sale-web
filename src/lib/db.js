import mongoose from 'mongoose';

const stateMap = ['DISCONNECTED', 'CONNECTED', 'CONNECTING', 'DISCONNECTING'];

let cached = global._mongooseConnection;
if (!cached) {
  cached = { conn: null, promise: null };
  global._mongooseConnection = cached;
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }

    cached.promise = mongoose.connect(uri, { dbName: 'saleweb' }).then(connection => {
      console.log('✅ Mongo connected:', connection.connection.name);
      return connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function getDbHealth() {
  const state = mongoose.connection.readyState;
  return {
    state: stateMap[state] || 'DISCONNECTED',
    readyState: state,
    dbName: mongoose.connection.name,
    host: mongoose.connection.host,
  };
}

export async function pingDb() {
  try {
    const connection = await connectToDatabase();
    const admin = connection.connection.db.admin();
    const ping = await admin.ping();
    return { ...getDbHealth(), ok: ping?.ok === 1 ? 1 : 0 };
  } catch (error) {
    return { ...getDbHealth(), ok: 0, error: error instanceof Error ? error.message : String(error) };
  }
}
