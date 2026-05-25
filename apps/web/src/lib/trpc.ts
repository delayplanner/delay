import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@delay/api/router";

export const trpc = createTRPCReact<AppRouter>();
