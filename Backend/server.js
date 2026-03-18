require("dotenv").config();   

const app = require("./src/app");
const connectTOdb = require("./src/config/database");

connectTOdb();

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});