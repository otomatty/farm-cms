import { useState } from "react";

export const usePhoneNumberFormat = (initialValue = "") => {
	const [value, setValue] = useState(initialValue);

	const formatPhoneNumber = (input: string) => {
		// 数字以外を除去
		const numbers = input.replace(/[^\d]/g, "");

		// 数字がない場合は空文字を返す
		if (!numbers) return "";

		// 電話番号の長さに応じてフォーマット
		if (numbers.length <= 3) {
			return numbers;
		}

		if (numbers.length <= 7) {
			return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
		}

		return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatPhoneNumber(event.target.value);
		setValue(formatted);
		return formatted;
	};

	return {
		value,
		setValue,
		handleChange,
		formatPhoneNumber,
	};
};
