import { atom, useAtom } from "jotai";

interface SetupState {
	isProfileCompleted: boolean;
	isOrganizationCompleted: boolean;
}

// 初期状態
const initialState: SetupState = {
	isProfileCompleted: false,
	isOrganizationCompleted: false,
};

// セットアップ状態を管理するatom
const setupAtom = atom<SetupState>(initialState);

// カスタムフック
export const useSetupStore = () => {
	const [setupState, setSetupState] = useAtom(setupAtom);

	const setProfileCompleted = (completed: boolean) => {
		setSetupState((prev) => ({
			...prev,
			isProfileCompleted: completed,
		}));
	};

	const setOrganizationCompleted = (completed: boolean) => {
		setSetupState((prev) => ({
			...prev,
			isOrganizationCompleted: completed,
		}));
	};

	const resetSetupState = () => {
		setSetupState(initialState);
	};

	return {
		...setupState,
		setProfileCompleted,
		setOrganizationCompleted,
		resetSetupState,
	};
};

// セレクター
export const isSetupCompletedSelector = atom((get) => {
	const state = get(setupAtom);
	return state.isProfileCompleted && state.isOrganizationCompleted;
});
