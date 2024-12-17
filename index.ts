import express, { Express } from "express";
import "dotenv/config";
import router from "./router/router";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import chalk from "chalk";
import loadInitialData from "./src/initailData";
import { Server } from "socket.io";
import http, { createServer } from "http";
import mainSocket from "./src/sockets/mainSocket";

const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

loadInitialData().catch(console.error);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);

mainSocket(io);

// התחברות ל-MongoDB עם לוגים צבעוניים
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log(chalk.cyanBright("Connected to MongoDB Atlas"));
  })
  .catch((error) => {
    console.error(chalk.red("Error connecting to MongoDB:", error)); // לוג אדום כשיש שגיאה
  });

server.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.blue(`Listening on: http://localhost:${process.env.PORT || 8000}`)
  );
});
