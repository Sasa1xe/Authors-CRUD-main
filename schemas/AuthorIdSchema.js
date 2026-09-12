// schemas/AuthorIdSchema.js
import * as z from "zod";

export const AuthorIdSchema = z.object({
  author_id: z.string("author_id must be a string"),
});