import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Experience from "./Experience/Experience";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import TitleBar from "./Titlebar/TitleBar";
import store from "../store/store";
import "../styles/reset.css";
import "../styles/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export default function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<Notifications limit={5} />
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
		</MantineProvider>
	);
}
