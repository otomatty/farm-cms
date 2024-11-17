export interface BankAccount {
	id: string;
	bank_name: string;
	branch_name: string;
	account_type: string;
	account_number: string;
	account_holder: string;
}

export interface BankAccountFormValues {
	bank_name: string;
	branch_name: string;
	account_type: "普通" | "当座";
	account_number: string;
	account_holder: string;
}
