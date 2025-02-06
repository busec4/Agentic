import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from './pages/Create';
import Projects from './pages/Projects';
import Layout from './pages/Layout';
import './index.css'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element ={<Layout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/create" element={<Create />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App