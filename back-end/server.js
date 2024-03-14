const app = require("./app");
const connectDatabase = require("./db/mongoDB");

//handle uncaughtException Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exception");
});

//connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

//
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("shutting down the server for unhandle promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
