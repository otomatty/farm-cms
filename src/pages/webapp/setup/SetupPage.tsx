import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut, ChevronRight } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { completeSetup } from "@/services/setupService";
import { useAuth } from "@/hooks/useAuth";
import { UserInfoCard } from "@/components/auth/UserInfoCard";
import { useSetupStatus } from "@/hooks/useSetupStatus";
import { LoadingSpinner } from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useOrganizationSwitcher } from "@/hooks/useOrganizationSwitcher";

const cardVariants = {
	initial: { scale: 1 },
	hover: {
		scale: 1.02,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

const arrowVariants = {
	initial: { x: 0 },
	hover: {
		x: 5,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

export const SetupPage = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { session, signOut } = useAuth();
	const { loadOrganizations } = useOrganizationSwitcher();
	const { data: setupStatus, isLoading } = useSetupStatus({
		enableLogging: true,
	});

	const handleSetupComplete = useCallback(async () => {
		if (!session?.user?.id) {
			toast({
				title: "エラー",
				description: "セッションが無効です。再度ログインしてください。",
				variant: "destructive",
			});
			return;
		}

		try {
			await completeSetup(session.user.id);
			await loadOrganizations();
			window.location.href = "/webapp";
		} catch (error) {
			toast({
				title: "エラー",
				description:
					error instanceof Error
						? error.message
						: "セットアップの完了に失敗しました",
				variant: "destructive",
			});
		}
	}, [session?.user?.id, loadOrganizations, toast]);

	const handleSignOut = async () => {
		try {
			await signOut();
			navigate("/auth/login");
		} catch (error) {
			console.error("Failed to sign out:", error);
		}
	};

	const SetupCard = ({
		isCompleted,
		title,
		description,
		onClick,
	}: {
		isCompleted: boolean;
		title: string;
		description: string;
		onClick: () => void;
	}) => (
		<motion.div
			initial="initial"
			whileHover="hover"
			className="flex-1"
			variants={cardVariants}
		>
			<Card
				onClick={onClick}
				className={`h-full grid place-items-center flex-1 cursor-pointer relative transition-colors duration-200 hover:bg-accent/50 ${
					isCompleted ? "border-green-500" : ""
				}`}
			>
				<div className="w-full flex items-center justify-between p-6">
					<div className="flex items-center gap-3">
						<div>
							<CardTitle>{title}</CardTitle>
							<CardDescription className="mt-2">{description}</CardDescription>
						</div>
					</div>
					<div className="flex items-center gap-4">
						{isCompleted && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.3 }}
							>
								<CheckCircle2 className="w-6 h-6 text-green-500" />
							</motion.div>
						)}
						<motion.div variants={arrowVariants}>
							<ChevronRight className="w-5 h-5 text-muted-foreground" />
						</motion.div>
					</div>
				</div>
			</Card>
		</motion.div>
	);

	if (!session?.user) {
		return null;
	}

	if (isLoading) {
		return (
			<div className="h-screen grid place-items-center">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="absolute top-4 right-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={handleSignOut}
					className="text-muted-foreground hover:text-foreground"
				>
					<LogOut className="w-4 h-4 mr-2" />
					ログアウト
				</Button>
			</div>

			<h1 className="text-3xl font-bold text-center mb-8">初期セットアップ</h1>

			<div className="flex justify-center gap-4">
				<UserInfoCard user={session.user} />
				<div>
					<div className="h-full flex flex-col gap-4">
						<SetupCard
							isCompleted={setupStatus?.isProfileCompleted ?? false}
							title={
								setupStatus?.isProfileCompleted
									? "プロフィールを編集する"
									: "プロフィールを設定する"
							}
							description="基本的なプロフィール情報を設定してください。"
							onClick={() => navigate("/webapp/setup/profile")}
						/>

						<SetupCard
							isCompleted={setupStatus?.isOrganizationCompleted ?? false}
							title={
								setupStatus?.isOrganizationCompleted
									? "組織設定を編集する"
									: "組織を設定する"
							}
							description="新しい組織を作成するか、既存の組織に参加してください。"
							onClick={() => navigate("/webapp/setup/organization")}
						/>
					</div>
				</div>
			</div>
			{setupStatus?.isProfileCompleted &&
				setupStatus?.isOrganizationCompleted && (
					<motion.div
						className="text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Button onClick={handleSetupComplete} size="lg" className="mt-8">
							セットアップを完了する
						</Button>
					</motion.div>
				)}
		</div>
	);
};
