import "dotenv/config";
import express from "express";
import { connectDatabase } from "./client/client.js";
import studentRouter from "./routes/students.js";
import countriesRouter from "./routes/countries.js";
import cors from 'cors'

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/students", studentRouter);
app.use("/countries", countriesRouter);

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.log(error, "Failed to start server.");
});