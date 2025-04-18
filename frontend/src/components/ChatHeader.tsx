import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const ChatHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#181661" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontSize: 28, fontFamily: "'Pacifico', cursive" }}>
          <Box 
            component="span" 
            sx={{ 
              fontSize: '40px',
              lineHeight: 1,
            }}
          >
            🎯
          </Box>
          MATCH LEGAL
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
