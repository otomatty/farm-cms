export const formatPostalCode = (value: string): string => {
	// 数字以外を削除
	const numbers = value.replace(/[^\d]/g, "");

	// 7桁以上入力された場合は7桁までに制限
	const limitedNumbers = numbers.slice(0, 7);

	// 3桁目と4桁目の間にハイフンを挿入
	if (limitedNumbers.length > 3) {
		return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
	}

	return limitedNumbers;
};
