require("dotenv").config();
const server = require("./server");
const port = process.env.PORT_SERVER || 9000;

server.listen(port, () => {
  console.log("Server is listening on port " + port);
});
