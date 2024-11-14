import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const AboutPage = () => {
	const navigate = useNavigate();

	const teamMembers = [
		{
			id: 1,
			name: "山田 太郎",
			role: "CEO & Founder",
			image: "/images/team/yamada.jpg",
			description: "10年以上のソフトウェア開発経験を持つエンジニア",
		},
		{
			id: 2,
			name: "鈴木 花子",
			role: "Lead Designer",
			image: "/images/team/suzuki.jpg",
			description: "UIデザインのスペシャリスト",
		},
		// 他のチームメンバー...
	];

	return (
		<div className="min-h-screen">
			{/* ヒーローセクション */}
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl font-bold mb-6">私たちについて</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						より効率的な働き方を実現するために、
						最高のツールを提供することを使命としています。
					</p>
					<Button size="lg" onClick={() => navigate("/contact")}>
						お問い合わせ
					</Button>
				</div>
			</section>

			{/* ミッションセクション */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">私たちのミッション</h2>
						<p className="text-gray-600 mb-8">
							テクノロジーの力で、人々の働き方を革新し、
							より創造的で生産的な社会を実現することを目指しています。
						</p>
					</div>
				</div>
			</section>

			{/* チームセクション */}
			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						チームメンバー
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{teamMembers.map((member) => (
							<Card key={member.id}>
								<CardContent className="p-6 text-center">
									<div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
										<img
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<h3 className="text-xl font-bold mb-2">{member.name}</h3>
									<p className="text-gray-500 mb-2">{member.role}</p>
									<p className="text-sm text-gray-600">{member.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* 会社情報セクション */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">会社情報</h2>
						<div className="space-y-4">
							<div className="flex border-b pb-4">
								<div className="w-1/3 font-medium">会社名</div>
								<div className="w-2/3">株式会社サンプル</div>
							</div>
							<div className="flex border-b pb-4">
								<div className="w-1/3 font-medium">設立</div>
								<div className="w-2/3">2020年4月1日</div>
							</div>
							<div className="flex border-b pb-4">
								<div className="w-1/3 font-medium">所在地</div>
								<div className="w-2/3">東京都渋谷区...</div>
							</div>
							<div className="flex border-b pb-4">
								<div className="w-1/3 font-medium">事業内容</div>
								<div className="w-2/3">
									ソフトウェア開発
									<br />
									ITコンサルティング
									<br />
									クラウドサービスの提供
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
