import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/icons";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ImageUploadProps {
	value?: string;
	onChange: (value: string) => void;
	bucket: string;
	onReset?: () => void;
	initialImage?: string;
}

export function ImageUpload({
	value,
	onChange,
	bucket,
	onReset,
	initialImage,
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [preview, setPreview] = useState<string | undefined>(value);
	const { toast } = useToast();
	const { session } = useAuth();

	// デバッグ用：propsの値をログ出力
	useEffect(() => {
		console.log("ImageUpload props:", { value, bucket });
	}, [value, bucket]);

	useEffect(() => {
		setPreview(value);
	}, [value]);

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			try {
				console.log("onDrop triggered with files:", acceptedFiles); // デバッグ用

				const file = acceptedFiles[0];
				if (!file) {
					console.log("No file selected"); // デバッグ用
					return;
				}

				setIsUploading(true);
				console.log("Starting upload process for file:", file.name); // デバッグ用

				// ファイルサイズの制限を追加
				const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
				if (file.size > MAX_FILE_SIZE) {
					console.log("File size exceeds limit:", file.size); // デバッグ用
					throw new Error("ファイルサイズは5MB以下にしてください");
				}

				if (!session?.user?.id) {
					console.log("No user session found"); // デバッグ用
					throw new Error("ユーザーセッションが見つかりません");
				}

				// ファイル名をユニークにする
				const fileExt = file.name.split(".").pop();
				const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
				const filePath = `${fileName}`;

				console.log("Uploading file with path:", filePath); // デバッグ用

				// Supabaseストレージにアップロード
				const { error: uploadError, data: uploadData } = await supabase.storage
					.from(bucket)
					.upload(filePath, file);

				console.log("Upload response:", { uploadError, uploadData }); // デバッグ用

				if (uploadError) {
					console.error("Upload error:", uploadError); // デバッグ用
					throw uploadError;
				}

				// 公開URLを取得
				const {
					data: { publicUrl },
				} = supabase.storage.from(bucket).getPublicUrl(filePath);

				console.log("Generated public URL:", publicUrl); // デバッグ用

				// プレビューを更新
				setPreview(publicUrl);
				onChange(publicUrl);

				toast({
					title: "画像のアップロードが完了しました",
					description: "プロフィール画像が正常に更新されました。",
				});
			} catch (error) {
				console.error("Error in upload process:", error); // デバッグ用：詳細なエラー情報
				toast({
					variant: "destructive",
					title: "エラーが発生しました",
					description:
						error instanceof Error
							? error.message
							: "画像のアップロードに失敗しました",
				});
			} finally {
				setIsUploading(false);
				console.log("Upload process completed"); // デバッグ用
			}
		},
		[bucket, onChange, session?.user?.id, toast],
	);

	const removeImage = useCallback(async () => {
		try {
			console.log("Attempting to remove image:", preview); // デバッグ用

			if (preview) {
				// URLからファイルパスを抽出
				const filePath = preview.split("/").pop();
				console.log("Extracted file path:", filePath); // デバッグ用

				if (filePath) {
					const { error } = await supabase.storage
						.from(bucket)
						.remove([filePath]);

					console.log("Remove response:", { error }); // デバッグ用

					if (error) throw error;
				}
			}
			setPreview(undefined);
			onChange("");

			toast({
				title: "画像を削除しました",
				description: "プロフィール画像が正常に削除されました。",
			});
		} catch (error) {
			console.error("Error in remove process:", error); // デバッグ用
			toast({
				variant: "destructive",
				title: "エラーが発生しました",
				description: "画像の削除に失敗しました",
			});
		}
	}, [bucket, preview, onChange, toast]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif"],
		},
		maxFiles: 1,
		multiple: false,
	});

	// デバッグ用：ドロップゾーンの状態をログ出力
	useEffect(() => {
		console.log("Dropzone state:", { isDragActive });
	}, [isDragActive]);

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={cn(
					"flex flex-col items-center justify-center rounded-lg border border-dashed p-6 cursor-pointer",
					isDragActive && "border-primary bg-muted",
					isUploading && "opacity-50 cursor-not-allowed",
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center gap-4">
					<Avatar className="h-24 w-24">
						<AvatarImage src={preview} />
						<AvatarFallback>
							{isUploading ? (
								<Icons.spinner className="h-4 w-4 animate-spin" />
							) : (
								<Icons.user className="h-12 w-12" />
							)}
						</AvatarFallback>
					</Avatar>
					<div className="flex items-center gap-2">
						<Icons.upload className="h-4 w-4" />
						<p className="text-sm text-muted-foreground">
							{isDragActive
								? "ここにドロップしてアップロード"
								: "クリックまたはドラッグ＆ドロップで画像をアップロード"}
						</p>
					</div>
				</div>
			</div>
			{preview && (
				<div className="flex justify-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={removeImage}
						disabled={isUploading}
					>
						<Icons.close className="h-4 w-4 mr-2" />
						画像を削除
					</Button>
					{onReset && initialImage && preview !== initialImage && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => {
								onReset();
								setPreview(initialImage);
							}}
							disabled={isUploading}
						>
							<Icons.google className="h-4 w-4 mr-2" />
							Googleの画像に戻す
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
