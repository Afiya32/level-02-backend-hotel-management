// server.ts

import dotenv from "dotenv";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

dotenv.config();
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Hotel management app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
main();
