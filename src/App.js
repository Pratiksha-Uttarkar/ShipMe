import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import { Layout } from "./components/Layout";
import Layout1 from "./components/Layout1";
import Register from "./components/Register";
import Deliveryarea from "./components/Deliveryarea";
import "./App.css";
import Login from "./components/Login";
import LocalStorage from "./helpers/Localstorage";
import "./interceptor/axiosinterceptor";
// import { Redirect } from "./components/Redirect";
// import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import CategoryStore from "./components/CategoryStore";
import StoreItem from "./components/StoreItem";
import Cart from "./components/Cart";
import { Switch } from "react-router-dom";
import Checkout from "./components/Checkout";
import PreviewPage from "./components/PreviewPage";

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
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);

  const addToCart = (item) => {
    console.log(item);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  console.log(process.env);
  const [isUserLogin, setIsUserLogin] = useState(
    LocalStorage.get("token") ? true : false
  );
  console.log(isUserLogin);
  const userId = localStorage.getItem("userId") || "user_id";

  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar
          key={userId}
          cartNumber={cartNumber}
          cartItems={cartItems}
          locale={locale}
          onLocaleChange={onLocaleChange}
          isUserLogin={isUserLogin}
          setIsUserLogin={setIsUserLogin}
          setCartNumber={setCartNumber}
        />
        <Routes>
          <Route
            path="/register"
            element={
              <>
                <Register /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <PrivateRoute
                element={
                  <>
                    <Login
                      setIsUserLogin={setIsUserLogin}
                      isUserLogin={isUserLogin}
                    />{" "}
                    <Footer />{" "}
                  </>
                }
                validator={() => !LocalStorage.get("token")}
                Failure={<Navigate to={"/dashboard"} />}
              />
            }
          />
          <Route
            path="/categories/:id"
            element={
              <>
                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "20px",
                  }}
                >
                  <CategoryStore />
                </div>
              </>
            }
          />
          <Route
            path="/store/:id"
            element={
              <>
                <StoreItem
                  addToCart={addToCart}
                  setCartNumber={setCartNumber}
                />

                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "20px",
                  }}
                >
                  {/* <StoreItem /> */}
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                {/* <Cart cartItems={cartItems} /> */}
                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "20px",
                  }}
                >
                  <Cart
                    setCartNumber={setCartNumber}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "20px",
                  }}
                >
                  <Checkout />
                </div>
              </>
            }
          />
          <Route
            path="/preview"
            element={
              <>
                <div
                  style={{
                    width: "60%",
                    margin: "auto",
                    padding: "20px",
                  }}
                >
                  <PreviewPage />
                </div>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
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
                  <Deliveryarea />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LocalizationWrapper;
