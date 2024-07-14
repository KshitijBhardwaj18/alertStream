import * as WebSocket from 'ws';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;


const wss = new WebSocket.Server({ port: port });

const users = new Map();


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
  let registeredUserId = null;

 

  ws.on('message', (message) => {
    const messageData = message.toString();
    const data = JSON.parse(messageData);
    switch (data.type) {
      case 'init':
        // Set the userId from the client's initial message
        registeredUserId = data.user.id;
        users.set(registeredUserId, ws);
        ws.send(JSON.stringify({ type: 'userId', userId: registeredUserId }));
        updateUserList();
        break;
      case 'ping':
        if (data.target === 'all') {
          broadcastPing(registeredUserId);
        } else {
          sendPing(data.target, registeredUserId);
        }
        break;
      default:
        console.log('Unknown message type received');
    }
  });

  ws.on('close', () => {
    users.delete(registeredUserId);
    updateUserList();
  });
});

console.log('WebSocket server is running on port 8080');