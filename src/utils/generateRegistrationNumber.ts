/**
 * 組織登録番号を生成
 * @returns 組織登録番号
 */
export const generateRegistrationNumber = (): string => {
	const prefix = "RG";
	const timestamp = Date.now().toString().slice(-6);
	const random = Math.floor(Math.random() * 1000)
		.toString()
		.padStart(3, "0");
	return `${prefix}${timestamp}${random}`;
};
