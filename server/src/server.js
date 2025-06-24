import connectMongo from "./config/database.config.js";
import app from "./main.js";
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectMongo();
  console.log(`Server is running on port ${PORT}`);
});
