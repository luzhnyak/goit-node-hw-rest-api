const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://luzhnyak:d4pwBIC7Q70BxyGa@luzhnyak.lhqrfpl.mongodb.net/hw-api?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
