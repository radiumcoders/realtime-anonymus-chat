import { Elysia } from "elysia";

const room = new Elysia({ prefix: "/room" })
  .post("/create", () => {
    console.log("Create room endpoint hit");
  })
  .get("/info", () => {
    console.log("Room info endpoint hit");
  })

export default room;