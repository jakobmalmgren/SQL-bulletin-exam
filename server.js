import express from "express";

import messageRoutes from "./routes/messageRoutes.js"


import userRoutes from "./routes/userRoutes.js"


const app = express();
app.use(express.json());



app.use("/api/channels");
app.use("/api/subscriptions"); */
app.use("/api/messages", messageRoutes); 

app.use("/api/users", userRoutes)





app.listen(5000, () => {
  console.log(`servern körs på http://localhost:5000`);
});
