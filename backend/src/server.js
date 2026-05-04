require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const { createApp } = require("./app");
const { connectDatabase } = require("./config/db");
const { registerGameSockets } = require("./sockets/gameSocket");

const app = createApp();
const server = http.createServer(app);
const io = new Server(server);

registerGameSockets(io);

server.on("error", (error) => {
  console.error("Server error:", error);
});

async function start() {
  try {
    await connectDatabase(process.env.MONGODB_URI);

    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("WebSocket server ready");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  start();
}

module.exports = {
  server,
  io,
  start,
};