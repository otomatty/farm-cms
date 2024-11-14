import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja, type Locale } from "date-fns/locale"; // Locale型をインポート
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TaskData {
	title: string;
	dueDate: Date | undefined;
	status: "未着手" | "進行中" | "完了";
}

type OnSubmit = (data: TaskData) => void;

const TaskFormSchema = z.object({
	title: z.string().min(1, "タスク名は必須です。"),
	dueDate: z.date({
		required_error: "期限は必須です。",
	}),
	status: z.enum(["未着手", "進行中", "完了"]),
});

// カスタマイズしたロケールを作成
const customJaLocale: Locale = {
	...ja,
	localize: {
		...ja.localize,
		month: (n: number) => `${n + 1}月`, // 月の表示をカスタマイズ
	},
	formatLong: {
		...ja.formatLong,
		date: () => "yyyy年M月d日", // 日付の表示をカスタマイズ
	},
};

export function TaskForm({
	initialData,
	onSubmit,
}: { initialData: TaskData; onSubmit: OnSubmit }) {
	const form = useForm<z.infer<typeof TaskFormSchema>>({
		resolver: zodResolver(TaskFormSchema),
		defaultValues: initialData || {
			title: "",
			dueDate: undefined,
			status: "未着手",
		},
	});

	function handleSubmit(data: z.infer<typeof TaskFormSchema>) {
		onSubmit(data);
	}

	// 期限を設定する関数
	const setDueDate = (days: number) => {
		const date = new Date();
		date.setDate(date.getDate() + days);
		form.setValue("dueDate", date);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>タスク名</FormLabel>
							<FormControl>
								<Input placeholder="タスク名を入力" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>期限</FormLabel>

							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP", { locale: customJaLocale })
											) : (
												<span>期限を選択してください</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
										locale={customJaLocale} // カスタマイズしたロケールを使用
									/>
								</PopoverContent>
							</Popover>
							<div className="flex space-x-2 mb-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setDueDate(0)}
								>
									今日
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setDueDate(1)}
								>
									明日
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setDueDate(7)}
								>
									1週間後
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ステータス</FormLabel>
							<Select {...field}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="ステータスを選択" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="未着手">未着手</SelectItem>
									<SelectItem value="進行中">進行中</SelectItem>
									<SelectItem value="完了">完了</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="default" className="w-full">
					保存
				</Button>
			</form>
		</Form>
	);
}
