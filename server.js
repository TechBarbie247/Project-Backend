require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require("./routes/api"));
 
db.once ("open", () => {
  app.listen(PORT, () =>  console.log('Server running on http://localhost:${PORT}'));
});

