import * as WebSocket from 'ws';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const port = 4000;

const wss = new WebSocket.Server({ port: port });

interface User {
  email: string;
  id: string;
  name: string;
}

const users = new Map<string, { ws: WebSocket, user: User }>();

function broadcastPing(senderId: string, name: string) {
  users.forEach(({ ws }, id) => {
    ws.send(JSON.stringify({ type: 'pingALL', name, senderId }));
  });
}

function sendPing(target: string, name: string) {
  const targetWs = users.get(target)?.ws;
  if (targetWs && targetWs.readyState === WebSocket.OPEN) {
    console.log("Ping sent to:", target);
    targetWs.send(JSON.stringify({ type: 'ping', name }));
  }
}

function updateUserList() {
  const userList = Array.from(users.values()).map(({ user }) => ({
    id: user.id,
    email: user.email,
    name: user.name,
  }));
  users.forEach(({ ws }) => {
    ws.send(JSON.stringify({ type: 'userList', users: userList }));
  });
}

wss.on('connection', (ws: WebSocket, req) => {
  ws.on('message', (message: WebSocket.Data) => {
    const messageData = message.toString();
    const data = JSON.parse(messageData);
    switch (data.type) {
      case 'init':
        users.set(registeredUser.id, { ws, user: registeredUser });
        ws.send(JSON.stringify({ type: 'userId', userId: registeredUser.id }));
        updateUserList();
        break;
      case 'ping':
        if (registeredUser) {
          if (data.target === 'all') {
            broadcastPing(registeredUser.id, registeredUser.name);
          } else {
            sendPing(data.target, registeredUser.name);
          }
        }
        break;
      default:
        console.log('Unknown message type received');
    }
  });
  const params = new URLSearchParams(req.url?.split('?')[1]);
  const token = params.get('token');

  if (!token) {
    
    ws.close(1008, 'Token not provided');
    return;
  }

  let decoded: User;
  try {
    decoded = jwt.verify(token, "secret") as User;
  } catch (err) {
    console.log('Invalid token:', err);
    ws.close(1008, 'Invalid token');
    return;
  }

  const registeredUser: User = decoded;

  // ws.on('message', (message: WebSocket.Data) => {
  //   const messageData = message.toString();
  //   const data = JSON.parse(messageData);
  //   switch (data.type) {
  //     case 'init':
  //       users.set(registeredUser.id, { ws, user: registeredUser });
  //       ws.send(JSON.stringify({ type: 'userId', userId: registeredUser.id }));
  //       updateUserList();
  //       break;
  //     case 'ping':
  //       if (registeredUser) {
  //         if (data.target === 'all') {
  //           broadcastPing(registeredUser.id, registeredUser.name);
  //         } else {
  //           sendPing(data.target, registeredUser.name);
  //         }
  //       }
  //       break;
  //     default:
  //       console.log('Unknown message type received');
  //   }
  // });

  ws.on('close', () => {
    users.delete(registeredUser.id);
    updateUserList();
  });
});

console.log('WebSocket server is running on port', port);
