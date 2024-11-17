"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { News, NewsFormValues } from "../types";

const formSchema = z.object({
	title: z.string().min(1, "タイトルは必須です"),
	summary: z.string().min(1, "概要は必須です"),
	content: z.string().min(1, "本文は必須です"),
	status: z.enum(["draft", "published"]),
	published_at: z.string().optional(),
	is_important: z.boolean().default(false),
	display_order: z.number().int().default(0),
});

interface NewsFormProps {
	onSubmit: (values: NewsFormValues) => void | Promise<void>;
	defaultValues?: Partial<News>;
	isSubmitting: boolean;
}

export function NewsForm({
	onSubmit,
	defaultValues,
	isSubmitting,
}: NewsFormProps) {
	const form = useForm<NewsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			status: "draft",
			is_important: false,
			display_order: 0,
			...defaultValues,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>タイトル</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="summary"
					render={({ field }) => (
						<FormItem>
							<FormLabel>概要</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>本文</FormLabel>
							<FormControl>
								<Textarea {...field} className="min-h-[200px]" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ステータス</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="draft">下書き</SelectItem>
										<SelectItem value="published">公開</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="is_important"
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormLabel>重要</FormLabel>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex justify-end gap-2">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "保存中..." : "保存"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
