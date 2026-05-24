import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@delai/api/router";

export const trpc = createTRPCReact<AppRouter>();
