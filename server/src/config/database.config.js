import mongoose from "mongoose";

async function connectMongo() {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/taskManagerDB";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
export default connectMongo;