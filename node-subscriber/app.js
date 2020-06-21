const express = require("express");
const bodyParser = require('body-parser');
const WebSocket = require("ws");
const { createServer } = require("http");

const app = express();
app.use(bodyParser.json());
app.use("/", require("./routes"));

const port = process.env.PORT || 9000;

//initialize a http server
const server = createServer(app);
server.listen(port, () => {
  console.log(`Node subscriber server running on port: ${port}`);
});
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  console.info(`Total connected clients: ${wss.clients.size}`);
  app.locals.clients = wss.clients;
  //send immediate a feedback to the incoming connection
  ws.send(
    JSON.stringify({
      type: "connect",
      message: "Welcome to Dapr Chat App",
    })
  );
});
