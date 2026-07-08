import type { Context } from "@netlify/functions";
import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db/client";
import { favoriteExercises } from "./db/schema";
import { getUserId } from "./lib/auth";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
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
        .from(favoriteExercises)
        .where(eq(favoriteExercises.user_id, userId))
        .orderBy(desc(favoriteExercises.created_at));
      return Response.json(rows, { headers: cors });
    }

    case "POST": {
      const body = await req.json();
      const [row] = await db
        .insert(favoriteExercises)
        .values({
          user_id: userId,
          exercise_id: body.exercise_id,
          exercise_name: body.exercise_name,
          body_part: body.body_part,
          gif_url: body.gif_url,
        })
        .returning();
      return Response.json(row, { status: 201, headers: cors });
    }

    case "DELETE": {
      const { exercise_id } = await req.json();
      await db
        .delete(favoriteExercises)
        .where(
          and(
            eq(favoriteExercises.exercise_id, exercise_id),
            eq(favoriteExercises.user_id, userId)
          )
        );
      return new Response(null, { status: 204, headers: cors });
    }

    default:
      return new Response("Method not allowed", { status: 405, headers: cors });
  }
};
