const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI)
  .catch(err => console.error(err));

module.exports = mongoose.connection;