import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "CHAT_APPLICATION",
  }).then(()=>{
    console.log("Database connected");
  }).catch(()=>{
    console.log(`Error connecting to database: ${error.message || error}`)
  })
};

