import { Paper, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  return (
    <Paper
      component="form"
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
        placeholder="Enter your message"
        inputProps={{ "aria-label": "enter your message" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;
