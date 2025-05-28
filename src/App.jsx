import "./App.css";
import "@/assets/css/hover.css";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import PageTransition from "./component/PageTransition";
import { TransitionProvider } from "./context/TransitionContext";

function App() {
  // const [pageLoaded, setPageLoaded] = useState(false);

  return (
    <>
      <TransitionProvider>
        <PageTransition />
        <AnimatePresence mode="wait" initial={true}>
          <div className="main">
            <div className="background">
              <img src="./bg.jpg" alt="" />
            </div>
            {/* <Loader loading={pageLoaded} /> */}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/portfolio" element={<Portfolio />}></Route>
            </Routes>
          </div>
        </AnimatePresence>
      </TransitionProvider>
    </>
  );
}

export default App;
