import { createClient, RedisClientType } from "redis";

class RedisHelper {
  private static instance: RedisHelper;
  public client: RedisClientType;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on("error", (err) => {
      console.error("Redis error: ", err);
    });

    this.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
    });
  }

  public static getInstance(): RedisHelper {
    if (!RedisHelper.instance) {
      RedisHelper.instance = new RedisHelper();
    }
    return RedisHelper.instance;
  }

  public async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect();
    }
  }
}

export const redisClient = RedisHelper.getInstance().client;
