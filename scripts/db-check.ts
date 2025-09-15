// scripts/db-check.ts
import { pingDb } from "../src/lib/db";

(async () => {
  const health = await pingDb();
  console.log(JSON.stringify(health, null, 2));
  process.exit(health.ok === 1 ? 0 : 1);
})();
