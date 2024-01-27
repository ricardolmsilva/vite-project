import { Router } from "express";
import { redisClient } from "./redis-client";

export const router = Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

router.get("/", async (req, res) => {
  const { key, value } = req.query;
  console.log("key", key);
  console.log("value", value);

  await redisClient.set(key, value);
  const dbValue = await redisClient.get(key);

  res.send({ text: "Birds home page", dbValue });
});
