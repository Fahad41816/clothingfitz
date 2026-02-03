import mongoose from "mongoose";
import app from "./app";
import Config from "./app/Config";

function main() {
  mongoose
    .connect(Config.DatabaseUrl as string)
    .then(() => {
      console.log("Database Connected Success!");
    })
    .catch((err) => console.log(err));

  app.listen(Config.PORT, () => {
    console.log("Server Listening...");
  });
}

main();
