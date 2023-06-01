const mongoose = require("mongoose");
const dotenv = require("dotenv")

const connectDB = async ()=>{
  dotenv.config();
  console.log(process.env.MONGO_URI);
    try {
      console.log("URI",process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true,
        });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`); 
      } catch(err){
        console.log(`Error: ${err.message}`);
        process.exit();
      }
};

module.exports = connectDB;   