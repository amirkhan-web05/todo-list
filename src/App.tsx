import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/home-page/HomePage";
import { DetailsPage } from './pages/details-page/DetailsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/details" element={<DetailsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
