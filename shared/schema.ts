import { z } from "zod";

export const embedRequestSchema = z.object({
  payload: z.string().max(256, "Payload must be 256 bytes or less"),
  key: z.string().optional(),
});

export const extractRequestSchema = z.object({
  key: z.string().optional(),
});

export const steganographyResultSchema = z.object({
  success: z.boolean(),
  data: z.string().optional(),
  error: z.string().optional(),
});

export type EmbedRequest = z.infer<typeof embedRequestSchema>;
export type ExtractRequest = z.infer<typeof extractRequestSchema>;
export type SteganographyResult = z.infer<typeof steganographyResultSchema>;
