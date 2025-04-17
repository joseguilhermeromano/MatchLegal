import { Box, Paper, Typography } from "@mui/material";

const ChatMessages = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Paper elevation={1} sx={{ p: 1.5, maxWidth: "80%", alignSelf: "flex-start" }}>
        <Typography>
          🧍‍♂️ <strong>Hey!</strong>
        </Typography>
      </Paper>

      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          maxWidth: "80%",
          alignSelf: "flex-start",
          backgroundColor: "#e3f2fd",
        }}
      >
        <Typography>
          🤖 <strong>Hello! How can I assist you today?</strong> If you have any
          questions or need information on a topic, feel free to ask.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessages;
