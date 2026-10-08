import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Game from "./pages/game";
import Result from "./pages/result";
function App() {
  return (
    <BrowserRouter basename="/memory-game">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={ <Game /> } />
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  );
}



export default App;