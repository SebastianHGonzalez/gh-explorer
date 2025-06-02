import z from "zod";

export const withPagination = <T extends z.ZodRawShape>(shape?: T) =>
  z
    .object({
      limit: z.number().int().positive().default(100),
      offset: z.number().int().nonnegative().default(0),
      ...(shape ?? {}),
    })
    .default({});
