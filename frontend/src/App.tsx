import { CssBaseline, Box } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <ChatHeader />

        <Box
          sx={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Coluna do mascote */}
          <Box
            sx={{
              width: "30%",
              minWidth: "200px",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid #ddd",
              p: 2,
            }}
          >
            {/* Você pode substituir essa imagem por um componente com animação ou SVG */}
            <img
              src="/imgs/mascot.png"
              alt="Mascote"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>

          {/* Coluna do chat */}
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "linear-gradient(to bottom, #f5f5f5, #ffffff)",
              padding: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                px: 1,
                pb: 1,
              }}
            >
              <ChatMessages />
            </Box>

            <Box
              sx={{
                width: "100%",
                px: 1,
              }}
            >
              <ChatInput />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
