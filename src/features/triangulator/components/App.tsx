import { Provider } from "react-redux";
import Experience from "./Experience/Experience";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import TitleBar from "./Titlebar/TitleBar";
import store from "../store/store";
import "../styles/reset.css";
import "../styles/styles.css";
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/callout/callout.js";
import "@awesome.me/webawesome/dist/components/radio-group/radio-group.js";
import "@awesome.me/webawesome/dist/components/slider/slider.js";
import "@awesome.me/webawesome/dist/components/switch/switch.js";
import "@awesome.me/webawesome/dist/components/toast/toast.js";

export default function App() {
  return (
    <Provider store={store}>
      <main>
        <TitleBar />
        <div className="main-container">
          <div className="content">
            <Sidebar />
            <div className="viewport">
              <Experience />
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </Provider>
  );
}
