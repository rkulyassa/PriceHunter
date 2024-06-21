import express from "express";
import path from "path";

const app: express.Application = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    res.send("index.html");
  } catch (error) {
    next(error);
  }
});

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});