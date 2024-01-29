import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });

    connection.on("error", (error) => {
      console.log("Mongodb connection error. Please make sure mongodb is running. " + error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong.");
    console.log(error);
  }
}
