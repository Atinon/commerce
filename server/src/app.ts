import express from "express";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/index.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/", router);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
