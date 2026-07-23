import { Client, QueryResult, QueryResultRow } from "pg";

const DATABASE_URL = process.env.DATABASE_URL!;

export async function pgQuery<T extends QueryResultRow = Record<string, unknown>>(
  sql: string,
  params?: unknown[],
  timeoutMs = 30000
): Promise<QueryResult<T>> {
  const client = new Client({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: timeoutMs,
  });

  try {
    await client.connect();
    return await client.query<T>(sql, params);
  } finally {
    await client.end().catch(() => {});
  }
}
