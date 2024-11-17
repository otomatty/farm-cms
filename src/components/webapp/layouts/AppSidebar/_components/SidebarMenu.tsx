import { Link, useLocation } from "react-router-dom";

type MenuItem = {
	to: string;
	label: string;
};

type SidebarMenuProps = {
	items: MenuItem[];
};

export default function SidebarMenu({ items }: SidebarMenuProps) {
	const location = useLocation();

	return (
		<div className="w-64 p-4">
			<nav>
				<ul className="space-y-1">
					{items.map((item) => (
						<li key={item.to}>
							<Link
								to={item.to}
								className={`block text-sm py-2 px-4 rounded transition-colors duration-200 ${
									location.pathname === item.to
										? "bg-primary text-primary-foreground dark:bg-primary/80 dark:text-primary-foreground"
										: "hover:bg-primary/10 dark:hover:bg-primary/70 dark:hover:text-primary-foreground"
								}`}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
