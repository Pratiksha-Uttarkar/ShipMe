import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import { Layout } from "./components/Layout";
import Layout1 from "./components/Layout1";
import Register from "./components/Register";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <Router>
     <ResponsiveAppBar />
        <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<div
        style={{
          width: "60%",
          margin: "auto",
          padding: "20px",
        }}
      >
        <Hero />
        <About />
        <Layout />
        <Layout1/>
      </div>}
      />
        </Routes>
      </Router> 
     
      
      <Footer />
    </div>
  );
}

export default App;
