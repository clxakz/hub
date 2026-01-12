import "./assets/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./Layout.tsx";
import { ThemeProvider } from "./components/Theme-Provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark">
			<Layout />
		</ThemeProvider>
	</StrictMode>
);
