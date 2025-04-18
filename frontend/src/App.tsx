import { CssBaseline, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatContainer from "./components/ChatContainer";

function App() {
  const [currentMascot, setCurrentMascot] = useState("/imgs/mascot.png");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpa o intervalo anterior (se existir)
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Configura um novo intervalo
    intervalRef.current = setInterval(() => {
      setCurrentMascot((prevMascot) =>
        prevMascot === "/imgs/mascot.png"
          ? "/imgs/mascot_2.png"
          : "/imgs/mascot.png"
      );
    }, 300); // 300ms (0.3 segundos)

    // Limpa o intervalo ao desmontar
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
            <img
              src={currentMascot}
              alt="Mascote"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>

          {/* Coluna do chat - agora usando o ChatContainer */}
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(to bottom, #f5f5f5, #ffffff)",
              overflow: "hidden",
            }}
          >
            <ChatContainer />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;