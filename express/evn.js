import { z } from "zod";

const envSchema = z.coerce.number().min(1024).max(65535).default(3000);

export const PORT = envSchema.parse(process.env.PORT);