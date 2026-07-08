import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function getUserId(headers: Headers): Promise<string | null> {
  const authHeader = headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  try {
    const { sub } = await clerk.verifyToken(token);
    return sub;
  } catch {
    return null;
  }
}
