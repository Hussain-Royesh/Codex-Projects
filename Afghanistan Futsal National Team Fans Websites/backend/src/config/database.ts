import { Pool, type QueryResult, type QueryResultRow } from "pg";
import env from "./env";

export const pool = env.databaseUrl
  ? new Pool({
      connectionString: env.databaseUrl
    })
  : null;

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured");
  }

  return pool.query<T>(text, params);
}
