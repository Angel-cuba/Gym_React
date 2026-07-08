import type { Context } from "@netlify/functions";

const EXERCISE_DB_BASE = "https://oss.exercisedb.dev/api/v1";
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async (req: Request, context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405, headers: cors });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/?api\/exercises-proxy\/?/, "");
  const qs = url.search;
  const upstream = `${EXERCISE_DB_BASE}/${path}${qs}`;

  try {
    let res: Response | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      res = await fetch(upstream);
      if (res.status !== 429) break;
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * (attempt + 1));
    }

    const body = await res!.text();

    return new Response(body, {
      status: res!.status,
      headers: {
        ...cors,
        "Content-Type": res!.headers.get("content-type") || "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Upstream request failed" }), {
      status: 502,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
};
