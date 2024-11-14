import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export const ContactPage = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// お問い合わせ送信のロジックをここに実装
			await new Promise((resolve) => setTimeout(resolve, 1000)); // デモ用の遅延
			setIsSubmitted(true);
		} catch (error) {
			console.error("Failed to submit:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-3xl font-bold text-center mb-8">お問い合わせ</h1>

					{isSubmitted ? (
						<Card>
							<CardContent className="p-6 text-center">
								<h2 className="text-2xl font-bold text-green-600 mb-4">
									送信完了
								</h2>
								<p className="text-gray-600 mb-4">
									お問い合わせありがとうございます。
									内容を確認次第、担当者よりご連絡させていただきます。
								</p>
								<Button onClick={() => setIsSubmitted(false)}>
									新しいお問い合わせ
								</Button>
							</CardContent>
						</Card>
					) : (
						<Card>
							<CardHeader>
								<CardTitle>お問い合わせフォーム</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-2">
										<label htmlFor="name" className="text-sm font-medium">
											お名前 <span className="text-red-500">*</span>
										</label>
										<Input
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
										/>
									</div>

									<div className="space-y-2">
										<label htmlFor="email" className="text-sm font-medium">
											メールアドレス <span className="text-red-500">*</span>
										</label>
										<Input
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>

									<div className="space-y-2">
										<label htmlFor="subject" className="text-sm font-medium">
											件名 <span className="text-red-500">*</span>
										</label>
										<Input
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											required
										/>
									</div>

									<div className="space-y-2">
										<label htmlFor="message" className="text-sm font-medium">
											お問い合わせ内容 <span className="text-red-500">*</span>
										</label>
										<Textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											rows={6}
											required
										/>
									</div>

									<Button
										type="submit"
										className="w-full"
										disabled={isSubmitting}
									>
										{isSubmitting ? "送信中..." : "送信する"}
									</Button>
								</form>
							</CardContent>
						</Card>
					)}

					{/* 補足情報 */}
					<div className="mt-8 text-center text-gray-600">
						<p className="mb-4">
							お急ぎの場合は、以下の連絡先までご連絡ください：
						</p>
						<div className="space-y-2">
							<p>電話：03-XXXX-XXXX（平日 9:00-18:00）</p>
							<p>メール：support@example.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
