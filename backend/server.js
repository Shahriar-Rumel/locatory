const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();
//Route files
const places = require("./routes/places");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use("/api/places", places);
app.use("/api/auth", auth);
app.use("/api/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

//Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //Close server and exit
  server.close(() => process.exit(1));
});
