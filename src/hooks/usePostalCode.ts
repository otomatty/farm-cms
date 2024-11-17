import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

interface PostalCodeResult {
	address: string;
	error?: string;
}

export const usePostalCode = () => {
	const [isLoading, setIsLoading] = useState(false);

	const searchAddress = async (
		postalCode: string,
	): Promise<PostalCodeResult> => {
		setIsLoading(true);
		try {
			// ハイフンを削除して7桁の数字のみにする
			const cleanedPostalCode = postalCode.replace(/[-－ー]/g, "");
			if (cleanedPostalCode.length !== 7) {
				return { address: "", error: "郵便番号は7桁で入力してください" };
			}

			const response = await fetch(
				`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedPostalCode}`,
			);
			const data = await response.json();

			if (data.status === 400) {
				return { address: "", error: "不正な郵便番号です" };
			}

			if (data.results === null) {
				return { address: "", error: "該当する住所が見つかりませんでした" };
			}

			const result = data.results[0];
			const address = `${result.address1}${result.address2}${result.address3}`;
			return { address };
		} catch (error) {
			return { address: "", error: "住所の取得に失敗しました" };
		} finally {
			setIsLoading(false);
		}
	};

	// debounceされた関数の型を明示的に定義
	const debouncedSearchAddress = useCallback(
		debounce((postalCode: string) => searchAddress(postalCode), 500),
		[],
	);

	return {
		searchAddress: (postalCode: string) =>
			debouncedSearchAddress(postalCode) as Promise<PostalCodeResult>,
		isLoading,
	};
};
