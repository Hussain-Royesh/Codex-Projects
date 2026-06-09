import cors from "cors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import env from "./config/env";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import editorRoutes from "./routes/editorRoutes";

const app = express();

app.use(
  cors({
    origin: env.corsOrigins,
    credentials: true
  })
);
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api/editor", editorRoutes);

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    service: "Afghanistan Futsal API"
  });
});

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  return response.status(500).json({
    message: "Internal server error"
  });
};

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Backend API running on http://localhost:${env.port}`);
});
