import { useEffect } from "react";
import s from "./toast.module.css";

export interface ToastProps {
	id: string;
	message: string;
	duration?: number;
	onClose: (id: string) => void;
}

export const Toast = ({
	id,
	message,
	duration = 3000,
	onClose,
}: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(id);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, id, onClose]);

	return (
		<div className={s.toast}>
			<div className={s.message}>{message}</div>
		</div>
	);
};
