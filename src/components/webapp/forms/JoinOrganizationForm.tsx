import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import {
	joinOrganizationSchema,
	type JoinOrganizationFormValues,
} from "@/schemas/organizationInviteSchema";

interface JoinOrganizationFormProps {
	onSubmit: (values: JoinOrganizationFormValues) => Promise<void>;
	isLoading?: boolean;
}

const SLOTS_PER_GROUP = 4;
const GROUP_1 = Array.from({ length: SLOTS_PER_GROUP }, (_, i) => i);
const GROUP_2 = Array.from(
	{ length: SLOTS_PER_GROUP },
	(_, i) => i + SLOTS_PER_GROUP,
);
const GROUP_3 = Array.from(
	{ length: SLOTS_PER_GROUP },
	(_, i) => i + SLOTS_PER_GROUP * 2,
);

export function JoinOrganizationForm({
	onSubmit,
	isLoading = false,
}: JoinOrganizationFormProps) {
	const navigate = useNavigate();

	const form = useForm<JoinOrganizationFormValues>({
		resolver: zodResolver(joinOrganizationSchema),
		defaultValues: {
			invite_code: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="invite_code"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>招待コード</FormLabel>
							<FormControl>
								<InputOTP
									maxLength={12}
									value={field.value}
									onChange={(value) => field.onChange(value)}
									disabled={isLoading}
									containerClassName="flex-col sm:flex-row gap-4 sm:gap-2 items-center"
									className="w-full"
								>
									<InputOTPGroup className="w-full max-w-[160px]">
										{GROUP_1.map((index) => (
											<InputOTPSlot
												key={index}
												index={index}
												className="w-8 h-10 sm:w-10 sm:h-12"
											/>
										))}
									</InputOTPGroup>
									<InputOTPSeparator className="hidden sm:block mx-1 sm:mx-2" />
									<InputOTPGroup className="w-full max-w-[160px]">
										{GROUP_2.map((index) => (
											<InputOTPSlot
												key={index}
												index={index}
												className="w-8 h-10 sm:w-10 sm:h-12"
											/>
										))}
									</InputOTPGroup>
									<InputOTPSeparator className="hidden sm:block mx-1 sm:mx-2" />
									<InputOTPGroup className="w-full max-w-[160px]">
										{GROUP_3.map((index) => (
											<InputOTPSlot
												key={index}
												index={index}
												className="w-8 h-10 sm:w-10 sm:h-12"
											/>
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex flex-col sm:flex-row justify-end gap-4">
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full sm:w-auto"
					>
						参加する
					</Button>
				</div>
			</form>
		</Form>
	);
}
