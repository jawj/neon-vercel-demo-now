import { Client, neonConfig } from '@jawj/test-serverless';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
  regions: ['fra1'],
};

export interface ResponseData {
  now: string;
  duration: number;
}

export default async function handler(req: NextRequest) {
  const queryParams = Object.fromEntries(new URL(req.url ?? 'http://xyz').searchParams);

  // db: 'gm' (default) | 'neon'
  // tls: 'wss' (default) | 'subtls'
  // fast: 'no' (default) | 'yes'
  // coalesce: 'no' (default) | 'yes'
  // qnow: 'no' (default) | 'yes'

  const dbURL = queryParams.db === 'neon' ? process.env.DATABASE_URL_NEON! : process.env.DATABASE_URL_GM!;
  const wss = queryParams.tls !== 'subtls';
  const fast = queryParams.fast === 'yes';
  const coalesce = queryParams.coalesce === 'yes';

  neonConfig.useSecureWebSocket = neonConfig.disableTLS = wss;
  neonConfig.fastStart = fast;
  neonConfig.coalesceWrites = coalesce;

  const t0 = Date.now();

  const client = new Client(dbURL);
  await client.connect();
  const { rows: [now] } = await client.query(`select now()`);
  client.end();  // TODO: is there an equivalent to Cloudflare's `ctx.waitFor`?

  const duration = Date.now() - t0;
  return NextResponse.json({ now, duration });
}
