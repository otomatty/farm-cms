import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./main";
import "./index.css";

const container = document.querySelector("#root");
if (!container) {
	throw new Error("No root element found");
}
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
);
