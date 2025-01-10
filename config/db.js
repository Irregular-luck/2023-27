const mongoose = require('mongoose');




function connectToDB() {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected To Database");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error.message);
    });
}




module.exports = connectToDB