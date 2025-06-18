import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "nextApp", // Explicitly set the DB name
    });
    console.log("Connected to MongoDB");
    const connection = mongoose.connection;
    connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );

    connection.once("open", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
