import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import { Layout } from "./components/Layout";
import Layout1 from "./components/Layout1";
import Register from "./components/Register";

let initLocale = "en";
if (navigator.language === "es-MX") {
  initLocale = "es-MX";
} else if (navigator.language === "ar") {
  initLocale = "ar";
}

function loadMessages(locale) {
  switch (locale) {
    case "ar":
      return import("./lang/ar.json");
    case "en":
      return import("./lang/en.json");
    case "es-MX":
      return import("./lang/es-MX.json");
    default:
      return import("./lang/en.json");
  }
}

function getDirection(locale) {
  switch (locale) {
    case "ar":
      return "rtl";
    case "en":
    case "es-MX":
      return "ltr";
    default:
      return "ltr";
  }
}

function LocalizationWrapper() {
  const [locale, setLocale] = useState(initLocale);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    loadMessages(locale).then((loadedMessages) => {
      setMessages(loadedMessages.default);
    });
  }, [locale]);

  return messages ? (
    <IntlProvider locale={locale} messages={messages}>
      <App
        locale={locale}
        direction={getDirection(locale)}
        onLocaleChange={(locale) => setLocale(locale)}
      />
    </IntlProvider>
  ) : null;
}

function App({ locale, direction, onLocaleChange }) {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar locale={locale} onLocaleChange={onLocaleChange} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
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
                <Layout1 />
              </div>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default LocalizationWrapper;
