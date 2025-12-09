import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { redis } from "../redis";

const ROOM_DESTRUCTION_TIME = 60 * 10; //10 min in seconds ;]

const room = new Elysia({ prefix: "/room" }).post("/create", async () => {
  //create a random room id ;]
  const roomId = nanoid();

  await redis.set(`meta:room:${roomId}`, {
    createdAt: Date.now(),
    connectedUsers: [],
  });

  await redis.expire(`meta:room:${roomId}`, ROOM_DESTRUCTION_TIME); 

  return { roomId };
});

export default room;
