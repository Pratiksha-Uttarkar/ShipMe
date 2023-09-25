import {
    IntlProvider,
  } from "react-intl";
  
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
        return "ltr";
      case "es-MX":
        return "ltr";
      default:
        return "ltr";
    }
  }
  
  function LocalizationWrapper() {
    const [locale, setLocale] = useState(initLocale);
    const [messages, setMessages] = useState(null);
  
    useEffect(() => loadMessages(locale).then(setMessages), [locale]);
  
    return messages ? (
      <IntlProvider locale={locale} messages={messages}>
        <App locale={locale} direction={getDirection(locale)} onLocaleChange={(locale) => setLocale(locale)} />
      </IntlProvider>
    ) : null;
  }
  export default LocalizationWrapper;