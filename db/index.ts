import { Pool } from "pg";
import config   from "./config";

const pool = new Pool(config);

export default {
  async query(text: string, params?: string[]) {
    const client = await pool.connect();
    try {
      const start = Date.now();
      const result = await client.query(text, params);
      const duration = Date.now() - start;
      // eslint-disable-next-line no-console
      console.log("executed query", { text, duration, rows: result.rowCount });
      return result;
    } finally {
      client.release();
    }
  },
};
