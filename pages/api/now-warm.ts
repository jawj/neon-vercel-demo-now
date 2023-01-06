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

const dbURL = process.env.DATABASE_URL_GM!;
const wss = true;
const fast = true;
const coalesce = true;

neonConfig.wsProxy = 'ws.manipulexity.com/v1';
neonConfig.useSecureWebSocket = neonConfig.disableTLS = wss;
neonConfig.pipelineConnect = fast ? 'passwordAuth' : false;
neonConfig.pipelineTLS = fast;
neonConfig.coalesceWrites = coalesce;

const client = new Client(dbURL);
client.connect();

const start = Date.now();

export default async function handler(req: NextRequest) {
  const t0 = Date.now();
  const { rows: [now] } = await client.query(`select now()`);
  const duration = Date.now() - t0;
  return NextResponse.json({ now, duration, cold: start === t0 });
}
