import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import { Layout } from "./components/Layout";
import Layout1 from "./components/Layout1";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <div
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
