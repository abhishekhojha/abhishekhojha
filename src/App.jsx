import "./App.css";
import "@/assets/css/hover.css";

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Loader from "./component/Loader";

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setPageLoaded(true);
        document.body.style.overflow = "auto";
      }, [4000]);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  return (
    <>
      <div className="main">
        <Loader loading={pageLoaded} />
          <Router>
            <Routes>
              <Route path="/" element={<Home loading={pageLoaded} />}></Route>
            </Routes>
          </Router>
      </div>
    </>
  );
}

export default App;
