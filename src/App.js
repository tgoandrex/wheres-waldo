import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LandingRoute from "./routes/LandingRoute";
import LevelRoute from "./routes/LevelRoute";
import ScoreboardRoute from "./routes/ScoreboardRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingRoute />} />
        <Route path=':level' element={<LevelRoute />} />
        <Route path=':level/scoreboard' element={<ScoreboardRoute/>} />
      </Routes>
    </Router>
  );
}

export default App;