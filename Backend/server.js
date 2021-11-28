const express = require("express");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", usersRoute);
app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
