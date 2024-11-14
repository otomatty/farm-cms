import { Outlet } from "react-router-dom";

const SetupLayout = () => {
	return (
		<div className="min-h-screen bg-background">
			<main className="flex min-h-screen flex-col items-center justify-center p-4">
				<div className="w-full max-w-3xl">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default SetupLayout;
