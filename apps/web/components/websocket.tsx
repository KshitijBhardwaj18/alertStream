"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserCard from "./userCard";
import { Button } from "./ui/button";
import { Session } from "next-auth";

interface WebSocketComponentProps {
  session: Session | null;
}

interface WebSocketMessage {
  type: string;
  name?: string | undefined;
  target?: string | number;
  users?: User[];
  senderId?: string | undefined;
}

interface User {
  name: string;
  email: string;
  id: string;
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({session}) => {
  
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string>("");

  

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.token) {
      const socketInstance = new WebSocket(`wss://alertstream.onrender.com:4000/?token=${session.user.token}`);

      console.log("Connecting to WebSocket server...");

      socketInstance.onopen = () => {
        console.log("WebSocket connection opened");
        if (session?.user?.id && session?.user?.email && session?.user?.name) {
          const { id, email, name } = session.user;
          socketInstance.send(
            JSON.stringify({
              type: "init",
              user: { id, email, name },
            })
          );
        }

        console.log("Sending init message with user ID", session?.user?.id);

        setSocket(socketInstance);
      };

      socketInstance.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        console.log("Received message:", data); // Log the received message

        switch (data.type) {
          case "userList":
            if (data.users) {
              console.log("Updating users:", data.users);
              setUsers(data.users);
            }
            break;
          case "ping":
            setMessage(`Ping received from user ${data.name}`);
            toast(`Ping received from user ${data.name}`);
            break;
          case "pingALL":
            if (data.senderId === session?.user?.id) {
              setMessage(`You pinged all users`);
              toast(`You pinged all users`);
            } else {
              setMessage(`${data.name} pinged all users`);
              toast(`${data.name} pinged all users`);
            }
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

      return () => {
        if (socketInstance) {
          socketInstance.close();
        }
      };
    }
  }, [router, session?.user, session?.user.token]);

  const sendPingToAll = () => {
    if (socket && socket.readyState === WebSocket.OPEN && session?.user?.id) {
      console.log("Sending ping to all users");
      socket.send(
        JSON.stringify({
          type: "ping",
          target: "all",
          senderId: session.user.id,
        })
      );
    } else {
      console.log("WebSocket connection is not open or user is not authenticated");
    }
  };

  const sendPingToUser = (targetId: string) => {
    console.log("Pinged a user");
    if (socket && socket.readyState === WebSocket.OPEN && session?.user?.id) {
      console.log(`Sending ping to user ${targetId}`);
      socket.send(
        JSON.stringify({
          type: "ping",
          target: targetId,
          senderId: session.user.id,
        })
      );
    } else {
      console.log("WebSocket connection is not open or user is not authenticated");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex flex-row w-full justify-between items-center p-5 mb-4 ">
        <p className="text-2xl font-bold">Connected Users</p>
        <Button onClick={sendPingToAll} className="mr-[8rem] px-8 bg-[#fca063] text-black hover:text-white">
          Ping ALL
        </Button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {users
            .filter((user) => user.id !== session?.user?.id)
            .map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                ping={() => sendPingToUser(user.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WebSocketComponent;
