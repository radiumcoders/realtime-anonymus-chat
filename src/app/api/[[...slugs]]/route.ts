import { Elysia } from "elysia";
import room from "@/lib/routes/room";

const app = new Elysia({ prefix: "/api" }).use(room);

export const GET = app.fetch;
export const POST = app.fetch;

export type app = typeof app;
