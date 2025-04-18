import { Box, Typography, Paper } from "@mui/material";
import { ConversationInterface } from "../services/api";

interface ChatMessageProps {
  message: ConversationInterface;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.from === "user";
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 2,
          backgroundColor: isUser ? "#e3f2fd" : "#f5f5f5",
          maxWidth: "70%",
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ whiteSpace: "pre-line" }}
        >
          {message.text}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;