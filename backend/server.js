const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});