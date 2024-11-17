import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ResponsiveDialog from "@/components/common/ResponsiveDialog/ResponsiveDialog";
import { CreateBankAccountForm } from "@/components/webapp/forms/CreateBankAccountForm";

import type { BankAccount, BankAccountFormValues } from "@/types/bankAccount";

interface BankAccountsTableProps {
	organizationId?: string;
}

export function BankAccountsTable({ organizationId }: BankAccountsTableProps) {
	const bankAccounts: BankAccount[] = [];

	const handleSubmit = async (values: BankAccountFormValues) => {
		if (!organizationId) {
			return;
		}
		// TODO: 銀行口座登録処理の実装
		console.log(values);
	};

	// 組織IDがない場合（新規作成時）は登録ボタンを無効化
	const isNewOrganization = !organizationId;

	const renderBankAccountForm = () => {
		if (!organizationId) {
			return null;
		}

		return (
			<CreateBankAccountForm
				organizationId={organizationId}
				onSubmit={handleSubmit}
			/>
		);
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<ResponsiveDialog
					trigger={
						<Button size="sm" disabled={isNewOrganization}>
							<Plus className="w-4 h-4 mr-2" />
							口座を追加
						</Button>
					}
					title="銀行口座の登録"
					description={
						isNewOrganization
							? "組織の作成後に銀行口座を登録できます"
							: "新しい銀行口座情報を登録します"
					}
				>
					<div className="p-4 pt-0">{renderBankAccountForm()}</div>
				</ResponsiveDialog>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>銀行名</TableHead>
						<TableHead>支店名</TableHead>
						<TableHead>種別</TableHead>
						<TableHead>口座番号</TableHead>
						<TableHead>口座名義</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isNewOrganization ? (
						<TableRow>
							<TableCell
								colSpan={5}
								className="text-center text-muted-foreground"
							>
								組織の作成後に銀行口座を登録できます
							</TableCell>
						</TableRow>
					) : bankAccounts.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center">
								登録されている銀行口座はありません
							</TableCell>
						</TableRow>
					) : (
						bankAccounts.map((account) => (
							<TableRow key={account.id}>
								<TableCell>{account.bank_name}</TableCell>
								<TableCell>{account.branch_name}</TableCell>
								<TableCell>{account.account_type}</TableCell>
								<TableCell>{account.account_number}</TableCell>
								<TableCell>{account.account_holder}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
