import { useContext,createContext } from "react";

export const WebSocketContext = createContext<{
    ws: WebSocket | null;
  } | null>(null);
  

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
  };
  