/**
 * 長い日付形式(YYYY年MM月DD日)にフォーマット
 * @param dateString 日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatDateLong(dateString: string): string {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.toLocaleString("ja-JP", { month: "long" });
	const day = date.getDate();
	return `${year}年${month}${day}日`;
}

/**
 * 短い日付形式(YYYY/MM/DD)にフォーマット
 * @param dateString 日付文字列
 * @returns フォーマットされた日付文字列
 */
export function formatDateShort(dateString: string): string {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 月は0から始まるため+1
	const day = date.getDate();
	return `${year}/${month}/${day}`;
}
