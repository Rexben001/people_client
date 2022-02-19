import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Flex
        width="100%"
        position="fixed"
        height="50px"
        alignContent="center"
        fontSize="2rem"
        paddingLeft="2rem"
        backgroundColor="#3182ce"
        color="white"
        zIndex="20"
      >
        <Text
          fontFamily="cursive"
          cursor="pointer"
          onClick={() => (window.location.href = "/")}
        >
          People Page
        </Text>
      </Flex>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
