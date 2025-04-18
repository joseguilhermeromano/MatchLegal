import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { ConversationInterface, historyChat, speakAssistant } from "../services/api";

const ChatContainer = () => {
  const [messages, setMessages] = useState<ConversationInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await historyChat();
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  // Efeito para rolar para baixo quando as mensagens mudam
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text: string) => {
    // Adiciona a mensagem do usuário imediatamente
    const userMessage: ConversationInterface = {
      from: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Envia a mensagem para o assistente e aguarda a resposta
      const response = await speakAssistant(text);
      
      // Cria a mensagem do assistente com a resposta
      const assistantMessage: ConversationInterface = {
        from: "assistant",
        text: response.data.reply,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Mensagem de erro do assistente
      const errorMessage: ConversationInterface = {
        from: "assistant",
        text: "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  if (isLoading) {
    return <Box>Carregando...</Box>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        p: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          mb: 2,
          p: 2,
          backgroundColor: "#fafafa",
          borderRadius: 2,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "20px",
          },
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={`${message.timestamp}-${index}`} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default ChatContainer;