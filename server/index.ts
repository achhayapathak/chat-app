import WebSocket, { WebSocketServer } from "ws";
import express from 'express';
import { log } from "console";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    log("Sever started!");
  
    socket.on('message', function message(data, isBinary) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });
  });  