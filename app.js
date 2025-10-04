import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRouter from "./Routes/subscription.routes.js";
import workFlowRouter from "./Routes/workflow.routes.js";
import connectToDB from "./database/mongoDB.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjet from "@arcjet/node";
import arcjetMiddleware from "./middlewares/Arcjet.middleware.js";


const app = express();

app.use(express.json());//
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workFlowRouter);

// add error middelware

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});


(async () => {
  try {
    await connectToDB(); // Connect to MongoDB first
    app.listen(PORT, () => {
      console.log(`🚀 App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1);
  }
})();

export default app;
