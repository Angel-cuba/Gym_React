import type { Context } from "@netlify/functions";
import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db/client";
import { savedRoutines } from "./db/schema";
import { getUserId } from "./lib/auth";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

export default async (req: Request, _context: Context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const userId = await getUserId(req.headers);
  if (!userId) {
    return new Response("Unauthorized", { status: 401, headers: cors });
  }

  const db = getDb();

  switch (req.method) {
    case "GET": {
      const rows = await db
        .select()
        .from(savedRoutines)
        .where(eq(savedRoutines.user_id, userId))
        .orderBy(desc(savedRoutines.created_at));
      return Response.json(rows, { headers: cors });
    }

    case "POST": {
      const body = await req.json();
      const [row] = await db
        .insert(savedRoutines)
        .values({
          user_id: userId,
          program_id: body.program_id,
          program_name: body.program_name,
          level: body.level,
          color: body.color,
          selected_weeks: body.selected_weeks,
          notes: body.notes,
        })
        .returning();
      return Response.json(row, { status: 201, headers: cors });
    }

    case "PUT": {
      const { id, ...changes } = await req.json();
      const [row] = await db
        .update(savedRoutines)
        .set(changes)
        .where(and(eq(savedRoutines.id, id), eq(savedRoutines.user_id, userId)))
        .returning();
      if (!row) {
        return new Response("Not found", { status: 404, headers: cors });
      }
      return Response.json(row, { headers: cors });
    }

    case "DELETE": {
      const { id } = await req.json();
      await db
        .delete(savedRoutines)
        .where(and(eq(savedRoutines.id, id), eq(savedRoutines.user_id, userId)));
      return new Response(null, { status: 204, headers: cors });
    }

    default:
      return new Response("Method not allowed", { status: 405, headers: cors });
  }
};
