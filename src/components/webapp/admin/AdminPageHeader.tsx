interface AdminPageHeaderProps {
	title: string;
	description: string;
	action?: React.ReactNode;
}

export const AdminPageHeader = ({ title }: AdminPageHeaderProps) => {
	return <h1>{title}</h1>;
};
