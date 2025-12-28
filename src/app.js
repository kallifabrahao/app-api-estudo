import "dotenv/config";
import express from "express";
import router from "./routes/index.js";
import { connectDatabase } from "./config/database.js";

const app = express();
router(app);

await connectDatabase();

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + process.env.PORT || 5000)
);

export default app;
