import express from "express";

import { AuthorsRoute } from "./routes/authors.route.js";
import { usersRouter } from "./routes/users.route.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

//------------Routes---------------
app.use("/authors", AuthorsRoute);
app.use("/users", usersRouter);
//---------------------------------

//------------Error Handler-----------
app.use((err, req, res, next) => {
  console.error(err.err);
  res.status(500).json({ error: "something went wrong" });
});
//------------------------------------

app.listen(3000, () => {
  console.log("listening on port 3000");
});
