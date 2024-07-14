"use client";

import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface WebSocketComponentProps {
  session: Session | null;
}

interface WebSocketMessage {
  type: string;
  senderId?: string | undefined;
  target?: string | number;
  users?: string[];
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({ session }) => {
  const [userId, setUserId] = useState<string | undefined | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
      
      const socketInstance = new WebSocket(
        "ws://localhost:4000"
      );

      console.log("Connecting to WebSocket server...");

      socketInstance.onopen = () => {
        console.log("WebSocket connection opened");
        if(session?.user.id && session?.user.email && session?.user.name){
        const { id, email, name } = session.user;
        socketInstance.send(
          JSON.stringify({
            type: "init",
            user: { id, email, name },
          })
        );

    }

    console.log("Sending init message with user ID", session?.user.id);
        setUserId(session?.user.id as string);
        setSocket(socketInstance);
      };

      socketInstance.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        switch (data.type) {
          case "userList":
            setUsers(data.users || []);
            console.log("Received user list", data.users);
            break;
          case "ping":
            setMessage(`Ping received from user ${data.senderId}`);
            break;
          case "userId":
            setUserId(data.senderId);
            break;
          default:
            console.log("Received unknown message type");
        }
      };

      socketInstance.onclose = () => {
        console.log("WebSocket connection closed");
        setSocket(null);
      };

      socketInstance.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

     
    
  }, [router]);

  const sendPingToAll = () => {
    if (socket && userId) {
      socket.send(
        JSON.stringify({
          type: "ping",
          target: "all",
          senderId: userId,
        })
      );
    }
  };

  const sendPingToUser = (targetId: string) => {
    if (socket && userId) {
      socket.send(
        JSON.stringify({
          type: "ping",
          target: targetId,
          senderId: userId,
        })
      );
    }
  };

 

  return (
    <div>
      <h1>WebSocket Example</h1>
      <p>Your user ID: {userId || "Loading user ID..."}</p>
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
