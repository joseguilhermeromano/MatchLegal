import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 8px",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: 2,
        mt: 2,
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Fale comigo chará..."
        inputProps={{ "aria-label": "Fale comigo chará..." }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;