// pages/api/websocket.ts
import { Socket } from 'dgram';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'ws';

let wss: Server | null = null;

export  const api =  (req: NextApiRequest, res: NextApiResponse) => {
  if (!wss) {
    wss = new Server({ noServer: true });

    wss.on('connection', (socket: Socket) => {
      socket.on('message', (message) => {
        const { target, content } = JSON.parse(message.toString());
        if (target === 'all') {
          wss?.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(content);
            }
          });
        } else {
          const targetClient = Array.from(wss.clients).find(
            (client: any) => client.id === target
          );
          if (targetClient && targetClient.readyState === targetClient.OPEN) {
            targetClient.send(content);
          }
        }
      });

      socket.on('close', () => {
        // Handle user disconnect
      });
    });
  }

  if (req.socket.server) {
    req.socket.server.on('upgrade', (request, socket, head) => {
      if (request.url === '/api/websocket') {
        wss?.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      }
    });
  }

  res.status(200).end();
};
