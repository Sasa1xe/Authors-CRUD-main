// schemas/SearchQuerySchema.js
import * as z from "zod";

export const QuerySchema = z.object({
  search: z.string("search must be a string").trim().optional(),
});