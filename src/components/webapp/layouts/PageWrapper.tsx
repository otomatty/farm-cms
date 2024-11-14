import type React from "react";
import { ChevronLeft } from "lucide-react"; // 矢印アイコンをインポート
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
type PageWrapperProps = {
	children: React.ReactNode;
	backPath: string; // 遷移先を指定するプロパティ
	showBackButton?: boolean; // 戻るボタンの表示を制御するプロパティ
};

export default function PageWrapper({
	children,
	backPath,
	showBackButton = true,
}: PageWrapperProps) {
	return (
		<div className="p-4">
			{showBackButton && (
				<Button variant="ghost" size="icon" asChild>
					<Link to={backPath}>
						<ChevronLeft />
					</Link>
				</Button>
			)}
			{children}
		</div>
	);
}
