// components/WebSocketComponent.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { auth } from "@/auth";
import { Session } from 'next-auth';

interface WebSocketMessage {
  type: string;
  senderId?: string;
  target?: string | number;
  users?: string[];
}



const WebSocketComponent: React.FC<Session> =  (session:Session) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  console.log(session);


  useEffect(() => {
    // Establish WebSocket connection
    
    
    const socketInstance = new WebSocket('wss://alertstream.onrender.com/:4000');

    socketInstance.onopen = () => {
      console.log('WebSocket connection opened');
      if(session.user){
        if(session.user.id && session.user.email && session.user.name){
        const {id,email,name} = session.user;
        socketInstance.send(JSON.stringify({ type: 'init', user: { id, email, name } }));
    }
    }
      
      setSocket(socketInstance);
      if(session.user.id){
      setUserId(session.user.id);
      }
    };

    socketInstance.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      if (data.type === 'userList' && data.users) {
        setUsers(data.users);
      } else if (data.type === 'ping' && data.senderId !== undefined) {
        setMessage(`Ping received from user ${data.senderId}`);
      } else if (data.type === 'userId' && data.senderId !== undefined) {
        setUserId(data.senderId);
      }
    };

    socketInstance.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };

    socketInstance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

   
  }, []);

  const sendPingToAll = () => {
    if (socket && userId !== null) {
      const message: WebSocketMessage = { type: 'ping', target: 'all', senderId: userId };
      socket.send(JSON.stringify(message));
    }
  };

  const sendPingToUser = (targetId: number) => {
    if (socket && userId !== null) {
      const message: WebSocketMessage = { type: 'ping', target: targetId, senderId: userId };
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      {userId !== null ? (
        <p>Your user ID: {userId}</p>
      ) : (
        <p>Loading user ID...</p>
      )}
      <div>
        <h2>Users:</h2>
        <ul>
          {users.map((id) => (
            <li key={id}>
              User {id}
              {id !== userId && (
                <button onClick={() => sendPingToUser(id)}>Ping</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={sendPingToAll}>Ping All Users</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WebSocketComponent;
