import express from "express";
import { createDB } from "../db.js";
import { validateBody } from "../middleware/validations.js";
import { AuthorsSchema } from "../schemas/AuthorsSchema.js";

export const AuthorsRoute = express.Router();
const db = createDB();

// get all authors
AuthorsRoute.get("/", async (req, res) => {
  const authors = await db.getAll("authors");

  // /authors?search=ahmed
  const search = req.query.search;

  if (search) {
    const filteredAuthors = authors.filter((author) =>
      author.name.toLowerCase().startsWith(search.toLowerCase()),
    );
    return res.json({
      data: filteredAuthors,
    });
  }

  return res.json({
    data: authors,
  });
});

// GET a specific author bu his ID
AuthorsRoute.get("/:author_id", async (req, res) => {
  const author = await db.getById("authors", req.params.author_id);

  if (!author) {
    return res.status(404).json({
      message: "author not found",
    });
  }

  return res.json({
    data: author,
  });
});

//Create Author
AuthorsRoute.post("/", async (req, res) => {
  const authorData = req.body;

  const result = bodySchema.safeParse(authorData);
  console.log("issues", result.error?.iss);

  await db.create("authors", authorData);

  return res.status(201).json({
    message: "author created successfully",
  });
});

// Update Author
AuthorsRoute.patch("/:author_id", async (req, res) => {
  const id = req.params.author_id;
  const author = await db.getById("authors", id);
  //if not then the Author is not found
  if (!author) {
    return res.status(404).json({
      message: "author not found",
    });
  }
  //Collecting the Body
  const updateData = req.body;

  await db.update("authors", id, updateData);
  const newAuthor = await db.getById("authors", id);

  return res.status(200).json({
    message: "author updated successfully",
    data: newAuthor,
  });
});

// Delete Author
AuthorsRoute.delete("/:author_id", async (req, res) => {
  const id = req.params.author_id;
  const author = await db.getById("authors", id);

  if (!author) {
    return res.status(404).json({
      message: "author not found",
    });
  }

  await db.delete("authors", id);
  const message = "author deleted successfully";

  res.status(204);
  res.end(message);
});
