export const generateSecurePassword = (length = 12): string => {
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	const symbols = "@$!%*#?&";
	const allChars = lowercase + uppercase + numbers + symbols;

	let password = "";
	// 必須文字を1つずつ追加
	password += lowercase[Math.floor(Math.random() * lowercase.length)];
	password += uppercase[Math.floor(Math.random() * uppercase.length)];
	password += numbers[Math.floor(Math.random() * numbers.length)];
	password += symbols[Math.floor(Math.random() * symbols.length)];

	// 残りの文字をランダムに生成
	for (let i = password.length; i < length; i++) {
		password += allChars[Math.floor(Math.random() * allChars.length)];
	}

	// パスワードの文字をシャッフル
	return password
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
};
