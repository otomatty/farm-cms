import type React from "react";
import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
interface ResponsiveDialogProps {
	children: React.ReactNode;
	title: string;
	description: string;
	trigger: React.ReactNode;
}

export default function ResponsiveDialog({
	children,
	title,
	description,
	trigger,
}: ResponsiveDialogProps) {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isDesktop ? (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>{trigger}</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						{children}
					</DialogContent>
				</Dialog>
			) : (
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerTrigger asChild>{trigger}</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>{title}</DrawerTitle>
							<DrawerDescription>{description}</DrawerDescription>
						</DrawerHeader>
						{children}
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
}
