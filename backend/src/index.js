import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
dotenv.config();
const PORT = process.env.PORT;

process.on("uncaughtException", (err) => {
  console.log(
    `unCaughtException Error may due to bad request that couldn't handled by the error handler ${err}`
  );
  process.exit(0);
});
connectDatabase();
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection may due to Promise Rejection ${err}`);
  server.close(() => process.exit(1));
});
