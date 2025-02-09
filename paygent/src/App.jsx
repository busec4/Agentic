import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import About from "./pages/About";
import './index.css'
import Token from "./pages/Token/Token";
import Create from './pages/Create/Create';
import Projects from './pages/Project/Projects';
import ProjectInfo from "./pages/ProjectInfo/ProjectInfo";
import Contribute from "./pages/Contribute/Contribute";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element ={<Layout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/create" element={<Create />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/project-info" element={<ProjectInfo />} />
            <Route path="/project-token" element={<Token />} />
            <Route path="/contribute" element={<Contribute />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App