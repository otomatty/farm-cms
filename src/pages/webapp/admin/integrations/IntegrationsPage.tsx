import { AdminPageHeader } from "@/components/webapp/admin/AdminPageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IntegrationCard } from "./_components/IntegrationCard";
import { useIntegrations } from "./_hooks/useIntegrations";
import { Grid } from "@/components/ui/grid";

export const IntegrationsPage = () => {
	const { integrations, isLoading, toggleIntegration } = useIntegrations();

	return (
		<div className="space-y-6">
			<AdminPageHeader
				title="インテグレーション"
				description="外部サービスとの連携を管理します"
			/>

			<Card>
				<CardHeader>
					<CardTitle>利用可能なインテグレーション</CardTitle>
				</CardHeader>
				<CardContent>
					<Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{integrations.map((integration) => (
							<IntegrationCard
								key={integration.id}
								integration={integration}
								onToggle={toggleIntegration}
							/>
						))}
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
};