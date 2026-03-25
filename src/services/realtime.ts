import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export function getIO(): SocketIOServer | null {
  return io;
}

export function initIO(server: any): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: { origin: process.env.NEXT_PUBLIC_APP_URL, methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    socket.on("join-workspace", (workspaceId: string) => {
      socket.join(`workspace:${workspaceId}`);
    });

    socket.on("leave-workspace", (workspaceId: string) => {
      socket.leave(`workspace:${workspaceId}`);
    });

    socket.on("disconnect", () => {});
  });

  return io;
}

export function emitToWorkspace(
  workspaceId: string,
  event: string,
  data: unknown
) {
  io?.to(`workspace:${workspaceId}`).emit(event, data);
}
