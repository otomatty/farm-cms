import { useState } from "react";
import type { News } from "../types";

type ModalMode = "create" | "edit";

interface ModalState {
	isOpen: boolean;
	mode: ModalMode;
	selectedNews?: News;
}

export function useNewsCreateEditModal() {
	const [state, setState] = useState<ModalState>({
		isOpen: false,
		mode: "create",
	});

	const onOpen = (mode: ModalMode = "create", news?: News) => {
		setState({
			isOpen: true,
			mode,
			selectedNews: news,
		});
	};

	const onClose = () => {
		setState({
			isOpen: false,
			mode: "create",
			selectedNews: undefined,
		});
	};

	return {
		isOpen: state.isOpen,
		mode: state.mode,
		selectedNews: state.selectedNews,
		onOpen,
		onClose,
	};
}
