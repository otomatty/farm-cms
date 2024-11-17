import type React from "react";
import { BrowserRouter } from "react-router-dom";

export const MockProviders = ({ children }: { children: React.ReactNode }) => {
	return <BrowserRouter>{children}</BrowserRouter>;
};
