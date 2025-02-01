"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { webSocketUrl } from "@/lib/web-socket-url";
import { Ticket } from "@/interfaces/ticket-interface";
import { useToast } from "@/hooks/use-toast";

// Define the context type

// Create the context with proper typing
const WebSocketContext = createContext<{
  sendMessage: (message: string) => void;
  chatNotificationCount: number;
  resetChatNotificationCount: () => void;
  ticketNotificationCount: number;
  resetTicketNotificationCount: () => void;
  loading: boolean;
  tickets: Ticket[] | [];
  webSocketState: number | undefined;
} | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [chatNotificationCount, setChatNotificationCount] = useState(0);
  const [ticketNotificationCount, setTicketNotificationCount] = useState(0);
  const [webSocketState, setWebSocketState] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef(false);
  const pingIntervalRef = useRef<number | null>(null);

  const { toast } = useToast();

  const connectWebSocket = () => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const ws = new WebSocket(webSocketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        setWebSocketState(WebSocket.OPEN);

        reconnectRef.current = false; // Reset reconnect flag

        // Start pinging the server every 30 seconds
        pingIntervalRef.current = window.setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({ action: "default", message: "hello" })
            );
            console.log("Ping sent");
          }
        }, 30000); // 30 seconds ping interval
      };

      ws.onmessage = (event) => {
        console.log("Message received:", event.data);
        try {
          const data = JSON.parse(event.data);
          // Assuming the message contains a list of tickets
          if (data.tickets) {
            if (data.tickets.length == 1) {
              setTickets((prevTickets) => [...data.tickets, ...prevTickets]);
              setTicketNotificationCount((prevCount) => prevCount + 1);
              toast({
                title: "New Ticket",
                description: "You have a new ticket",
              });
            } else {
              setTickets([...data.tickets]);
            }
          }

          // const data = JSON.parse(event.data);
          // Update messages state based on data
          // setMessages((prevMessages) => [...prevMessages, data]);
          // // Example: Check if the message is related to chat or tickets
          // if (data.type === "chats") {
          //   setChatNotificationCount((prevCount) => prevCount + 1);
          // } else if (data.type === "tickets") {
          //   setTicketNotificationCount((prevCount) => prevCount + 1);
          // }
        } catch (error) {
          console.error("Error parsing message data:", error);
        } finally {
          setLoading(false);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close(); // Close the socket and trigger reconnection
        setWebSocketState(WebSocket.CLOSED);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setWebSocketState(WebSocket.CLOSED);
        if (!reconnectRef.current) {
          reconnectRef.current = true;
          setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
        }

        // Clear ping interval if connection is closed
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
          pingIntervalRef.current = null;
        }
      };
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      // Cleanup ping interval on component unmount
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send Message
  const sendMessage = (message: string) => {
    setLoading(true);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  };

  const resetChatNotificationCount = () => {
    setChatNotificationCount(0);
  };

  const resetTicketNotificationCount = () => {
    setTicketNotificationCount(0);
  };

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage,
        chatNotificationCount,
        resetChatNotificationCount,
        ticketNotificationCount,
        resetTicketNotificationCount,
        loading,
        tickets,
        webSocketState,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
