import * as WebSocket from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;


const wss = new WebSocket.Server({ port: port });

const users = new Map();
let userIdCounter = 1;

function broadcastPing(senderId) {
  users.forEach((client, id) => {
    if (id !== senderId) {
      client.send(JSON.stringify({ type: 'ping', senderId }));
    }
  });
}

function sendPing(target, senderId) {
  const targetWs = users.get(target);
  if (targetWs && targetWs.readyState === WebSocket.OPEN) {
    targetWs.send(JSON.stringify({ type: 'ping', senderId }));
  }
}

function updateUserList() {
  const userList = Array.from(users.keys());
  users.forEach((client) => {
    client.send(JSON.stringify({ type: 'userList', users: userList }));
  });
}

wss.on('connection', (ws) => {
  const userId = userIdCounter++;
  users.set(userId, ws);
  ws.send(JSON.stringify({ type: 'userId', userId }));
  updateUserList();

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === 'ping') {
      if (data.target === 'all') {
        broadcastPing(data.senderId);
      } else {
        sendPing(data.target, data.senderId);
      }
    }
  });

  ws.on('close', () => {
    users.delete(userId);
    updateUserList();
  });
});

console.log('WebSocket server is running on port 8080');