import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from './pages/Create/Create';
import Projects from './pages/Project/Projects';
import Layout from './pages/Layout';
import About from "./pages/About";
import './index.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element ={<Layout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/create" element={<Create />}/>
            <Route path="/about" element={<About />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App