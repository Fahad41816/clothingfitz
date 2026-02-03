import express from "express";
import cors from "cors";
import routers from "./Routers/Routers";
import globalErrorHandle from "./error/GlobalErrorHandler";

const app = express();

// wedalware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({
    message: "ClothingFitz Server Listening...",
  });
});

// routers
app.use("/api/v1", routers);

// global error
app.use(globalErrorHandle);

export default app;
