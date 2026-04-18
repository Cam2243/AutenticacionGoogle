import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";      
import Dashboard from "./pages/Dashboard"; 

function App() {
  return (
    <Router> {/* Contenedor principal que habilita la navegación */}
      <Routes> {/* Define el conjunto de rutas posibles */}
        <Route 
          path="/" 
          element={<Home />}
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />
      </Routes>
    </Router>
  );
}

export default App;