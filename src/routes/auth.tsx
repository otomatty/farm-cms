import type { RouteObject } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login/LoginPage";
import { SignupPage } from "@/pages/auth/signup/SignupPage";
import { ResetPasswordPage } from "@/pages/auth/reset-password/ResetPasswordPage";
import { CallbackPage } from "@/pages/auth/callback/CallbackPage";

export const authRoutes: RouteObject[] = [
	{
		path: "/auth",
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "signup",
				element: <SignupPage />,
			},
			{
				path: "reset-password",
				element: <ResetPasswordPage />,
			},
			{
				path: "callback",
				element: <CallbackPage />,
			},
		],
	},
];
