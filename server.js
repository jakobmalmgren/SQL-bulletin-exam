import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json());

app.use("/api/users");
app.use("/api/channels");
app.use("/api/subscriptions");
app.use("/api/messages");

app.listen(5000, () => {
  console.log(`servern körs på http://localhost:5000`);
});
