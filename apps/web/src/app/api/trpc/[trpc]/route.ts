import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@delai/api/router";
import { db } from "@delai/db/client";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({
      db,
      userId: req.headers.get("x-user-id"),
    }),
  });

export { handler as GET, handler as POST };
