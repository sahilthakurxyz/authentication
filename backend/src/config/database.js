import mongoose from "mongoose";

export const connectDatabase = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Database connected at ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
