"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(workspaceId: string | null) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!workspaceId) return;

    const socket = io(process.env.NEXT_PUBLIC_APP_URL || "", {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      socket.emit("join-workspace", workspaceId);
    });

    socketRef.current = socket;

    return () => {
      socket.emit("leave-workspace", workspaceId);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [workspaceId]);

  return socketRef;
}
